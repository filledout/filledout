import { FieldDescriptor, useField } from '@filledout/react';
import { noop } from 'packages/core/src/utils';
import { ComponentType } from 'react';
import { useTranslation } from 'react-i18next';

interface FieldWrappedComponentProps<V> {
  value: V;
  error?: string;
  focused: boolean;
  hasError: boolean;
  onBlur: (...args: unknown[]) => unknown | void;
  onFocus: (...args: unknown[]) => unknown | void;
  onChange: (...args: unknown[]) => unknown | void;
}

interface UseFieldPropsParams<V, T> {
  field: FieldDescriptor<V, T>;
}

type Fn = (...args: any[]) => any;

const compose = (...fns: Fn[]): Fn => {
  return fns.reduceRight(
    (f, g) =>
      (...args) =>
        f(g(...args))
  );
};

const useFieldProps = <V, T>(
  _field: FieldDescriptor<V, T>,
  props: Partial<FieldWrappedComponentProps<V>>
): FieldWrappedComponentProps<V> => {
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
    value: value as V,
    focused,
    hasError: shouldShowValidation,
    error: error ? t(error.name, { replace: error.params }) ?? '' : undefined,
    onBlur: compose(onBlur, props.onBlur ?? noop),
    onFocus: compose(onFocus, props.onFocus ?? noop),
    onChange: compose(onChange, props.onChange ?? noop)
  };
};

const withField = <V, T>(
  Component: ComponentType<FieldWrappedComponentProps<V>>
) => {
  return (({
    field,
    ...props
  }: UseFieldPropsParams<V, T> & Partial<FieldWrappedComponentProps<V>>) => {
    const _props = useFieldProps(field, props);

    return <Component {...props} {..._props} />;
  }) as ComponentType<
    UseFieldPropsParams<V, T> & Partial<FieldWrappedComponentProps<V>>
  >;
};

export { withField, useFieldProps };
