import { useForm } from '@filledout/react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Field } from '../../shared/form';
import { $$simple } from './model';

const Input: FC<{ value: string; onChange: (value: string) => void }> = ({
  value,
  onChange
}) => {
  return (
    <div>
      <label>Email</label>

      <input value={value} onChange={event => onChange(event.target.value)} />
    </div>
  );
};

const Simple = () => {
  const { t } = useTranslation();

  const { fields, onSubmit } = useForm($$simple.$$form);

  return (
    <form
      onSubmit={event => {
        event?.preventDefault();

        onSubmit();
      }}
    >
      <Field field={fields.email}>
        {({ errors, shouldShowValidation, value, onChange }) => {
          return (
            <>
              <Input value={value as string} onChange={onChange} />

              {shouldShowValidation && errors?.[0] && (
                <div>
                  {t(errors?.[0].name, {
                    replace: errors?.[0].params
                  })}
                </div>
              )}
            </>
          );
        }}
      </Field>

      <button type='submit'>Submit</button>
    </form>
  );
};

export { Simple };
