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

function isPasswordValid(password) {
  if(password.length < 6) {
    return {
      isValid: false,
      helperText: "Sua senha deve ter ao menos 6 caracteres."
    }
  } else {
    return {
      isValid: true,
      helperText: ''
    }
  }
}

export {isDocValid, isPasswordValid}