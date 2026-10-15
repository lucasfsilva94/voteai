---
format: 1280x720
duration: 18s
message: "Primeiro as ideias, depois os nomes."
arc: Ideias → Respostas → Revelação
audience: eleitores brasileiros
mode: autonomous
music: none
captions: skipped (silent, on-screen instructional copy)
---

## Video direction
Editorial claro com verde #194B39, papel #F6F5EE e lime #C8EE57. DM Sans para interface e Fraunces para palavras centrais. Um assunto dominante por beat, layout amplo acima de y=596px. Quatro respostas permanecem legíveis. Regras GSAP sequenciais e assentes, sem bounce nem drift decorativo. Silêncio integral. Os nomes entram apenas na revelação. Não há percentuais nem ranking. Os dois nomes têm peso idêntico. Entre frames: cut; a continuidade é o mesmo topbar, mesma paleta e ritmo.

## Frame 1 — Ideias antes de nomes
- scene: A promessa e 25 propostas às cegas.
- duration: 6s
- poster: 4.5s
- transition_in: cut
- status: animated
- src: compositions/frames/01-ideias.html
- asset_candidates: assets/dm-sans.ttf — interface local; assets/dm-sans-bold.ttf — interface negrito local; assets/fraunces.ttf — display local
- blueprint: compose
- focal: proposal-sheet
- roles: typography = foreground; proposal-sheet = supporting

Scene 1 (0.0–1.5s): Topbar voteAI / COMO FUNCIONA. Sobre verde escuro, "Primeiro as ideias," em Fraunces claro ocupa metade esquerda; as palavras entram em stagger com smooth settle → dynamic-content-sequencing.
Scene 2 (1.5–3.4s): "depois os nomes." entra abaixo em lime. À direita uma grande folha papel com número "25" e rótulo "propostas às cegas" entra por spring-pop-entrance adaptado sem overshoot.
Scene 3 (3.4–6.0s): Três linhas curtas de temas "Saúde", "Educação", "Economia" revelam sequencialmente na folha; rodapé "Sem ver quem propôs." entra na metade final. Mantém leitura até o corte. → dynamic-content-sequencing.

## Frame 2 — Sua resposta tem peso
- scene: Quatro respostas, com importância dobrada.
- duration: 6s
- poster: 4.8s
- transition_in: cut
- status: animated
- src: compositions/frames/02-respostas.html
- asset_candidates: assets/dm-sans.ttf — interface local; assets/dm-sans-bold.ttf — interface negrito local; assets/fraunces.ttf — display local
- blueprint: compose
- focal: response-controls
- roles: typography = foreground; proposal-card = supporting; response-controls = foreground

Scene 1 (0.0–1.2s): Fundo papel. Topbar voteAI / VOCÊ DECIDE. Título "Leia. Pense. Responda." entra em verde escuro por stagger smooth settle. → dynamic-content-sequencing.
Scene 2 (1.2–3.3s): Folha verde ocupa centro largo, "O que você pensa sobre esta proposta?". Quatro controles surgem em sequência: "Discordo", "Concordo", "Importante ×2", "Não sei". Texto mínimo 25px. → spring-pop-entrance sem overshoot.
Scene 3 (3.3–4.5s): O controle "Importante ×2" comprime brevemente e volta sem overshoot; seu fundo lime se enfatiza. "Dê peso ao que importa para você." entra abaixo. → press-release-spring, sem efeitos/glow, recovery power3.out.
Scene 4 (4.5–6.0s): Sustenta todos os quatro controles legíveis. Uma pequena nota "25 propostas. Seu próprio critério." aparece. → dynamic-content-sequencing.

## Frame 3 — A revelação
- scene: Urna brasileira revela os nomes com peso igual, CTA.
- duration: 6s
- poster: 4.9s
- transition_in: cut
- status: animated
- src: compositions/frames/03-revelacao.html
- asset_candidates: assets/dm-sans.ttf — interface local; assets/dm-sans-bold.ttf — interface negrito local; assets/fraunces.ttf — display local
- blueprint: compose
- focal: ballot-machine
- roles: typography = foreground; ballot-machine = foreground; candidate-labels = supporting

Scene 1 (0.0–1.2s): Verde escuro. Topbar voteAI / A REVELAÇÃO. Título Fraunces "Agora, os nomes." no terço esquerdo. Urna brasileira estilizada de papel, tela cinza e teclado preto à direita chega com smooth settle. → spring-pop-entrance sem overshoot.
Scene 2 (1.2–3.0s): Na tela da urna, "Sua afinidade". Duas etiquetas idênticas revelam primeiro Lula / PT em #E4142C e depois Flávio Bolsonaro / PL em #004F9F. Sem percentuais, fotos ou ordem de ranking. → dynamic-content-sequencing.
Scene 3 (3.0–4.2s): A tecla física verde "CONFIRMA" acende automaticamente quando as respostas terminam, sem clique ou compressão. CTA largo lime no lado esquerdo "Descubra sua afinidade" entra. → dynamic-content-sequencing, acendimento automático.
Scene 4 (4.2–6.0s): "Comece pelas ideias." aparece abaixo do CTA e o conjunto segura até o fim, sem fade para preto. → dynamic-content-sequencing.


