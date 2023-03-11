type InputProps = {
  value: string;
  label?: string;
  hasError?: boolean;
  error?: string;
  onChange: (value: string) => void;
};

const Input = ({ value, label, onChange, hasError, error }: InputProps) => (
  <div>
    {label && <label>{label}</label>}

    <input value={value} onChange={event => onChange(event.target.value)} />

    {hasError && <div style={{ color: 'red' }}>{error}</div>}
  </div>
);

export { Input };
