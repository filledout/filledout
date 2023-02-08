# Yup

Installed with
```npm
npm install @filledout/yup
```

Yup validation extension provides ability to pass schema params inside a createForm factory like so:

```typescript
const $$form = createForm({
  // ...
  schema: object({
    // ...
  })
  // ...
});
```

Form can be static (or yup.lazy) parameter or you can pass an effector store which has yup schema as a value.
Most common use case is when you need to base schema on certain dynamic values you get from some other sources.
For example we can have list of ban words we don't wanna see in username field and we fetch them from some remote api and store inside an effector store.

```typescript
const $schema = $banWords.map(words => {
  return object({
    username: string()
      .required()

      // implementation of ban words matching logic
      .test(...)
  });
});

const $$form = createForm({
  // ...
  schema: $schema
  // ...
});
```

## Form submission flow
Validation happenes either from `validate` event call which exists on base form model or when $values store get updates.

When `submit` event called it's gonna be forwarded to yup extension's validation flow and if validation results with success `submitted` event will be called with form's value passed inside if validation fails `rejected` event will be called with `{values, errors}` passed inside.