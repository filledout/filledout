import { ValidationVisibilityCondition } from '@filledout/core';
import { useUnit } from 'effector-react';
import { useMemo } from 'react';
import {
  useDirty,
  useErrors,
  useFocused,
  useSubmitted,
  useTouched,
  useValue
} from './selectors';
import { FieldDescriptor } from './types';

const useField = <T, F>(field: FieldDescriptor<F, T>) => {
  const { _form, _path: path } = field;

  const showValidationWhen = field._form.showValidationOn!;

  const submitted = useSubmitted(_form);

  const value = useValue<T>(_form, path);

  const dirty = useDirty(_form, path);

  const touched = useTouched(_form, path);

  const errors = useErrors(_form, path);

  const focused = useFocused(_form, path);

  const shouldShowValidation =
    (showValidationWhen.includes(ValidationVisibilityCondition.Dirty) &&
      dirty) ||
    (showValidationWhen.includes(ValidationVisibilityCondition.Submitted) &&
      submitted) ||
    (showValidationWhen.includes(ValidationVisibilityCondition.Touched) &&
      touched);

  const handlers = useUnit({
    change: _form.change,
    blur: _form.blured,
    focus: _form.focused
  });

  const { onChange, onBlur, onFocus } = useMemo(() => {
    const onChange = (value: T) => {
      handlers.change({ path, value });
    };

    const onBlur = () => {
      handlers.blur({ path });
    };

    const onFocus = () => {
      handlers.focus({ path });
    };

    return {
      onBlur,
      onFocus,
      onChange
    };
  }, [path]);

  return {
    value,
    dirty,
    errors,
    onBlur,
    onFocus,
    touched,
    focused,
    onChange,
    shouldShowValidation
  };
};

export { useField };
