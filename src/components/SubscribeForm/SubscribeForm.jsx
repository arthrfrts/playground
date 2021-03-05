import React from 'react';
import { Button, FormControlLabel, Switch, TextField } from '@material-ui/core';

function SubscribeForm() {
  let firstName = '';
  
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(firstName)
      }}
    >
      <TextField
        id="field_name"
        label="Nome"
        variant="outlined"
        margin="normal"
        fullWidth
        onChange={e => {
          firstName = e.target.value;
        }}
      />
      <TextField
        id="field_lastname"
        label="Sobrenome"
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        id="field_doc"
        label="CPF"
        variant="outlined"
        margin="normal"
        fullWidth
      />

      <FormControlLabel
        label="Promoções"
        control={
          <Switch 
            name="promos"
            defaultChecked
            color="primary"
          />
        }
      />

      <FormControlLabel
        label="Novidades"
        control={
          <Switch 
            name="news"
            defaultChecked
            color="primary"
          />
        }
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
      >
        Cadastrar
      </Button>
    </form>
  )
}

export default SubscribeForm;