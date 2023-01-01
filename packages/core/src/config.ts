enum FieldKey {
  $value = '$value',
  $errors = '$errors',
  $isDirty = '$isDirty',
  $isFocused = '$isFocused',
  $isTouched = '$isTouched',
  $externalErrors = '$externalErrors',

  name = 'name',

  set = 'set',
  change = 'change',
  blured = 'blured',
  focused = 'focused',
  changed = 'changed',

  // TODO: implement
  pop = 'pop',
  shift = 'shift',
  push = 'push',
  unshift = 'unshift',
  remove = 'remove',
  insert = 'insert',

  // hidden fields
  units = '__units__'
}

export { FieldKey };
