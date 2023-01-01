import { useUnit } from 'effector-react';
import { useField, useForm } from '../../shared/form';
import { $$simpleFormPage } from './model';

const Email = () => {
  const { value, onChange, onBlur, onFocus } = useField(
    $$simpleFormPage.$$form.fields.email
  );

  return (
    <input
      value={value}
      onChange={event => onChange(event.target.value)}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
};

const Password = () => {
  const { value, onChange, onBlur, onFocus } = useField(
    $$simpleFormPage.$$form.fields.password
  );

  return (
    <input
      value={value}
      onChange={event => onChange(event.target.value)}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
};

$$simpleFormPage.$$form.$values.watch(v => console.log(v));
const Roles = () => {
  const { onDelete, onAdd } = useUnit({
    onAdd: $$simpleFormPage.$$form.fields.roles.add,

    onDelete: $$simpleFormPage.$$form.fields.roles.remove
  });

  const { value, onFocus, onBlur, onChange } = useField(
    $$simpleFormPage.$$form.fields.roles
  );

  return (
    <div>
      {value?.map((role, index) => {
        return (
          <div key={index}>
            <input
              onChange={event => {
                const roles = [...value];

                roles[index] = event.target.value;

                onChange(roles);
              }}
              value={role}
              onFocus={onFocus}
              onBlur={onBlur}
            />

            <div
              onClick={() => {
                onDelete(index);
              }}
            >
              delete
            </div>
          </div>
        );
      })}

      <button
        onClick={() => {
          onAdd({ at: 'end', value: '' });
        }}
      >
        Add role
      </button>
    </div>
  );
};

const SimpleFormPage = () => {
  const { submit } = useForm($$simpleFormPage.$$form);

  return (
    <div>
      <Email />

      <Password />

      <Roles />

      <button onClick={submit}>Submit</button>
    </div>
  );
};

export { SimpleFormPage };
