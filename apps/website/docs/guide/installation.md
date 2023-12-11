---
layout: doc

title: Introduction
outline: deep
---

# Installation

<!-- 
## Environment

### Node.js version <Badge type="tip" text="&gt;18" />

**Filledout has a minimal support of Node.js version 18.0.0.**

::: warning
**Node.js versions prior to Node.js 18 are no longer supported.** To use Filledout, please migrate to Node.js 18 or higher. <br/><br/>
[https://nodejs.org/en/blog/announcements/nodejs16-eol](https://nodejs.org/en/blog/announcements/nodejs16-eol)
::: -->

## Core

This package contains base form features and you will need it 100% of time.


::: code-group

```sh [yarn <img src="/pm/yarn.svg"/>]
yarn add @filledout/core effector
```

```sh [bun <img src="/pm/bun.svg"/>]
bun add @filledout/core effector
```

```sh [pnpm <img src="/pm/pnpm.svg"/>]
pnpm add @filledout/core effector
```

```sh [npm <img src="/pm/npm.svg"/>]
npm install @filledout/core effector
```

::: info

Filledout declares Effector as a peer dependency to prevent two instances of Effector in the same application.

:::

## Validation resolvers

Would you want to add validation resolvers for your forms?

### Yup resolver <Badge type="tip" text="yup>=1.0.0" />

::: warning
**Yup versions prior to 1.0.0 are no longer supported.** To use Filledout yup resolver, please use **yup@^1.0.0** or higher, because ts typings on older versions could break things up. <br/><br/>
:::

::: code-group

```sh [yarn <img src="/pm/yarn.svg"/>]
yarn add @filledout/yup
```

```sh [bun <img src="/pm/bun.svg"/>]
bun add @filledout/yup
```

```sh [pnpm <img src="/pm/pnpm.svg"/>]
pnpm add @filledout/yup
```

```sh [npm <img src="/pm/npm.svg"/>]
npm install @filledout/yup
```

:::

### Zod resolver

::: code-group

```sh [yarn <img src="/pm/yarn.svg"/>]
yarn add @filledout/zod
```

```sh [bun <img src="/pm/bun.svg"/>]
bun add @filledout/zod
```

```sh [pnpm <img src="/pm/pnpm.svg"/>]
pnpm add @filledout/zod
```

```sh [npm <img src="/pm/npm.svg"/>]
npm install @filledout/zod
```

:::

## Framework bindings for UI

If you are a React user:

::: code-group

```sh [yarn <img src="/pm/yarn.svg"/>]
yarn add @filledout/react
```

```sh [bun <img src="/pm/bun.svg"/>]
bun add @filledout/react
```

```sh [pnpm <img src="/pm/pnpm.svg"/>]
pnpm add @filledout/react
```

```sh [npm <img src="/pm/npm.svg"/>]
npm install @filledout/react
```

:::

For other frameworks you can create your own UI bindings.

## Additional tools

For some advanced usage, like or **server-side rendering**, Filledout requires a few code transformations. You can write it by hands, but it is a boring job that you can forward to a machine. Effector's ecosystem provides a few tools to help you with that.

**Babel plugin**

If your project already uses [Babel](https://babeljs.io/), you do not have to install any additional packages, just modify your Babel config with the following plugin:

```json
{
  "plugins":  [
      "effector/babel-plugin",
      {
        "factories": [
            "@filledout/core",
            "@filledout/yup", // resolver used
            "/path/to/file/where/you/call/createLib"
        ]
      }
    ]
}
```

:::info
Read more about `effector/babel-plugin` configuration in the [Effector's documentation](https://effector.dev/en/api/effector/babel-plugin).
:::

<br />

**SWC plugin**

::: warning
Note that [plugins for SWC are experimental](https://github.com/swc-project/swc/discussions/3540) and may not work as expected. We recommend to stick with Babel for now.
:::

[SWC](https://swc.rs) is a blazing fast alternative to Babel. If you are using it, you can install `@effector/swc-plugin` to get the same DX as with Babel.

::: code-group

```sh [yarn <img src="/pm/yarn.svg"/>]
yarn add --dev @effector/swc-plugin @swc/core
```

```sh [bun <img src="/pm/bun.svg"/>]
bun add --dev @effector/swc-plugin @swc/core
```

```sh [pnpm <img src="/pm/pnpm.svg"/>]
pnpm add --save-dev @effector/swc-plugin @swc/core
```

```sh [npm <img src="/pm/npm.svg"/>]
npm install --dev @effector/swc-plugin @swc/core
```

:::

Now just modify your `.swcrc` config to enable installed plugin:

```json
{
  "$schema": "https://json.schemastore.org/swcrc",
  "jsc": {
    "experimental": {
      "plugins": [
        "@effector/swc-plugin",
        {
            "factories": [
                "@filledout/core",
                "@filledout/yup", // resolver used
                "/path/to/file/where/you/call/createLib"
            ]
        }
      ]
    }
  }
}
```

:::info
Read more about `@effector/swc-plugin` configuration in the [plugin documentation](https://github.com/effector/swc-plugin).
:::
