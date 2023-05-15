# Let's make a form

After all setup done we can finally make our first form

Let's make a file model.ts where we will define our form model.

```ts
import { createForm } from '.....';
import { object, string } from 'yup';

// That's it
const $$form = createForm({
  initialValues: {
    email: '',
    password: ''
  },

  schema: object({
    email: string().required().email(),
    password: string().required().min(8)
  })
});

export { $$form };
```

Let's connect our form to UI in ui.tsx file nearby

```tsx
import { $$form } from './model.ts';
import { useForm } from '...'; // you can get useForm from @filledout/react lib initialization

const Login = () => {
  // onSubmit can be manually mapped by using useUnit from $$form.submit
  // fields can also be separatly mapped using useFields hook
  // check api reference on useForm on topic of mount validation call
  const { onSubmit, fields } = useForm($$form);

  return (
    <form
      onSubmit={() => {
        event.preventDefault();

        onSubmit();
      }}
    >
      <Field.Input field={fields.email} label='Email' />

      <Field.Input field={fields.password} label='Password' />

      <button type='submit'>Login</button>
    </form>
  );
};
```
And that's all. We have a basic login form which has 2 fields with everything mapped inside them and a form submit handler.
