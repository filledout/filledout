import { useField } from '../../shared/form';
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
  return (
    <div>
      <Email />
    </div>
  );
};

export { SimpleFormPage };
