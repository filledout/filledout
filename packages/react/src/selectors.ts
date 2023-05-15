import { FormModel } from '@filledout/core';
import { Store } from 'effector';
import { useStoreMap } from 'effector-react';
import { get } from './utils';

const useDirty = ({ $dirty }: FormModel<any>, name: string) =>
  useStoreMap({
    store: $dirty,

    keys: [name],

    defaultValue: false,

    fn: (dirty, [name]) => dirty[name]
  });

const useTouched = ({ $touched }: FormModel<any>, name: string) =>
  useStoreMap({
    store: $touched,

    keys: [name],

    defaultValue: false,

    fn: (touched, [name]) => touched[name]
  });

const useErrors = ({ $errors }: FormModel<any>, name: string) =>
  useStoreMap({
    store: $errors,

    keys: [name],

    defaultValue: null,

    fn: (errors, [name]) => {
      return errors[name] ?? null;
    }
  });

const useValue = <V>({ $values }: FormModel<any>, name: string) =>
  useStoreMap({
    store: $values,

    keys: [name],

    fn: (values, [name]) => get(values as any, name) as V
  });

const useFocused = ({ $focused }: FormModel<any>, name: string) =>
  useStoreMap({
    store: $focused,

    keys: [name],

    fn: (focused, [name]) => focused === name
  });

const useSubmitted = ({ $submitCount }: FormModel<any>) =>
  useStoreMap({
    store: $submitCount,

    keys: [],

    fn: count => count >= 1
  });

export {
  useDirty,
  useValue,
  useErrors,
  useTouched,
  useFocused,
  useStoreMap,
  useSubmitted
};
