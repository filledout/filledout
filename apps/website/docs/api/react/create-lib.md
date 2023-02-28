## `createLib()`

Accepts config and returns library methods and properties

Config:

- `validateOnUseForm` - global setting for `useForm` hook. Sets default `validate` value. If set to true calls `validate` event on mount.

Returns:

```typescript
{
    useForm,
    useField,
    useDirty,
    useValue,
    useErrors,
    useFields,
    useFocused,
    useTouched,
    useSubmitted,
    useExternalErrors
}
```
