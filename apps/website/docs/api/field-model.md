# Field Model

## BaseFieldModel

Normal fields and array fields both share this properties:

- `$value` - Derived store based on FormModel `$values`
- `$isDirty` - Derived store based on FormModel `$dirty`. Set to true when `change` event been called with specific field path. 
- `$isFocused` - Derived store based on FormModel `$dirty`. Set to true when current focused field on FormModel is the same as specific field.
- `$isTouched` - Derived store based on FormModel `$dirty`. Set to true when focus event called with specific field path. 
- `$errors` - Dervied store based on FormModel `$errors`. Contains schema validation errors related to the field 
- `path - field string path inside the values object on FormModel `$values`
- `set` - setter event which accepts value you want to set for the field (IMPORTANT: doesnt trigger *dirty* state change).
- `change` - setter event which accepts value you want to set for the field (IMPORTANT: TRIGGERS *dirty* state change).
- `changed` - event which you want to use to subscribe to react to field value change (called after change was called and value has been set)
- `focused` - UI event which you can subscribe to and which supposed to be called which field gets focused by user
- `blured` - UI event which you can subscribe to and which supposed to be called when field lose focus

## FieldModel

Fully extends BaseFieldModel

## ListFieldModel

If certain property on fields object has array value type it gonna be typed as LiseFieldModel which extends BaseFieldModel and also has:

- `remove` - event which is wrapped `change` but accepts position of the element you want to remove. Possible values are 'first', 'last' or number. 
- `add` - event which accepts an object which looks like {at, value}. `at` accepts the same params as `remove` event and `value` accepts the value you want to add at specified position (it doesnt remove existing item at provided position but only adds new value)
