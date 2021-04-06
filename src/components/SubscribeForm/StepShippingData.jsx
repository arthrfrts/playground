import { Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';

function StepShippingData({onSubmit}) {
  const [address, setAddress] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  return (
    <form onSubmit= {
      (e) => {
        e.preventDefault();

        onSubmit({address, zipcode, city, state});
      }
    }>
      <TextField
        id="address"
        label="Endereço"
        type="text"
        variant="outlined"
        margin="normal"
        helperText="Endereço, número e complemento."
        fullWidth
        required
        value={address}
        onChange={(e) => {
          setAddress(e.target.value)
        }}
      />
      <TextField
        id="zipcode"
        label="CEP"
        type="number"
        variant="outlined"
        margin="normal"
        required
        value={zipcode}
        onChange={(e) => {
          setZipcode(e.target.value)
        }}
      />
      <TextField
        id="city"
        label="Cidade"
        type="text"
        variant="outlined"
        margin="normal"
        required
        value={city}
        onChange={(e) => {
          setCity(e.target.value)
        }}
      />
      <TextField
        id="state"
        label="Estado"
        type="text"
        variant="outlined"
        margin="normal"
        required
        value={state}
        onChange={(e) => {
          setState(e.target.value)
        }}
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