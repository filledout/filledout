import { useFieldListeners, useForm } from '@filledout/react';
import { FC, useRef } from 'react';
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
  // calls validation on mount (in case you dont have dynamic $initialValues)
  // fields are proxies and to prevent re-generation of proxies we cache them using special hook useFields or useForm uses it under the hood (after unmount it's gonna cleanup the proxies)
  // proxy caching also needed to save object reference for memo-ed props to work properly

  const { t } = useTranslation();

  const { fields, onSubmit } = useForm($$simple.$$form);

  useFieldListeners(fields.email, {
    focus: () => {
      console.log('focus');
    },

    blur: () => {
      console.log('focus');
    }
  });

  return (
    <form
      onSubmit={event => {
        event?.preventDefault();

        onSubmit();
      }}
    >
      <Field is={fields.email}>
        {({ errors, shouldShowValidation, value, onChange }) => {
          return (
            <>
              <Input value={value} onChange={onChange} />

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
