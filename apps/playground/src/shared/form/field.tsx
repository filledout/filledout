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

type UseFieldPropsParams<V = any, T = any> = {
  field: FieldDescriptor<V, T>;
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const nope = (..._: any[]) => {};

const compose =
  (g: any, f = nope) =>
  (x: any) => {
    g(x);

    f(x);
  };

function useFieldProps<T extends FieldDescriptor<any, any>>(
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
    externalErrors,
    shouldShowValidation
  } = field;

  const error = errors?.[0] ?? externalErrors?.[0];

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

function withField<P extends FieldWrappedComponentProps>(
  Component: ComponentType<P>
) {
  return (({ field, ...props }: P & UseFieldPropsParams) => {
    const _props = useFieldProps(field, props);

    return <Component {...props} {...(_props as any)} />;
  }) as ComponentType<
    Omit<P, 'value' | 'onChange' | 'error' | 'hasError'> & UseFieldPropsParams
  >;
}

export { withField };
