import { Container, Typography } from '@material-ui/core';
import './App.css';
import SubscribeForm from './components/SubscribeForm';
import 'fontsource-roboto';
import { isDocValid, isPasswordValid } from './models/subscribe';

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

      <SubscribeForm
        onSubmit={onFormSubmit}
        validations={{
          doc: isDocValid,
          password: isPasswordValid
        }}
      />
    </Container>
  );
}

function onFormSubmit(data) {
  console.log('onFormSubmit');

  console.debug(data);
}

export default App;