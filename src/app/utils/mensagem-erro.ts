import { HttpErrorResponse } from '@angular/common/http';

// O backend responde erros em formatos diferentes: lista de mensagens, mapa campo -> mensagem,
// ProblemDetail ({ detail }) ou texto puro. Com responseType 'text' tudo chega como string.
export function extrairMensagemErro(error: HttpErrorResponse, padrao: string): string {
  if (error.status === 0) {
    return 'Não foi possível conectar à API.';
  }

  let corpo: any = error.error;
  if (typeof corpo === 'string') {
    try {
      corpo = JSON.parse(corpo);
    } catch {
      // Texto puro, às vezes no formato "[mensagem, [detalhe]]"
      const texto = corpo.replace(/[\[\]]/g, '').trim();
      return texto || padrao;
    }
  }

  if (Array.isArray(corpo)) {
    // O backend separa a lista nas vírgulas, inclusive as de dentro de uma mesma frase
    return corpo.join(', ').replace(/\., /g, '. ') || padrao;
  }
  if (corpo && typeof corpo === 'object') {
    if (corpo.detail) {
      return corpo.detail;
    }
    // Erro de validação: { campo: mensagem }
    const mensagens = Object.entries(corpo)
      .filter(([, valor]) => typeof valor === 'string')
      .map(([campo, valor]) => `${campo}: ${valor}`);
    if (mensagens.length) {
      return mensagens.join(' ');
    }
  }
  return padrao;
}
