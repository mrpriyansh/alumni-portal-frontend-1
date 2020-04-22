import { triggerAlert } from './getAlert/getAlert';

export const emailValidation = email => {
  const regx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const match = regx.test(email);
  return match;
};

export const phonenoValidation = phoneno => {
  const regx = /^\d{10}$/;
  const match = regx.test(phoneno);
  return match;
};

export const gradutationYearValidation = (actualYear, inputYear) => {
  if (actualYear > inputYear) {
    triggerAlert({ icon: 'error', title: 'Please Enter correct Graduation Year' });
    return 0;
  }
  return 1;
};

export const isNull = ({ obj }) => {
  for (const property in obj) {
    if (!obj(property)) {
      triggerAlert({ icon: 'error', title: 'Enter Valid Details.' });
      return 0;
    }
  }
  return 1;
};
