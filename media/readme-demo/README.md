# voteAI · vídeos

Projeto [Remotion](https://www.remotion.dev/) com os dois vídeos do voteAI. Os dois usam 1280×720, 30 fps e loop sem emenda (começam e terminam no mesmo verde), e os mockups usam capturas reais do site.

| Composição | Onde aparece | Duração |
| --- | --- | --- |
| `LandingVideo` | Página inicial (`dist/assets/voteai-explainer.mp4` e a capa `voteai-explainer-poster.png`) e GIF do README (`docs/media/voteai-demo.gif`) | cerca de 20 s |
| `VoteAIDemo` | Demonstração alternativa, só com as telas do site (não publicada) | cerca de 18 s |

## Cenas da página inicial (`src/landing/`)

| Cena | Arquivo | O que mostra |
| --- | --- | --- |
| 2º turno | `RunoffScene.tsx` | Data do 2º turno e os dois candidatos, cartões iguais e em ordem alfabética |
| Às cegas | `NotesScene.tsx` | Três post-its de propostas que os dois apoiam recebendo selos e saindo |
| Computador e celular | `DevicesScene.tsx` | O mesmo teste respondido com cursor e com toque |
| Urna | `../scenes/UrnScene.tsx` | As urnas digitam 22 e 13 e revelam o resultado |
| Encerramento | `EndScene.tsx` | Marca, frase e fatos; volta ao verde inicial |

## Cenas do README (`src/scenes/`)

Abertura, desktop, celular, urna e encerramento, com as mesmas capturas.

As capturas ficam em `public/shots/` (desktop 1280×900 e celular 390×844, com densidade 2x); os retratos, em `public/portraits/`; as fontes do site, em `public/fonts/`. A posição dos botões usada pelo cursor e pelos toques está em `src/theme.ts`.

## Comandos

```bash
npm install
npx remotion studio
npx remotion render LandingVideo ../../dist/assets/voteai-explainer.mp4 --codec=h264 --crf=23
npx remotion still LandingVideo ../../dist/assets/voteai-explainer-poster.png --frame=62
npx remotion render LandingVideo out/landing.mp4
```

O GIF do README é gerado a partir do MP4 com o ffmpeg que vem com o Remotion (que não tem o filtro `fps`, por isso `-r 12`), ficando com cerca de 5 MB:

```bash
npx remotion ffmpeg -i out/landing.mp4 -r 12 -vf "scale=896:504:flags=lanczos,split[a][b];[a]palettegen=max_colors=144:stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=4:diff_mode=rectangle" -loop 0 out/voteai-demo.gif
```

Copie o GIF para `docs/media/`; os MP4 intermediários ficam só em `out/`.
