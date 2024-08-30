export interface Usuario {
  usuarioId: number;
  username: string;
  password: string;
  email: string;
  primeiroNome: string;
  sobrenome: string;
  isAdmin: boolean;
  excluido: boolean;
  criadoEm: string; // Usar string para representar a data e hora
  ultimoLogin: string; // Usar string para representar a data e hora
}
