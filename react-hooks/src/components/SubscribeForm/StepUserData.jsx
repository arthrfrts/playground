import { Button, TextField } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import SubscriptionValidations from '../../contexts/SubscriptionValidations';
import useErrors from '../../hooks/useErrors';

function StepUserData({onSubmit}) {
  const [userMail, setUserMail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const validations = useContext(SubscriptionValidations);
  const [formErrors, validateFields, isAllowed] = useErrors(validations);

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