# Yup

Yup validator provides schema input for createForm method and yup schema validation logic. Package has only one method and it's `applyYup` which can be used as follows:

```typescript
// ...
import { applyYup, ApplyYupParams } from '@filledout/yup'

const lib = createLib({
  showValidationOn: [
    ValidationVisibilityCondition.Submitted,
    ValidationVisibilityCondition.Touched,
    ValidationVisibilityCondition.Dirty
  ]
});

const createForm = <V>(params: CreateFormParams<V> & ApplyYupParams<V>) => {
  const $$form = lib.createForm<V>(params);

  return {
    ...$$form,
    // attaches validation logic and drops extra fields form final form model
    ...applyYup($$form, params)
  };
};
```

`ApplyYupParams` in example above adds extra field to params which is `schema` which accepts yup schema

`applyYup` call returns:

- `$schema` - schema which was passed into createForm params
- `$validating` - because validation is async by default there's a state which says if validation is in process