# FormModel

Can be created by using createForm method. Has following properties:

Stores:

- `$values` - current form values
- `$focused` - path to the field which's in focus right now (set by `focused` event and reset by blured)
- `$initialValues` - contains initial values (if store was passed in params of `createForm` it's gonna be used right away instead of creating another one)
- `$isDisabled` - global form disable state (passed from params in `createForm`)
- `$submitCount` - counter of how much time `submit` event was called 
- `$dirty` - Map where keys are field paths and values are booleans. Contains fields which been changed by `change` calls
- `$touched` - Same as `$dirty` but contains "touched" state for touched fields
- `$errors` - Contains error map returned by validation method. Check `ErrorsMap` type from '@filledout/core'.
- `$externalErrors` - Same `ErrorsMap` as `$errors` but entire store is provided by one passed into createForm call. 

Derived Stores:

- `$isValid` - boolean flag which reflects if `$errors` are empty or not 
- `$isDirty` - `true` when some field is dirty
- `$isFocused` - `true` when `$focused` is not empty
- `$isTouched` - `true` when some field is touched
- `$isSubmitted` - `true` if `$submitCount` is `> 0`

Events:
- `submitted` - Called when form is submitted successfully. IMPORTANT: by default it's not called from anywhere it's either responsibility of schema validation adapters or you if you're not using validators you should manually bind sample({ clock: submit, target: submitted }) in factoryInterceptor or in your custom createForm decorator function. 
- `blured` - called from UI when field lose focus
- `focused` - called form UI when field get focused
- `changed` - called when field explicitly changes (has field path and value as a payload)
- `rejected` - called when submitted with errors (has errors and valueus as a payload). IMPORTANT: it's not called from anywhere by default just like `submitted` so it follows the same logic as described above.
- `put` - Accepts values to replace current values with
- `reset` - Resets form to default state. All touched/dirty and other states are cleared, values set to initialValues (if initialValues is a store it's $values gonna be set to current initialValues state)
- `set` - Sets field value (accepts field path and value) without triggering dirty state
- `patch` - Accepts values to deepmerge with current form values
- `submit` - Submits a form (by default it's not redirected to submitted/rejects, check notes above)
- `change` - Sets field value (accepts field path and value) and triggers dirty state 
- `validate` - Calls form validation (by default doesnt do anything but validators will subscribe to it under the hood)

Misc:
- `showValidationOn` - List of ValidationVisibilityCondition set while creating a form (or global value if nothing was passed into `createForm`)
- `fields` - Field proxy object which allows you to access field units (which gonna be generated on the "fly"). IMPORTANT: do not use it in UI code because it's gonna break reference equality. For UI usage in UI check specific section of the docs

