# Arquitetura

Aplicação estática, sem backend, conta ou chave de API, feita com React, React Router e TypeScript e empacotada pelo Vite. O build gera `dist/`, que é publicado no GitHub Pages.

- `src/data/`: catálogo de propostas com referências (`catalog.ts`), textos da página inicial (`content.ts`) e retratos (`portraits.ts`).
- `src/lib/`: regras puras e testadas. `engine.ts` faz seleção, cálculo e validação de sessão; `media.ts` prepara e toca o MP3 real de confirmação (AudioContext desbloqueado no gesto do teste, buffer decodificado em cache e alternativa com HTMLAudio); `catalog.ts` busca propostas e ícones dos temas.
- `src/state/`: a sessão salva e o som (`session.tsx`) e os avisos (`toast.tsx`), compartilhados por contexto.
- `src/pages/`: uma pasta por rota (início, teste, urna, resultado, fontes), com os hooks de cada tela, como o ajuste do texto da proposta, o arraste da nota e a simulação da urna. Resultado e Fontes carregam sob demanda (`React.lazy`).
- `src/components/`: peças compartilhadas, como a urna, o bloco de notas, os botões de resposta, o cabeçalho e o rodapé. Cada componente importa o próprio CSS; os tokens e a base ficam em `src/styles/`.
- `src/assets/`: fontes, retratos, som e vídeo, importados pelo código para ganhar hash no nome. `public/` guarda só o que precisa de endereço fixo: favicon, ícone do iPhone e a capa do vídeo, que também é a imagem de compartilhamento.

Rotas sem `#`: `/voteai/`, `/voteai/teste`, `/voteai/urna`, `/voteai/resultado` e `/voteai/fontes`. Como o GitHub Pages só serve arquivos, um plugin no `vite.config.ts` copia o `index.html` para a pasta de cada rota e para `404.html`, então qualquer endereço abre com status 200 e o React Router mostra a página certa. Links antigos com `#` são redirecionados em `src/main.tsx`.

Sessão versionada sob `voteai:session:1` em localStorage. Sem armazenamento, o estado permanece na memória da aba. A última resposta dispara automaticamente a apuração; falha de autoplay não bloqueia o resultado. Compartilhamento envia somente resumo e URL por ação explícita.

Vídeo editável no projeto Remotion em `video/` (composição `LandingVideo`, usada na página inicial e no GIF do README; fontes e retratos copiados de `src/assets/` por `video/scripts/sync-assets.mjs`), com controles e alternativa para movimento reduzido.

Testes: `tests/*.test.ts` rodam no Vitest; `tests/*.browser.mjs` usam Playwright com o Chrome instalado contra o build servido por `npm run preview`.

Publicação pelo workflow `.github/workflows/pages.yml`: a cada push na `main`, instala as dependências, roda os testes, confere os tipos, gera o build e publica `dist/`. Dados editoriais são um snapshot estático, sem sincronização automática ou chamadas a APIs externas durante o teste.
