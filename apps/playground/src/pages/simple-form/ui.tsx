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

const SimpleFormPage = () => {
  const { submit } = useForm($$simpleFormPage.$$form);

  return (
    <div>
      <Email />

      <button onClick={submit}>Submit</button>
    </div>
  );
};

export { SimpleFormPage };
