# voteAI · vídeo

Projeto [Remotion](https://www.remotion.dev/) com o vídeo do voteAI, a composição `LandingVideo`: 1280×720, 30 fps, cerca de 20 s, sem locução e com loop sem emenda (começa e termina no mesmo verde). Ele aparece na página inicial (`dist/assets/voteai-explainer.mp4`, com a capa `voteai-explainer-poster.png`, que também é a imagem de compartilhamento) e, em GIF, no README (`docs/media/voteai-demo.gif`). Os mockups usam capturas reais do site.

## Cenas (`src/landing/`)

| Cena | Arquivo | O que mostra |
| --- | --- | --- |
| 2º turno | `RunoffScene.tsx` | Data do 2º turno e os dois candidatos, cartões iguais e em ordem alfabética |
| Às cegas | `NotesScene.tsx` | Três post-its de propostas que os dois apoiam recebendo selos e saindo |
| Computador e celular | `DevicesScene.tsx` | O mesmo teste respondido com cursor e com toque |
| Urna | `UrnScene.tsx` | As urnas digitam 22 e 13 e revelam o resultado |
| Encerramento | `EndScene.tsx` | Marca, frase e fatos; volta ao verde inicial |

## Arquivos

- `public/shots/`: capturas do site (desktop 1280×900 e celular 390×844, com densidade 2x). A posição dos botões usada pelo cursor e pelos toques está em `src/theme.ts`.
- `public/fonts/` e `public/portraits/`: cópias das fontes e dos retratos de `dist/assets/`, feitas por `scripts/sync-assets.mjs`. Ficam fora do Git, e os comandos abaixo as atualizam antes de abrir ou renderizar.

## Comandos

```bash
npm install
npm run dev        # Remotion Studio, para editar com prévia
npm run render     # gera ../dist/assets/voteai-explainer.mp4
npm run poster     # gera ../dist/assets/voteai-explainer-poster.png
```

O GIF do README sai do mesmo vídeo, com o ffmpeg que vem com o Remotion (que não tem o filtro `fps`, por isso `-r 12`), e fica com cerca de 5 MB:

```bash
npx remotion render LandingVideo out/landing.mp4
npx remotion ffmpeg -i out/landing.mp4 -r 12 -vf "scale=896:504:flags=lanczos,split[a][b];[a]palettegen=max_colors=144:stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=4:diff_mode=rectangle" -loop 0 out/voteai-demo.gif
```

Copie o GIF para `../docs/media/`. Tudo em `out/` é intermediário e fica fora do Git.
