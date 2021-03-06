import React, { useState } from 'react';

function useErrors(validations) {
  const initialState = createInitialState(validations);

  const [formErrors, setFormErrors] = useState(initialState);

  function validateFields(event) {

    const {name, value} = event.target;
    const newState = {...formErrors}

    newState[name] = validations[name](value);

    setFormErrors(newState);
  }

  function isAllowed() {
    let allow = true;

    for(let error in formErrors) {
      allow = formErrors[error].isValid;
    }

    return allow;
  }

  return [formErrors, validateFields, isAllowed];
}

function createInitialState(validations) {
  const initialState = []

  for(let field in validations) {
    initialState[field] = {
      isValid: true,
      helperText: ''
    }
  }

  return initialState;
}

export default useErrors;