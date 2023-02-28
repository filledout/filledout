# `createForm()`

Returns FormModel, accepts config object:
  
- `reinitialize` (optional) works in pair with initialValues. If initialValues is a store with reinitialize set to true the form will be reset every time initialValues store get updated
- `isDisabled` (optional) global flag for a form (purely UI prop) to have global disable state reference on form model
- `initialValues` values object or store with values object
- `onSubmit` (optional) binds passed unit to `submitted` event via sample (mainly to reduce boilerplate)
- `onReject` (optional) same as onSubmit but called on `rejected` event
- `resetOn` (optional) array of units to bind `reset` event (mainly to reduce boilerplate)
- `validateOn` (optional) array of units to bind `validate` event (mainly to reduce boilerplate)
- `errors` (optional) store with error map which will be passed to `$externalErrors` form model field. UI param, no inner logic bound to it.