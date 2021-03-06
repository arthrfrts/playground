import React, { useState } from 'react';
import { Button, FormControlLabel, Switch, TextField } from '@material-ui/core';

function SubscribeForm({onSubmit, isDocValid}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [doc, setDoc] = useState('');
  const [optionPromo, setOptionPromo] = useState(true);
  const [optionNews, setOptionNews] = useState(true);
  const [formErrors, setFormErrors] = useState({doc:{isValid: true, helperText: "Somente números."}});
  
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.debug(e);
        onSubmit({firstName, lastName, doc, optionPromo, optionNews});
      }}
    >
      <TextField
        name="firstName"
        value={firstName}
        id="field_name"
        label="Nome"
        variant="outlined"
        margin="normal"
        fullWidth
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
      />
      <TextField
        name="lastName"
        value={lastName}
        id="field_lastname"
        label="Sobrenome"
        variant="outlined"
        margin="normal"
        fullWidth
        onChange={(e) => {
          setLastName(e.target.value)
        }}
      />
      <TextField
        name="doc"
        value={doc}
        id="field_doc"
        label="CPF"
        error={!formErrors.doc.isValid}
        helperText={formErrors.doc.helperText}
        variant="outlined"
        margin="normal"
        fullWidth
        onBlur={(e) => {
          setFormErrors({
            doc: isDocValid(doc)
          })
        }}
        onChange={(e) => {
          setDoc(e.target.value)
        }}
      />

      <FormControlLabel
        label="Promoções"
        control={
          <Switch 
            name="optionPromos"
            checked={optionPromo}
            color="primary"
            onChange={(e) => {
              setOptionPromo(e.target.checked)
            }}
          />
        }
      />

      <FormControlLabel
        label="Novidades"
        control={
          <Switch 
            name="optionNews"
            checked={optionNews}
            color="primary"
            onChange={(e) => {
              setOptionNews(e.target.checked)
            }}
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