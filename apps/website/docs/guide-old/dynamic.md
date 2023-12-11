# Forms are fully dynamic

You can have any values shape you want. Units you refer are generated on default if you access any unit related fields for example.

```ts
// Will return $$form.$values.map(values => values?.my?.deeply?.nested?.field ?? null) store
$$form.fields.my.deeply.nested.field.$value

// will return $$form.change.prepend((value) => ({value, name: 'my.array.0'}))
$$form.fields.my.array[0].change

```

## Example

Let's take a look at example form which contains array in it's values which also has objects inside of it

```ts
type Role = {
  id: string;
  name: string;
};

type Values = {
  firstName: string;
  lastName: string;
  roles: Role[];
};

const $$form = createForm<Values>({
  schema: object({
    firstName: string().required(),
    lastName: string().required(),
    roles: array()
      .of(
        object({
          id: string().required(),
          name: string().required()
        })
      )
      .required()
      .min(1)
  }),

  values: {
    firstName: '',
    lastName: '',
    roles: []
  }
});


// you can get any deeply nested field on demand just by referencing for example you can even reference index items of any array inside values
// const setFirstRole = $$form.fields.roles[0].set -> will give you an event for that specific field path
// consider not refercing index items tho because you're creating units for something you will not use later (maybe)

const options = [
  { id: 'role1', name: 'Role1' },

  { id: 'role2', name: 'Role2' }
];

// we don't want to reference "fields" inside the render to much if possible because it's an extra calls for a fields proxy
const $roles = $$form.fields.roles.$value;

const AddUser = () => {
  // useFields adds extra proxy to save reference that you may need for a memo components
  const fields = useFields($$form);
  // let's map current value for roles field
  const roles = useUnit($roles);

  // Check Field section of the docs for a refeerence
  return (
    <div>
      <Field.Input field={fields.firstName} label='First Name' />

      <Field.Input field={fields.lastName} label='Last Name' />

      {roles.map((role, index) => (
        <div key={index}>
          {/* For  */}
          <Field.Select field={fields.roles[index]} options={options} />
        </div>
      ))}
    </div>
  );
};
```
