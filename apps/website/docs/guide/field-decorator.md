# `<Field />`

Before we'll start making our forms let's create <Field /> decorator to make it easier to build forms later.
To do or not do something like it's fully up to you but overall it's a nice way to make your forms simplier.

```typescript
import { FieldModel } from '@filledout/core';
import React, { ComponentType, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useField } from './factory';

type FieldChildProps = {
  value?: any;
  error?: string;
  focused?: boolean;
  hasError?: boolean;
  onBlur?: (...args: any[]) => any | void;
  onFocus?: (...args: any[]) => any | void;
  onChange?: (...args: any[]) => any | void;
};

type FieldProps = {
  is: FieldModel<any>;

  children:
    | React.ReactElement<FieldChildProps>
    | ((props: ReturnType<typeof useField>) => any);
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const nope = (..._: any[]) => {};

const compose =
  (g: any, f = nope) =>
  (x: any) => {
    g(x);

    f(x);
  };


// This component can be used in a way
// <Field field={fields.fieldname}><Input /></Field>
// But typescript cannot omit props dynamically based on which component wrapped another one so it's for an internal use
const Field: FC<FieldProps> = ({ children, is }) => {
  const field = useField(is);

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

  // it's up to you how to show errors but in this case we prioritize showing schema errors before external errors (for example "invalid credentials" error from api) 
  const error = errors?.[0] ?? externalErrors?.[0];

  if (typeof children == 'function') {
    return children(field);
  }

  return React.cloneElement(children, {
    value,
    focused,
    hasError: shouldShowValidation,
    // consider not writing any error messages right in the yup schema but set only paths to localization properties so you can map them in react render context
    // and you will not need to sync $errors with current language in i18n
    error: error ? t(error.name, { replace: error.params }) : undefined,
    onBlur: compose(onBlur, children.props.onBlur),
    onFocus: compose(onFocus, children.props.onFocus),
    onChange: compose(onChange, children.props.onChange)
  });
};


// with this decorator we can wrap existing components and get another one which maps field properties based on field passed to props
function withField<P extends FieldChildProps>(
  Component: ComponentType<P>
): ComponentType<
  Omit<P, keyof FieldChildProps> & {
    [T in keyof FieldChildProps]?: P[T];
  }
> {
  return (({ field, ...props }: P & { field: FieldModel<any> }) => {
    return (
      <Field is={field}>
        <Component {...(props as any)} />
      </Field>
    );
  }) as FC<
    Omit<P, keyof FieldChildProps> & {
      [T in keyof FieldChildProps]?: P[T];
    }
  >;
}

export { withField };

```

And we can use this decorator like this:

```typescript
import { Input } from 'path/something/input'
import { Checkbox } from 'path/something/checkbox'

const Field = {
   Input: withField(Input),
   
   Checkbox: withField(Checkbox)
};

```

And later in some of our forms we can use Field like this:

```tsx
const fields = useFields($$myForm);

// ...

<Field.Input field={fields.email} label='Email' />

<Field.Input field={fields.password} label='Password' />

// ...
```