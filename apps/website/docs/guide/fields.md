# Fields

### Proxy and type safety

Form model has `fields` field which is typed according to provided generic type for form values passed trough createForm (or derived from initialValues param). To provide best DX fields is a proxy that you can use to map stores/events for a specific form fields, in short when you try to access certain field trough it, proxy collected string path to form value and then usses it to map units.

Let's say you have a form with following structure

```typescript
const $$form = createForm({
  initialValues: {
    stringField: '',

    arrayField: ['1', '2'],

    objectField: {
      field: ''
    },

    arrayWithObjectsInsideField: [
      {
        id: 'string'
      }
    ]
  }
});
```

Factory generates a single $values store under the hood which stores default value you pass as initialValues param. Form has some stores (including `$values`) and events (for example `change`) you can use to manipulate form state, you can map values/states from store manually and pass name params to most field related methods as an identifier of which field current event call is related. To simplify that process fields provide automatically generated mappings which created at the moment when you try to get certain property. Let's say we try to get:

```typescript

const $$form = createForm({
    // ...
})

$$form.stringField; // proxy

$$form.stringField.$values // store which's under the hood looks like $$form.$values.map(values => get(path, values) ?? null);

$$form.stringField.change // event which's under the hood looks like $$form.change.prepend((value) => ({name: path, value}))
```
---

:::warning References & Calls
Be aware of using fields proxy to map units because everytime you reference it it returns you new proxy instance so for example working with react components wrapped in memo can break the reference equality because every render it's gonna return new proxy and therefore new reference (@filledout/react has solution for that)
:::

---

### Array methods

For array fields there are bunch of helper methods such as `add`, `remove` (check API reference for some explanation)
