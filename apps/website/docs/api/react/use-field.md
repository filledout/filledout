# `useField()`

Accepts field instance

Returns mapped field states and handlers:

- `value` - mapped FormModel `$values`  
- `dirty` - mapped FormModel `$dirty` 
- `errors` - mapped FormModel `$errors` 
- `onBlur` - mapped blured event
- `onFocus` - mapped focused event
- `touched` - mapped FormModel `$touched`
- `focused` - mapped FormModel `$focused` (true if $focused has same field path as specific field)
- `onChange` - mapped FormModel `changed` event which accepts value only 
- `externalErrors` - mapped FormModel `$externalErrors`
- `shouldShowValidation` - boolean value based on touched/dirty/submitted states and ValidationVisibilityCondition setting
