# Validação do explainer voteAI

18 segundos, 1280×720, silêncio completo. CLI reproduzível no package.json: HyperFrames 0.8.155. A consulta avulsa inicial usou 0.8.157; a validação final e os snapshots usam 0.8.155, sem alteração do pin.

- Fonte: briefing confirmado e fontes do projeto local. Sem captura externa ou serviços pagos.
- `build-frame.mjs --preset editorial-forest --hyperframes .`: preset adaptado aos tokens da marca; overrides locais de DM Sans e Fraunces documentados no frame.md.
- `frame-packets.mjs --project . --storyboard STORYBOARD.md`: três packets oficiais.
- Worker delegado inicial falhou antes de escrever arquivos por limite de uso. Construção recuperada inline a partir dos packets existentes.
- `assemble-index.mjs --storyboard STORYBOARD.md --hyperframes .`: três frames, duração18s, nenhuma faixa de áudio.
- Transições injetadas/verificadas: três cortes, nenhum overlap.
- Snapshots: 0,4.5,5.9,6.2,10.8,11.9,12.2,16.9,17.99s. Contact sheet revisada visualmente, sem crops ou conflitos entre cenas.
- `keyframes . --selector .f03-urna --shot assets/urna-keyframes.png --samples 4 --from 12 --to 17`: um movimento seekable, sem relógio/randomness.
- Poster: assets/poster-ideias.png, copiado para ../../dist/assets/voteai-explainer-poster.png.
- Check final `npm run check -- --strict --json`: passa, zero erros/avisos em lint/runtime/layout, 64/64 verificações de contraste aprovadas. Motion assertions ausentes; keyframes e snapshots inspecionados separadamente.
- Preview persistente: http://localhost:3002/#project/voteai-explainer.

Exportação aprovada pelo usuário em 2026-10-14 e concluída. Comando executado: `npx --yes hyperframes@0.8.155 render --skill=product-launch-video --quality delivery --output ../../dist/assets/voteai-explainer.mp4`.


## Exportação concluída
- Saída: ../../dist/assets/voteai-explainer.mp4, 798097 bytes (779.4KiB).
- ffprobe: H.264,1280×720,30/1fps,18.000000s,540frames/540framesdecodificados, uma stream de vídeo e nenhuma stream de áudio.
- Frames extraídos do arquivo final em4.5,10.8 e16.9s foram inspecionados visualmente em .hyperframes/artifacts/render-qc/.
- Summary:20.4s totais; screenshot capture · hardware gpu · compile0.8s · setup3.3s · capture12.3s · encode3.9s · assemble0.1s. Cinco workers de captura resolvidos pela CLI.
- Primeira tentativa falhou por ausência de FFmpeg/FFprobe noPATH. Resolvido com FFmpeg9.0.2Essentials do fornecedor Gyan listado por https://ffmpeg.org/download.html (https://www.gyan.dev/ffmpeg/builds/), pacoteSHA256verificado e extraído em C:/Users/lucas/.cache/hyperframes-tools/ffmpeg. PATH alterado somente no processo do render.
- Studio permanece em http://localhost:3002/#project/voteai-explainer. Nenhuma publicação realizada neste trabalho.
