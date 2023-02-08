# Field Hoc

You probably want to have some default component/decorator to wrap your form controls and map form states as a props for them.

Here's the example of how you can do that

https://github.com/hyze2d/filledout/blob/main/apps/playground/src/shared/form/field.tsx

You can use it as follows

```tsx
const Field = {
  Input: withField(Input)
};

const MyForm = () => {
  const { fields, onSubmit } = useForm($$form);

  return (
    <form onSubmit={onSubmit}>
      <Field.Input field={fields.email} type='email' label='Email' />

      <Field.Input field={fields.password} type='password' label='Password' />

      <button type='submit'>Submit</button>
    </form>
  );
};
```
