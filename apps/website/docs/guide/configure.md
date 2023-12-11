---
layout: doc

title: Configuration
outline: deep
---

# Configuring Filledout

Considering Filledout's framework-agnostic design, it's recommended to set up a separate folder where you can easily define core initialization, validation settings, and additional rules for a specific framework. This approach allows you to organize these configurations in separate files, making it more convenient. In the public API, essential methods and hooks should be exposed to establish a smooth connection between core initialization, validation settings, and any extra rules that are specific to the chosen framework.

Let's create `shared/form` folder.

## `createForm` factory (TODO: refactor)

::: code-group

```ts [shared/form/factory.ts]
import {
  CreateFormParams,
  createLib,
  ValidationVisibilityCondition
} from '@filledout/core';
import { applyZod, ApplyZodParams } from '@filledout/zod';

const lib = createLib({
  showValidationOn: [
    ValidationVisibilityCondition.Submitted,
    ValidationVisibilityCondition.Touched,
    ValidationVisibilityCondition.Dirty
  ]
});

const createForm = <V>(params: CreateFormParams<V> & ApplyZodParams) => {
  const $$form = lib.createForm<V>(params);

  return {
    ...$$form,

    ...applyZod($$form, params)
  };
};

export { createForm };
```

:::

## Bind field units to UI component

In UI development, effective handling of user interactions with form fields, including input changes, value modifications, and focus events, is a fundamental requirement. Additionally, managing and presenting errors plays a crucial role in creating a seamless user experience. Filledout simplifies these tasks by providing a comprehensive set of built-in utilities.

In this context, let's consider a practical example using React.

### useFieldProps hook

Let's create a custom hook called **useFieldProps** to consolidate essential data, streamlining its integration with our UI components. Feel free to extend it in a way that suits your preferences and project / UI library requirements.

In our example we used it to provide translated errors with `react-i18next`.

::: code-group

```tsx [shared/form/field.tsx]
import { FieldDescriptor, useField } from '@filledout/react';
import { ComponentType } from 'react';
import { useTranslation } from 'react-i18next';

type FieldWrappedComponentProps<V = any> = {
  value?: V;
  error?: string;
  focused?: boolean;
  hasError?: boolean;
  onBlur?: (...args: any[]) => any | void;
  onFocus?: (...args: any[]) => any | void;
  onChange?: (...args: any[]) => any | void;
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const nope = (..._: any[]) => {};

const compose =
  (g: any, f = nope) =>
  (x: any) => {
    g(x);

    f(x);
  };

export type UseFieldPropsParams<V = any, T = any> = {
  field: FieldDescriptor<V, T>;
};

export function useFieldProps<T extends FieldDescriptor<any, any>>(
  _field: T,
  props: FieldWrappedComponentProps
) {
  const field = useField(_field);

  const { t } = useTranslation();

  const {
    value,
    errors,
    onBlur,
    onFocus,
    focused,
    onChange,
    shouldShowValidation
  } = field;

  const error = errors?.[0];

  return {
    value,
    focused,
    hasError: shouldShowValidation,
    error: error ? t(error.name, { replace: error.params }) : undefined,
    onBlur: compose(onBlur, props.onBlur),
    onFocus: compose(onFocus, props.onFocus),
    onChange: compose(onChange, props.onChange)
  };
}
```

:::

### withField HOC (optional) (TODO: Fix types here)

To further abstract away the core adaptation logic, we can implement the **withField** HOC which extend component props with hook props. We'll explore the creation of these adapters later.


::: code-group

```tsx [shared/form/field.tsx]
// after useFieldProps

export function withField<P extends FieldWrappedComponentProps>(
  Component: ComponentType<P>
) {
  return (({ field, ...props }: P & UseFieldPropsParams) => {
    const _props = useFieldProps(field, props);

    return <Component {...props} {...(_props as any)} />;
  }) as ComponentType<
    Omit<P, 'value' | 'onChange' | 'error' | 'hasError'> & UseFieldPropsParams
  >;
}
```

<br />

:::

Finally, we export everything we need to create forms and adapters for form components.

::: code-group

```tsx [shared/form/index.ts]
export { createForm } from './factory';
export { type UseFieldPropsParams, useFieldProps, withField } from './field';
```

:::
