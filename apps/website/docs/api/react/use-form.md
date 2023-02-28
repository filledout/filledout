# `useForm()`

Hook which accepts FormModel and config as a second argument and returns mapped events and state

Config:

- `validate` (optional) default is take from createLib param `validateOnUseForm`. If set to true calls `validate` on mount

Returns object:

- `fields` - result of `useFields` call
- `onSubmit` - mapped `submit` event
- `isSubmitted` - mapped `$isSubmitted` store value 
