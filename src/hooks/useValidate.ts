import { useState } from 'react';

const useValid = (rules: { [key: string]: (value: string) => boolean }) => {
  const [values, setValues] = useState<{ [key: string]: string }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (name: string, value: string) => {
    setValues({ ...values, [name]: value });
  };

  const handleBlur = (name: string, value: string) => {
    const isValid = rules[name](value);
    setErrors({ ...errors, [name]: isValid ? '' : `Invalid ${name}` });
  };

  return {
    values,
    errors,
    handleChange,
    handleBlur,
    isValidForm: () => {
      const errorValues = Object.values(errors);
      return !errorValues.some((error) => error !== '');
    },
  };
};

export default useValid;
