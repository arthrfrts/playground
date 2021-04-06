import React from 'react';
const SubscriptionValidations = React.createContext({
  doc: noValidation,
  password: noValidation
});

function noValidation(data) {
  console.debug('noValidation', data);
  return {
    isValid: true,
    helperText: ''
  };
}

export default SubscriptionValidations;