# Setup

After we have everything installed we need to initialize library before we can start using it.
Don't be afraid of things bellow we gonna go trough it in a sec.


:::warning
By default form doesnt have any bindings between submit and `submitted`/`rejected` events.
You should either apply validation flow bindings or manually forward submit event to submitted inside a `factoryInterceptor` if you have no need in any kind of validation flow. 
:::

```typescript
import { createLib, ValidationVisibilityCondition } from '@filledout/core';
import { createLib as createReactLib } from '@filledout/react';
import {
  applyYupValidationFlow,
  ApplyYupValidateParams,
  ApplyYupValidationResult
} from '@filledout/yup';

// create lib has few params we can pass
// factoryInterceptor - function that will be called during form models creation and can have any kind of logic you want. With it you can patch form creation in any way and add new
// parameters to createForm factory and also add new fields to form model we get from createForm call.
// As you see we have yup validation extension applied here, it binds submit call together with validation logic which uses yup schemas to validate form values.
const { createForm } = createLib<
  ApplyYupValidateParams,
  ApplyYupValidationResult
>({
  // model - base form model
  // params - createForm call params
  factoryInterceptor: (model, params) => {
    // here we return object that will be merge with original form model
    return applyYupValidationFlow(model, params);
  },

  // common configuration of how we want to define our validation visibility rule ( needed purely for a ui )
  showValidationOn: [
    ValidationVisibilityCondition.Submitted,
    ValidationVisibilityCondition.Touched,
    ValidationVisibilityCondition.Dirty
  ]
});


// here we call factory for react hooks we can use in our react components
// most of those hooks are selectors that pick corresponding state for a passed field reference
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
} = createReactLib();

// all of this we can use later to createForms, map field states inside react components
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
