import { environment } from 'src/environments/environment';

// A API devolve só o nome do arquivo (fotoArquivo/capaArquivo/audioArquivo); ele fica em /midia/<arquivo>
export function urlMidia(arquivo: string | null | undefined): string | null {
  return arquivo ? `${environment.apiUrl}/midia/${encodeURIComponent(arquivo)}` : null;
}

// Os mesmos limites da API: conferir antes evita mandar 5 MB só para ouvir "não"
export const TIPOS_IMAGEM = ['image/jpeg', 'image/png', 'image/webp'];
export const LIMITE_IMAGEM_MB = 5;
export const LIMITE_AUDIO_MB = 20;
