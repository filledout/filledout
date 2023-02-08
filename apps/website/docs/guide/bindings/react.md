# React

Installed with

```npm
npm install @filledout/react
```

To use it you need to initialize it by calling createLib factory.

```typescript
import { createLib } from '@filledout/react';

const {
  useDirty,
  useField,
  useValue,
  useErrors,
  useFocused,
  useTouched,
  useSubmitted,
  useExternalErrors,

  useForm,
  useFields
} = createLib();
```

Those bindings are opinionated so if you want to implement your own there's no problem: you have a model from createForm call and you can map it however you want however if you wanna just install things and you're ok with out-of-the-box bindings you can use this package.

Most of the hooks above are exposed so you can call them manually but most of them used under the hood of useField hook. Those hooks are mostly select states using useStoreMap under the hood and map them into a local values.

`useFields` hook wraps original fields reference which is proxy object by itself and caches the results of proxy calls so it can keep proxy references to prevent breaking of memo components by spawning new proxy instances.

`useForm` has validate call on mount by default and will give you first run of validation when form is rendered. This hooks *should be called only ones on top of the form tree* to prevent unneeded validation calls. Has useFields call under the hood so you can get them from result of useForm hook `const { fields } = useForm($$form)`
