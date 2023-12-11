---
layout: doc

title: Adapters
outline: deep
---

# Adapters for form components

Let's say our component library has a simple text input field.

::: code-group

```tsx [shared/ui/input.tsx]
export interface InputProps {
  value: string;
  label?: string;
  hasError?: boolean;
  error?: string;
  onChange: (value: string) => void;
}

export const Input = ({
  value,
  label,
  onChange,
  hasError,
  error
}: InputProps) => (
  <div>
    {label && <label>{label}</label>}

    <input value={value} onChange={event => onChange(event.target.value)} />

    {hasError && <div style={{ color: 'red' }}>{error}</div>}
  </div>
);
```

:::

Now we need somehow to connect form field props with component props.
In previous section we created [useFieldProps](/guide/configure#usefieldprops-hook) hook, as well as **withField** HOC.
Let's use it to create a wrapper component (an adapter) that, in addition to the inherent props of the component itself, will also accept a special `field` prop.

::: code-group

```tsx [shared/form-fields/input-field.tsx]
import { type InputProps, Input } from 'shared/ui/input';
import { type UseFieldPropsParams } from 'shared/form';

export interface InputFieldProps 
  extends InputProps, UseFieldPropsParams {}

export const InputField = ({
  field,
  ...props,
}: InputProps) => {
  const _props = useFieldProps(field, props);

  return <Input {...props} {..._props} />
}
;
```

:::

Most projects with forms involve a variety of form components.

To avoid repeating code, we can use the `withField` HOC we made earlier to simplify the creation of input adapters.

::: code-group

```tsx [shared/form-fields/input-field.tsx]
import { Input } from 'shared/ui/input';
import { withField } from 'shared/form';

export const InputField = withField(Input);

```

In real-world projects, you might encounter scenarios where a specific component in your library handles special value types or produces a non-standard structure when value changed by `onChange` event. To accommodate this, you can write this extra logic in the `useFieldProps` hook to handle such cases.

Additionally, you can augment the `withField` HOC with extra configuration keys as needed.
