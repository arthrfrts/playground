import { Button, TextField } from '@material-ui/core';
import React from 'react';

function StepUserData() {
  return (
    <form>
      <TextField
        id="email"
        label="Endereço de email"
        type="email"
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        id="password"
        label="Senha"
        type="password"
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
      >
        Cadastrar
      </Button>
    </form>
  );
}

export default StepUserData;