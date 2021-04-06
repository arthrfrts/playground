export class SistemaAutenticacao {
  static login(autenticavel, senha) {
    if(SistemaAutenticacao.validaAutenticacao(autenticavel)) {
      return autenticavel.autenticar(senha);
    }
    
    return false;
  }

  static validaAutenticacao(autenticavel) {
    return "autenticar" in autenticavel && 
      autenticavel.autenticar instanceof Function;
  }
}