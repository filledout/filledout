import { FormModel } from '@filledout/core';

type FieldDescriptor<V, T> = {
  _path: string;
  _form: FormModel<V>;
  __valueType__: T;
};

type FormFieldsSelector<V> = {
  [P in keyof V]: V[P] extends Array<any>
    ? FieldDescriptor<V, V[P]> & FormFieldsSelector<V[P]>
    : V[P] extends object
    ? FieldDescriptor<V, V[P]> & FormFieldsSelector<V[P]>
    : FieldDescriptor<V, V[P]>;
};

export { FieldDescriptor, FormFieldsSelector };
