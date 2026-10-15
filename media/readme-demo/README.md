# voteAI · vídeo de demonstração

Vídeo do README feito com [Remotion](https://www.remotion.dev/): mockups de navegador e celular com capturas reais do site, 1280×720, 30 fps, cerca de 18 s, pensado para rodar em loop.

## Cenas

| Cena | Arquivo | O que mostra |
| --- | --- | --- |
| Abertura | `src/scenes/Intro.tsx` | Símbolo, nome e lema |
| Desktop | `src/scenes/DesktopScene.tsx` | Cursor começa o teste, concorda e marca Importante |
| Celular | `src/scenes/MobileScene.tsx` | Toques no celular, votação sem rolagem |
| Urna | `src/scenes/UrnScene.tsx` | As duas urnas digitam o número (22 e 13) e revelam o resultado |
| Encerramento | `src/scenes/Outro.tsx` | Endereço do site; termina no mesmo verde da abertura para o loop |

As capturas ficam em `public/shots/` (desktop 1280×900 e celular 390×844, com densidade 2x). A posição dos botões usada pelo cursor e pelos toques está em `src/theme.ts`.

## Comandos

```bash
npm install
npx remotion studio
npx remotion render VoteAIDemo out/voteai-demo.mp4
```

O GIF do README é gerado a partir do MP4 com o ffmpeg que vem com o Remotion:

```bash
npx remotion ffmpeg -i out/voteai-demo.mp4 -r 15 -vf "scale=896:504:flags=lanczos,split[a][b];[a]palettegen=max_colors=160:stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=4:diff_mode=rectangle" -loop 0 out/voteai-demo.gif
```

Copie o GIF para `docs/media/`; o MP4 fica só em `out/`, como etapa intermediária.
