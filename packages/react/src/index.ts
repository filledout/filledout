import {
  BaseFieldModel,
  FormMeta,
  ValidationVisibilityCondition
} from '@filledout/core';
import { Store, StoreValue } from 'effector';
import { useStoreMap } from 'effector-react';
import { get } from 'object-path';
import { getFieldFormMeta } from 'packages/core/src/create-fields';

const createLib = () => {
  const useDirty = ({ $dirty }: FormMeta<any>, name: string) =>
    useStoreMap({
      store: $dirty,

      keys: [name],

      defaultValue: false,

      fn: (dirty, [name]) => dirty[name]
    });

  const useTouched = ({ $touched }: FormMeta<any>, name: string) =>
    useStoreMap({
      store: $touched,

      keys: [name],

      defaultValue: false,

      fn: (touched, [name]) => touched[name]
    });

  const useErrors = ({ $errors }: FormMeta<any>, name: string) =>
    useStoreMap({
      store: $errors,

      keys: [name],

      defaultValue: null,

      fn: (errors, [name]) => {
        return errors[name] ?? null;
      }
    });

  const useExternalErrors = (
    { $externalErrors }: FormMeta<any>,
    name: string
  ) =>
    useStoreMap({
      store: $externalErrors as Store<Record<string, any>>,

      keys: [name],

      defaultValue: null,

      fn: (errors, [name]) => {
        return errors[name] ?? get(errors, name) ?? null;
      }
    });

  const useValue = <V>({ $values }: FormMeta<any>, name: string) =>
    useStoreMap({
      store: $values,

      keys: [name],

      fn: (values, [name]) => get(values as any, name) as V
    });

  const useFocused = ({ $focused }: FormMeta<any>, name: string) =>
    useStoreMap({
      store: $focused,

      keys: [name],

      fn: (focused, [name]) => focused === name
    });

  const useSubmitted = ({ $submitCount }: FormMeta<any>) =>
    useStoreMap({
      store: $submitCount,

      keys: [],

      fn: count => count > 1
    });

  const useField = <F extends BaseFieldModel<any>>(field: F) => {
    const meta = getFieldFormMeta<StoreValue<F['$value']>>(field);

    const showValidationWhen = meta.showValidationOn!;

    const name = field.name;

    const submitted = useSubmitted(meta);

    const value = useValue(meta, name);

    const dirty = useDirty(meta, name);

    const touched = useTouched(meta, name);

    const errors = useErrors(meta, name);

    const focused = useFocused(meta, name);

    const externalErrors = useExternalErrors(meta, name);

    const shouldShowValidation =
      (showValidationWhen.includes(ValidationVisibilityCondition.Dirty) &&
        dirty) ||
      (showValidationWhen.includes(ValidationVisibilityCondition.Submitted) &&
        submitted) ||
      (showValidationWhen.includes(ValidationVisibilityCondition.Touched) &&
        touched);

    return {
      value,
      dirty,
      errors,
      touched,
      focused,
      externalErrors,
      shouldShowValidation
    };
  };

  return {
    useField,
    useDirty,
    useValue,
    useErrors,
    useFocused,
    useTouched,
    useSubmitted,
    useExternalErrors
  };
};

export { createLib };
