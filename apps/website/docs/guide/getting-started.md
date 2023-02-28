# Overview

Filledout is effector based form library which provides simple API for creation of form models in your apps.
Performance wise there are no benchmarks but overall considering effector overall good performance you will less likely encounter any troubles with that. 
For certain things filledout uses js proxy which can also affect performance but from overall testing in production there are no issues with that as well.
Because of proxies there are fully typesafe field usage without string paths like it's done in different form libraries. 
Form values can be fully dynamic because there are 1 values store under the hood and specific field units mapped on the go when requested (thanks to proxy) and in UI there are selectors to pick values from form model stores so they can be effectively mapped without need of making separate units for each field.

## Instalation

@filledout has few packages you would want to install
For the purpose of fully functioning example we'll install all needed packages right away
For example we'll be using yarn package manager

This package contains base form features and you will need it 100% of time

```
yarn add @filledout/core 
```

Next you would want to install validator for our forms which in our case gonna be yup
NOTE: yup version should be 1.0+ because ts typings on older versions could break things up
@filledout/yup contains implementation of validation logic for our forms

```
yarn add yup @filledout/yup
```

And for the last we want to install UI bindings and in our case it's react 

```
yarn add @filledout/react
```

## Babel plugin

Don't forget to add [effector babel plugin](https://effector.dev/docs/api/effector/babel-plugin) to your project if you want to have your SIDs set properly. 
You will also need to add @filledout to factories in plugin config. In our case it should be something like that:

```json
{
  "plugins": [
    [
      "effector/babel-plugin",
      {
        "factories": ["@filledout/core", "@filledout/yup", "/path/to/file/where/you/call/createLib"]
      }
    ]
  ]
}
```

## Let's initialize everything

```typescript
import {
  CreateFormParams,
  createLib,
  ValidationVisibilityCondition
} from '@filledout/core';
import { createLib as createReactLib } from '@filledout/react';
import { applyYup, ApplyYupParams } from '@filledout/yup';

// here we initialize core lib
const lib = createLib({
  showValidationOn: [
    ValidationVisibilityCondition.Submitted,
    ValidationVisibilityCondition.Touched,
    ValidationVisibilityCondition.Dirty
  ]
});

// here we can modify base form model however we want and in our case we just add yup validator
const createForm = <V>(params: CreateFormParams<V> & ApplyYupParams<V>) => {
  const $$form = lib.createForm<V>(params);

  return {
    ...$$form,

    ...applyYup($$form, params)
  };
};

// initialize react bindings library
const {
  useDirty,
  useErrors,
  useExternalErrors,
  useField,
  useFocused,
  useForm,
  useSubmitted,
  useTouched,
  useValue
} = createReactLib({ validateOnUseForm: true });


// and all(some) of this we will use across our project
export {
  createForm,
  useDirty,
  useErrors,
  useExternalErrors,
  useField,
  useFocused,
  useForm,
  useSubmitted,
  useTouched,
  useValue
};
```




