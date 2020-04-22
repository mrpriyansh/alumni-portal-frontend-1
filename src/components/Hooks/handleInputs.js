import { useState } from 'react';

// eslint-disable-next-line import/prefer-default-export
export const useForm = initialValues => {
  const [values, changeValue] = useState(initialValues);
  const func = e => {
    changeValue({ ...values, [e.target.name]: e.target.value });
  };
  return [values, func];
};
