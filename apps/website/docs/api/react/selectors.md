# Selectors

`useField()` uses those methods under the hood and if you're not ok with how useField works you can use those ones to combine your own useField. Most of them call useStoreMap with field path as key

- `useDirty` - returns boolean dirty state
- `useValue` - returns current values for a field 
- `useErrors` - returns field errors
- `useFocused` - returns if field is focused
- `useTouched` - returns if field is touched
- `useSubmitted` - returns if parent for is submitted
- `useExternalErrors` - returns external errors associated with the field