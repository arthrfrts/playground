import { Container, Typography } from '@material-ui/core';
import './App.css';
import SubscribeForm from './components/SubscribeForm';
import 'fontsource-roboto';

function App() {
  return (
    <Container
      component="article"
      maxWidth="sm"
    >
      <Typography
        variant="h4"
        component="h1"
        align="center"
      >
        Formulário de cadastro
      </Typography>

      <SubscribeForm onSubmit={onFormSubmit} isDocValid={isDocValid} />
    </Container>
  );
}

function onFormSubmit(data) {
  console.debug(data);
}

function isDocValid(doc) {
  if(doc.length !== 11) {
    return {
      isValid: false,
      helperText: "Por favor, preencha um CPF válido"
    }
  } else {
    return {
      isValid: true,
      helperText: "Somente números."
    }
  }
}

export default App;