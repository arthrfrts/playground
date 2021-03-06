import { Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';

function StepUserData({onSubmit, validations}) {
  const [userMail, setUserMail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [formErrors, setFormErrors] = useState({password:{isValid: true, helperText: ""}});

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

  return (
    <form onSubmit={(e) => {
      e.preventDefault();

      if(isAllowed()) {
        onSubmit({userMail, userPassword});
      }
    }}>
      <TextField
        name="email"
        id="email"
        label="Endereço de email"
        type="email"
        variant="outlined"
        margin="normal"
        fullWidth
        required
        value={userMail}
        onChange={(e) => {
          setUserMail(e.target.value);
        }}
      />
      <TextField
        name="password"
        id="password"
        label="Senha"
        type="password"
        variant="outlined"
        margin="normal"
        fullWidth
        required
        error={!formErrors.password.isValid}
        helperText={formErrors.password.helperText}
        value={userPassword}
        onBlur={validateFields}
        onChange={(e) => {
          setUserPassword(e.target.value);
        }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
      >
        Próximo
      </Button>
    </form>
  );
}

export default StepUserData;