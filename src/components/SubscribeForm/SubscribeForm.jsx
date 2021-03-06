import { Typography } from '@material-ui/core';
import React, { useState } from 'react';
import StepPersonalData from './StepPersonalData';
import StepShippingData from './StepShippingData';
import StepUserData from './StepUserData';

function SubscribeForm({onSubmit, isDocValid}) {
  const[step, setStep] = useState(0);

  function currentForm(step) {
    switch(step) {
      case 0:
        return <StepUserData />;
      case 1:
        return <StepPersonalData onSubmit={onSubmit} isDocValid={isDocValid} />;
      case 2:
        return <StepShippingData />;
      default:
        return (
          <Typography>
            Erro.
          </Typography>
        )
    }
  }

  return (
    <>
      {currentForm(step)}
    </>
  )
}

export default SubscribeForm;