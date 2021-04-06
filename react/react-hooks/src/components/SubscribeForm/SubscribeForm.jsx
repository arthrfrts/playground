import { Step, StepLabel, Stepper } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import StepPersonalData from './StepPersonalData';
import StepShippingData from './StepShippingData';
import StepUserData from './StepUserData';

function SubscribeForm({onSubmit}) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  
  useEffect(() => {
    if(step >= formSteps.length-1) {
      onSubmit(formData);
    }
  })

  const formSteps = [
    <StepUserData
      onSubmit={collectData}
    />,
    <StepPersonalData
      onSubmit={collectData}
    />,
    <StepShippingData
      onSubmit={collectData}
    />,
    <Alert
      severity="success"
    >
      <AlertTitle>
        Tudo pronto!
      </AlertTitle>
      Sua conta foi criada com successo :-)
    </Alert>
  ];

  function collectData(data) {
    setFormData({...formData, ...data});

    nextStep();
  }

  function nextStep() {
    setStep(step+1);
  }

  return (
    <>
    <Stepper
      activeStep={step}
    >
      <Step>
        <StepLabel>
          Login
        </StepLabel>
      </Step>
      <Step>
        <StepLabel>
          Pessoais
        </StepLabel>
      </Step>
      <Step>
        <StepLabel>
          Entrega
        </StepLabel>
      </Step>
      <Step>
        <StepLabel>
          Finalização
        </StepLabel>
      </Step>
    </Stepper>
      {formSteps[step]}
    </>
  )
}

export default SubscribeForm;