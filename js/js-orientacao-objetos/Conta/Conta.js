export class Conta {
  constructor(saldoInicial, cliente, agencia) {
    if(this.constructor == Conta) {
      throw new Error('Não permitido'); // classe abstrata só pode ser herdada.
    }

    this._saldo = saldoInicial;
    this._cliente = cliente;
    this._agencia = agencia;
  }

  set cliente(novoValor) {
    if (novoValor instanceof Cliente) {
      this._cliente = novoValor;
    }
  }

  get cliente() {
    return this._cliente;
  }

  get saldo() {
    return this._saldo;
  }

  // Método abastrato.
  sacar(valor) {
    throw new Error('Saque direto não permitido.');
  }

  _sacar(valor, taxa) {
    if (this._saldo < valor) return 0;

    if(valor < 0) return 0;

    const valorSacado = taxa * valor;

    this._saldo -= valorSacado;
    return valor;
  }

  depositar(valor) {
    if (valor <= 0) return;

    this._saldo += valor;
    return valor;
  }

  transferir(valor, conta) {
    const valorSacado = this.sacar(valor);

    conta.depositar(valorSacado);
  }
}