import { triggerAlert } from './getAlert/getAlert';

export const emailValidation = email => {
  const regx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const match = regx.test(email);
  return match;
};

export const instituteEmailValidation = email => {
  const regx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@iiitm.ac.in/;
  const match = regx.test(email);
  return match;
};

export const phonenoValidation = phoneno => {
  const regx = /^\d{10}$/;
  const match = regx.test(phoneno);
  return match;
};

export const gradutationYearValidation = (batchName, admissionYear, graduationYear) => {
  if (batchName === 'PhD') {
    return 1;
  }
  let duration = 0;
  switch (batchName) {
    case 'IPG':
      duration = 5;
      break;
    case 'BCS':
      duration = 4;
      break;
    default:
      duration = 2;
  }
  if (admissionYear + duration > graduationYear) {
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

export const urlValidation = url => {
  const regx = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
  const match = regx.test(url);
  return match;
};
