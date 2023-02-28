# Validation

By default @filledout/core version of the form has no validation in built
You can add you own global logic inside the `factoryInterceptor` (check api reference) or you can wrap it with your own "decorator" function and implement it there
In previous sections we went with the decorator approach because it can properly transfer types trough function calls and it should be prefered way to add such features.

There are few validators out of the box you can find list of the in the api section.
Package name will be @filledout/validatorname by default

Remind of how to setup validator:

```ts
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
```
