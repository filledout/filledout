# `<Field />`

Before we'll start making our forms let's create <Field /> decorator to make it easier to build forms later.
To do or not do something like it's fully up to you but overall it's a nice way to make your forms simplier.

```typescript
import type { FieldModel } from '@filledout/core';

import { getFieldFormMeta } from '@filledout/core';

import { useUnit } from 'effector-react';

import type { ComponentType } from 'react';

import { useTranslation } from 'react-i18next';

import { useField } from './factory';

type FieldChildProps = {
  value?: any;
  error?: string;
  focused?: boolean;
  hasError?: boolean;
  onBlur: (...args: any[]) => any | void;
  onFocus: (...args: any[]) => any | void;
  onChange: (...args: any[]) => any | void;
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const nope = (..._: any[]) => {};

const compose =
  (g: any, f = nope) =>
  (x: any) => {
    g(x);

    f(x);
  };

const useFieldProps = (is: FieldModel<any>, props: FieldChildProps) => {
  const field = useField(is);
  const meta = getFieldFormMeta(is);

  const { t } = useTranslation();

  const {
    value,
    errors,
    externalErrors,
    focused,
    shouldShowValidation,
    onBlur,
    onFocus,
    onChange
  } = field;

  const error = errors?.[0] ?? externalErrors?.[0];

  return {
    value,
    focused,
    disabled: useUnit(meta.$isDisabled),
    hasError: shouldShowValidation,
    error: error ? t(error.name, { replace: error.params }) : undefined,
    onBlur: compose(onBlur, props.onBlur),
    onFocus: compose(onFocus, props.onFocus),
    onChange: compose(onChange, props.onChange)
  };
};

function withField<P>(Component: ComponentType<P>) {
  return ({ field, ...props }: P & { field: FieldModel<any> }) => (
    <Component
      {...(props as any)}
      {...useFieldProps(field, props as any as FieldChildProps)}
    />
  );
}

export { withField };
```