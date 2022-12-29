import clone from 'lodash/clone';

import toPath from 'lodash/toPath';

import type { ValidationError } from 'yup';

type MappedErrors<Values> = {
  [K in keyof Values]?: Values[K] extends any[]
    ? Values[K][number] extends object // [number] is the special sauce to get the type of array's element. More here https://github.com/Microsoft/TypeScript/pull/21316
      ? MappedErrors<Values[K][number]>[] | string | string[]
      : string | string[]
    : Values[K] extends object
    ? MappedErrors<Values[K]>
    : string;
};

function getIn(obj: any, key: string | string[], def?: any, p = 0) {
  const path = toPath(key);

  while (obj && p < path.length) {
    obj = obj[path[p++]];
  }

  return obj === undefined ? def : obj;
}

/** @private is the given object an integer? */
const isInteger = (obj: any): boolean =>
  String(Math.floor(Number(obj))) === obj;

const isObject = (obj: any): obj is Object =>
  obj !== null && typeof obj === 'object';

function setIn(obj: any, path: string, value: any): any {
  let res: any = clone(obj); // this keeps inheritance when obj is a class
  let resVal: any = res;
  let i = 0;
  let pathArray = toPath(path);

  for (; i < pathArray.length - 1; i++) {
    const currentPath: string = pathArray[i];

    let currentObj: any = getIn(obj, pathArray.slice(0, i + 1));

    if (currentObj && (isObject(currentObj) || Array.isArray(currentObj))) {
      resVal = resVal[currentPath] = clone(currentObj);
    } else {
      const nextPath: string = pathArray[i + 1];
      resVal = resVal[currentPath] =
        isInteger(nextPath) && Number(nextPath) >= 0 ? [] : {};
    }
  }

  // Return original object if new value is the same as current
  if ((i === 0 ? obj : resVal)[pathArray[i]] === value) {
    return obj;
  }

  if (value === undefined) {
    delete resVal[pathArray[i]];
  } else {
    resVal[pathArray[i]] = value;
  }

  // If the path array has a single element, the loop did not run.
  // Deleting on `resVal` had no effect in this scenario, so we delete on the result instead.
  if (i === 0 && value === undefined) {
    delete res[pathArray[i]];
  }

  return res;
}

function yupErrorToMapError(err: ValidationError) {
  const result: Record<any, any> = {};

  if (err.inner.length == 0) {
    if (!result[err.path!]) {
      result[err.path!] = {};
    }

    result[err.path!][err.message] = err.params;

    return result;
  }

  err.inner.forEach(error => {
    if (!result[error.path!]) {
      result[error.path!] = {};
    }

    const { originalValue, value, path, ...params } = error.params! as any;

    result[error.path!][error.message] = params;
  });

  return result;
}

export { yupErrorToMapError };
