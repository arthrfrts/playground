import { Button, TextField } from '@material-ui/core';
import React from 'react';

function StepShippingData() {
  return (
    <form>
      <TextField
        id="address"
        label="Endereço"
        type="text"
        variant="outlined"
        margin="normal"
        helperText="Endereço, número e complemento."
        fullWidth
      />
      <TextField
        id="zipcode"
        label="CEP"
        type="number"
        variant="outlined"
        margin="normal"
      />
      <TextField
        id="city"
        label="Cidade"
        type="text"
        variant="outlined"
        margin="normal"
      />
      <TextField
        id="state"
        label="Estado"
        type="text"
        variant="outlined"
        margin="normal"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
      >
          Finalizar cadastro
      </Button>
    </form>
  );
}

export default StepShippingData;