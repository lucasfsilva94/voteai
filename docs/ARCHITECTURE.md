# Arquitetura

Aplicação estática, sem backend, conta ou chave de API. `catalog.js` contém dados e referências; `engine.js` contém seleção, cálculo e validação de sessão; `app.js` contém renderização, eventos e transições; `styles.css` contém o sistema visual e a urna.

`media.js` prepara e reproduz o MP3 real de confirmação: AudioContext desbloqueado no gesto do teste, buffer decodificado em cache e fallback HTMLAudio. A última resposta dispara automaticamente a apuração; falha de autoplay não bloqueia resultado. Vídeo editável no projeto Remotion em `video/` (composição `LandingVideo`, usada na página inicial e no GIF do README; fontes e retratos copiados de `dist/` por `video/scripts/sync-assets.mjs`); MP4/poster distribuídos como assets estáticos, com controles e alternativa para movimento reduzido.

Sessão versionada sob `voteai:session:1` em localStorage. Sem armazenamento, o estado permanece na memória da aba. Cálculo puro roda no cliente. Compartilhamento envia somente resumo e URL por ação explícita.

`scripts/serve.mjs` serve dist apenas em loopback. `tests/engine.test.mjs` usa node:test. `tests/flow.browser.mjs` usa Playwright com Chrome instalado, sem download de outro navegador. Não há comando de build: dist é o artefato final.

Publicação no GitHub Pages pelo workflow `.github/workflows/pages.yml`: a cada push na `main`, os testes rodam e a pasta `dist/` é publicada como está. Dados editoriais são um snapshot estático, sem sincronização automática ou chamadas a APIs externas durante o teste.
