# Manipulating the form

So basic forms are pretty simple but what about more features?
Let's make a profile form which pulls data from external $profile store which contains default form values we need to pull in.

model.ts file will be as follows

```ts

// let's pretend that we get data for that store somewhere
const $user = createStore<User>();

const $$form = createForm({
    // herer we pass user store as initialValues
    // possibly you could want to manually .map $user values to initialValues to omit extra fields
    initialValues: $user,

    // by setting this flag to true form will start watching for changes of initialValues and if values been updated form will reset it's state and set new initialValues as values
    reinitialize: true,

    // NOTE: schema can also be a store which contains schema so if you need to generate it on go (for example some external validation settings you can pass store there)
    schema: object(...)
});

export { $$form }
```

and ui.tsx is:

```tsx
import { $$form } from './model.ts';

const Login = () => {
  // onSubmit can be manually mapped by using useUnit from $$form.submit
  // fields can also be separatly mapped using useFields hook
  // check api reference on useForm on topic of mount validation call
  const { onSubmit, fields } = useForm();
  // let's make a manual reset feature there   
  const [onResetClick] = useUnit($$form.reset);

  return (
    <form
      onSubmit={() => {
        event.preventDefault();

        onSubmit();
      }}
    >
      <Field.Input field={fields.firstName} label='First Name' />

      <Field.Input field={fields.lastName} label='Last Name' />

      <div>
        <button type='submit'>Save</button>

        <button type='button' onClick={onResetClick}>
          Reset
        </button>
      </div>
    </form>
  );
};
```
