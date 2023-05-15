# `createLib()`

Configures library and returns library methods/fields.


## Params:

Config:
- `showValidationOn` (optional) list of ValidationVisibilityCondition. Default: [ValidationVisibilityCondition.Touched, ValidationVisibilityCondition.Submitted]
- `factoryInterceptor` (optional) function which will be called on every createForm() call receives FormModel as first argument and createForm params as second argument. This function is supposed to add some side features to your form factory and if you want to extend types of createForm params or result you should pass generic params to createLib: first params is extra configuration you want to accept in createForm and second param is extra fields you want to type on result of createForm call

Returns object:
```ts
{
  createForm
}
```