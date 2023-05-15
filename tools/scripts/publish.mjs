import {
  readCachedProjectGraph,
  logger,
  readJsonFile,
  writeJsonFile,
} from '@nrwl/devkit';
import { spawnSync } from 'child_process';

const [, , name] = process.argv;

// utility functions
const invariant = (condition, message) => {
  if (!condition) {
    logger.error(message);
    process.exit(1);
  }
}

const getLastJsonObjectFromString = (str) => {
  str = str.replace(/[^}]*$/, '');

  while (str) {
    str = str.replace(/[^{]*/, '');

    try {
      return JSON.parse(str);
    } catch (err) {
      str = str.slice(1);
    }
  }

  return null;
}

const publishPackage = (outputPath, originalPackageJson) => {
  process.chdir(outputPath);

  writeJsonFile('package.json', {
    ...originalPackageJson,
    publishConfig: { access: 'public' },
    license: 'MIT',
  });

  const { version } = originalPackageJson;
  const validVersion = /^\d+\.\d+\.\d+(-\w+\.\d+)?/;
  invariant(
      version && validVersion.test(version),
      `No version provided or version did not match Semantic Versioning, expected: #.#.#-tag.# or #.#.#, got ${version}.`
  );

  const result = spawnSync(process.platform === 'win32' ?  'npm.cmd' : 'npm', ['publish', '--json', '--access', 'public']);
  const errorInfo = getLastJsonObjectFromString(result.stderr.toString());

  if (errorInfo) {
    logger.warn('Skip publishing\n');
    logger.warn(errorInfo.error.summary);
  } else {
    logger.info(result.stdout.toString());
    logger.log('Published successfully');
  }
}

// main script
const graph = readCachedProjectGraph();
const project = graph.nodes[name];

invariant(
    project,
    `Could not find project "${name}" in the workspace. Is the project.json configured correctly?`
);

const outputPath = project.data?.targets?.build?.options?.outputPath;

invariant(
    outputPath,
    `Could not find "build.options.outputPath" of project "${name}". Is project.json configured correctly?`
);

const originalPackageJson = readJsonFile(`package.json`);

publishPackage(outputPath, originalPackageJson);
