import { FC } from 'react';
import { Field } from '../../shared/form';
import { useForm } from '../../shared/form/factory';
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
  const { fields } = useForm($$simple.$$form);

  return (
    <div>
      <Field is={fields.email}>
        {({ value, onChange }) => {
          return <Input value={value} onChange={onChange} />;
        }}
      </Field>
    </div>
  );
};

export { Simple };
