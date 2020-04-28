import { useState } from 'react';

// eslint-disable-next-line import/prefer-default-export
export const useForm = initialValues => {
  const [values, changeValue] = useState(initialValues);
  const func = e => {
    const { name, value } = e.target;
    changeValue(state => {
      return { ...state, [name]: value };
    });
  };
  return [values, func];
};
