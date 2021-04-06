import { Cliente } from './Cliente.js';
import { Gerente } from './Funcionario/Gerente.js';
import { Diretor } from './Funcionario/Diretor.js';
import { SistemaAutenticacao } from './SistemaAutenticacao.js';

const diretor = new Diretor("Rodrigo", 1345678900, 10000);
const gerente = new Gerente("Lucia", 29481849200, 8000);

diretor.cadastrarSenha(123456789);
gerente.cadastrarSenha(123);

const diretorLogado = SistemaAutenticacao.login(diretor, "123456789");
const gerenteLogado = SistemaAutenticacao.login(gerente, "123");

const cliente = new Cliente("Alice", 12345678001, "123456");

const clienteLogado = SistemaAutenticacao.login(cliente, "123");

console.log(diretorLogado, gerenteLogado, clienteLogado);