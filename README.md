# Gravadora Campista — Frontend

Frontend em Angular 18 de uma gravadora de música fictícia: cadastro de bandas, álbuns e músicas, avaliações de 0 a 10, página de cada banda com a discografia e administração de usuários. Consome a API [GravadoraCampista-SpringBoot](https://github.com/WallaceCampista/GravadoraCampista-SpringBoot).

## Requisitos

- Node 18, 20 ou 22 (testado também com o Node 24)
- A API rodando em `http://localhost:8080` (veja o README do backend: MySQL no Docker + `./mvnw spring-boot:run` com JDK 21)

## Como rodar

```bash
npm ci
npm start
```

Abra `http://localhost:4200` e entre com o admin padrão da API: usuário `admin`, senha `Admin@123`. Com o banco vazio, a API já cria bandas, álbuns e músicas de exemplo, avaliados por 3 usuários comuns: `ana.lima`, `bruno.costa` e `carla.souza`, com a senha `Ouvinte@123`.

O endereço da API fica em `src/environments/environment.ts` (desenvolvimento) e `src/environments/environment-prod.ts` (build de produção).

## Build de produção

```bash
npx ng build
```

Gera o site em `dist/gravadora-campista` e pré-renderiza as rotas públicas. O build avisa que o pacote inicial passa de 500 kB (é o CSS completo do Bootstrap e do Font Awesome), mas o limite de erro é 1 MB.

## Telas

| Rota | Quem acessa | O que faz |
| --- | --- | --- |
| `/login` | todos | Login |
| `/cadastro` | todos | Cadastro de usuário (a senha precisa de 8+ caracteres, com maiúscula, minúscula, número e símbolo) |
| `/home` | logado | TOP 3 bandas pela média das avaliações |
| `/banda`, `/album`, `/musica` | logado | Cadastro e lista; todos avaliam (uma nota por pessoa, que pode ser trocada) e tocam as músicas com MP3; só o admin edita, apaga e troca a foto da banda, a capa do álbum ou o MP3 da música |
| `/pagebanda?idBanda=…` | logado | Página da banda com os álbuns e as faixas |
| `/usuario` | admin | Lista, edita e apaga usuários |

## Como a sessão funciona

- O login guarda o token JWT e o nome no `localStorage`; o status de admin é lido do próprio token. Recarregar a página (F5) mantém a sessão.
- O `AuthInterceptor` (`src/app/interceptors`) envia o token em toda chamada à API. Se a API responder `403` (token vencido ou inválido), a sessão é encerrada e a tela volta para o login com o aviso de sessão expirada.
- O `AuthGuard` exige login nas rotas internas e o `AdminGuard` protege `/usuario`.

## Avaliações

- Cada usuário tem uma nota por banda, álbum ou música, e avaliar de novo substitui a anterior.
- Ao abrir, o popup de avaliar (`popup-avaliar`) busca a nota do usuário logado em `/<tipo>/minha-avaliacao/<id>/`. Se já existe, mostra "Sua nota atual", preenche o campo e o botão vira "Trocar nota".

## Reprodutor

- O `PlayerService` (`src/app/service/servicos/player`) tem um único elemento de áudio para o site inteiro.
  - Ele é criado só no navegador, porque a pré-renderização (SSR) roda no servidor, onde não existe áudio.
  - Como o serviço não é recriado ao trocar de tela, a música continua tocando enquanto a pessoa navega.
- O reprodutor (`app-player`, em `src/app/components/audio/player`) fica fixo no pé da página. Ele mostra capa, nome, banda e álbum, e tem anterior, tocar/pausar, próxima, barra de progresso, volume e fechar.
  - "Anterior" depois de 3 segundos volta ao começo da faixa, como nos players.
  - No fim de uma faixa ele passa para a próxima da fila.
- De onde se toca:
  - página da banda: "Tocar álbum" e o ▶ de cada faixa, que toca o álbum a partir dela;
  - lista de músicas: o ▶ toca a partir da música, na ordem da tabela.
  - Na faixa que está tocando, o mesmo botão pausa e continua. Só entram na fila as músicas com MP3.
- Media Session API: as teclas de mídia do teclado funcionam, e o controle de mídia do sistema mostra o nome, a banda, o álbum e a capa.
- No popup de edição da música, o admin envia, troca ou remove o MP3 (`app-editar-audio`).
  - O envio acontece na hora, e a duração lida do arquivo aparece no campo, que fica só para leitura.
  - No cadastro, a duração é opcional.

## Imagens

- O componente `app-capa` (`src/app/components/imagem/capa`) mostra a foto da banda ou a capa do álbum.
  - A API devolve só o nome do arquivo (`fotoArquivo`/`capaArquivo`), e a função `urlMidia` (`src/app/utils/midia.ts`) monta o endereço `/midia/<arquivo>`.
  - Sem imagem, ou se ela não carregar, o componente mostra um quadro colorido com as iniciais. A cor sai do nome, então se repete a cada visita.
- No popup de edição de banda e de álbum, o admin envia, troca ou remove a imagem (`app-editar-imagem`).
  - O envio acontece na hora, separado do botão "Salvar".
  - Tipo (JPG, PNG ou WebP) e tamanho (até 5 MB) são conferidos antes de enviar; a API confere de novo.
