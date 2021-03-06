import { Container, Typography } from '@material-ui/core';
import './App.css';
import SubscribeForm from './components/SubscribeForm';
import 'fontsource-roboto';
import SubscriptionValidations from './contexts/SubscriptionValidations';
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

      <SubscriptionValidations.Provider
        value={{
          doc: isDocValid,
          password: isPasswordValid
        }}
      >
        <SubscribeForm
          onSubmit={onFormSubmit}
        />
      </SubscriptionValidations.Provider>
    </Container>
  );
}

function onFormSubmit(data) {
  console.log('onFormSubmit');

  console.debug(data);
}

export default App;