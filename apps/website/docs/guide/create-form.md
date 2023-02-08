# Let's create a form

To create a form we gonna use `createForm` factory which we got from `createLib` call in previous section.
We gonna take a registration form as an example which has email, password, interests list and occupation category.
Things can look a bit complex but we will cover most things we can think of.

```typescript
type Occupation = {
  id: string;
  name: string;
};

type Values = {
  email: string;
  password: string;
  interests: string[];
  occupation: Occupation;
  confirmPassword: string;
};

const $$form = createForm<Values>({
  // values can be either static object or effector store
  initialValues: {
    email: '',
    password: '',
    interests: [],
    occupation: null
  },

  // if value passed in initialValues parameter is effector store reinitialize === true
  // will force form to reset with new values each time $initialValues store is updated
  // reinitialize: true,

  // schema parameter provided by @filledout/yup extension
  // it accepts yup schema or effector store which contains yup schema
  // with yup lazy you can reference values object to make dependend fields 
  // with store you can make schemas that depend on certain params you have stored in another stores
  schema: lazy({
    email: string().required().nullable().email().label('Email'),

    password: string().required().nullable().label('Password'),

    confirmPassword: string().required().nullable().label('Confirm Pasword'),

    interests: array()
      .of(string().required().nullable())

      .min(1)

      .label('Interests'),

    occupation: object({
      id: string().required(),

      name: string().required()
    })
      .required()

      .nullable()
  }),
 
  // Shared disabled state for entire form. Primary use is disabling all form controls in UI.   
  // isDisabled: $someBooleanStore

  // Accepts store which contains errors shaped by { fieldpath: { name: string; params: object; }[] }
  // Used to pass some external errors not related to validation strategy
  // errors: $errors

  // If you want to customize visiblity of validation for a certain form
  // you can pass it there (also configured globally with createLib)
  // showValidationOn: ValidationVisibilityCondition[]
});
```

After we created form model we can use different methods to manipulate values and other form states.
For full reference of methods/state you can check API docs section.