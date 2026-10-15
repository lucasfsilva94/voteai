---
name: voteAI
description: "Primeiro as ideias. Depois os nomes."
colors:
  paper: "#f6f5ee"
  white: "#fffef9"
  ink: "#173d2f"
  green: "#194b39"
  muted: "#59695e"
  sage: "#e4e9dd"
  lime: "#e2efbb"
  line: "#d5dacf"
  orange: "#995c34"
  pt-red: "#e4142c"
  pt-paper: "#ffedef"
  pl-blue: "#004f9f"
  pl-green: "#009640"
  pl-yellow: "#ffd500"
  pl-paper: "#eaf2fb"
  electric-lime: "#c8ee57"
  green-hover: "#0d3526"
  choice-hover: "#edf1e5"
  lime-hover: "#d5e7a9"
  focus: "#63872d"
  note: "#fffef9"
  note-2: "#f1f3ea"
  note-3: "#e7eadf"
  note-4: "#dde2d2"
  note-edge: "#cdd4c2"
typography:
  display:
    fontFamily: "'Fredoka', 'Rubik', sans-serif"
    fontSize: "clamp(50px,5.4vw,78px)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-.01em"
  headline:
    fontFamily: "'Rubik', sans-serif"
    fontSize: "43px"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-.02em"
  proposal:
    fontFamily: "'Rubik', sans-serif"
    fontSize: "31px"
    fontWeight: 700
    lineHeight: 1.22
    letterSpacing: "-.015em"
  title:
    fontFamily: "'Rubik', sans-serif"
    fontSize: "17px"
    fontWeight: 500
    lineHeight: 1.35
  body:
    fontFamily: "'Rubik', sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "'Fredoka', 'Rubik', sans-serif"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1.6
  meta:
    fontFamily: "'IBM Plex Mono', monospace"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.6
  lcd:
    fontFamily: "'DotGothic16', monospace"
    fontSize: "9px"
    fontWeight: 400
    lineHeight: 1.4
  wordmark:
    fontFamily: "'DM Sans', sans-serif"
    fontSize: "30px"
    fontWeight: 700
    lineHeight: 1
rounded:
  paper: "14px"
  stage: "18px"
  button: "8px"
  choice: "9px"
  field: "7px"
  badge: "4px"
  note: "3px 3px 8px 8px"
  note-edge: "0 0 6px 6px"
spacing:
  compact: "8px"
  inline: "12px"
  group: "18px"
  reading: "24px"
  section: "40px"
components:
  button-primary:
    backgroundColor: "{colors.green}"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    rounded: "{rounded.button}"
    padding: "15px 23px"
  button-primary-hover:
    backgroundColor: "{colors.green-hover}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.button}"
    padding: "15px 23px"
  button-outline-hover:
    backgroundColor: "{colors.sage}"
  button-text:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    padding: "4px 0"
  choice-disagree:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.choice}"
    padding: "15px 18px"
  choice-agree:
    backgroundColor: "{colors.green}"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    rounded: "{rounded.choice}"
    padding: "15px 18px"
  choice-important:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.choice}"
    padding: "15px 18px"
  choice-skip:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.choice}"
    padding: "15px 18px"
  proposal-card:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.paper}"
    padding: "33px 38px 25px"
  search-field:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "11px 15px"
  answer-badge:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.badge}"
    padding: "3px 8px"
  navigation:
    textColor: "{colors.ink}"
  voting-machine:
    backgroundColor: "#e4e2d9"
    textColor: "#262e26"
    rounded: "16px 16px 22px 22px"
    padding: "17px 19px 13px"
    width: "680px"
---

# Design System: voteAI

## Overview

**Creative North Star: "Caderno de decisão"**

O voteAI transforma a comparação de propostas em uma leitura tranquila e pessoal. Papel claro, tinta verde profunda e títulos editoriais dão à interface a presença de um caderno aberto; controles claros mantêm o ritmo de uma proposta por vez. A expressão visual sustenta a escolha confirmada pelo usuário: identidade própria, leitura confortável e construção diretamente no código.

Fredoka, arredondada e amigável, dá voz aos títulos e aos botões; Rubik em negrito carrega as ideias e o texto corrido; IBM Plex Mono marca etiquetas e contadores; DotGothic16 dá ao visor da urna a cara de tela eletrônica. A profundidade é discreta nas superfícies de leitura e física na urna brasileira da revelação. Retratos recebem o mesmo recorte e tratamento em escala de cinza. A autoria oculta durante as respostas e a igualdade de exposição dos candidatos são compromissos do produto que também orientam a hierarquia visual.

**Key Characteristics:**

- Papel claro com camadas suaves de sálvia.
- Verde profundo para tinta, ações e progresso.
- Tipografia editorial para ideias; sans serif para operação.
- Cartas de altura estável com rolagem interna para leitura de propostas longas.
- No celular, a votação inteira cabe em uma tela, sem rolagem da página.
- Urna física com LCD e teclado como assinatura da revelação: ela digita o número dígito a dígito antes de confirmar.
- Símbolo "Urna": a fenda de uma urna sobre o sinal de confirmação.
- Movimento curto, direcional e dispensável com preferência por movimento reduzido.

## Colors

A paleta usa verdes naturais sobre papel morno, com contraste firme e um acento claro para prioridade. Os valores normativos estão no frontmatter e correspondem ao CSS entregue.

### Primary

- **Verde profundo** (`green`): ações principais, concordância, progresso e a série verde dos resultados; o estado mais escuro é `green-hover`.
- **Lima de prioridade** (`lime`): resposta Importante e seleção de texto; `lime-hover` reforça o estado interativo.
- **Verde de foco** (`focus`): contorno de teclado e foco do campo de busca. Comunica posição de interação sem depender de movimento.

### Secondary

- **Cores partidárias**: Lula usa `pt-red`; Flávio usa `pl-blue`, com acentos `pl-green` e `pl-yellow`. Essa identificação aparece somente depois da etapa cega ou em fontes, sempre junto de nomes. O antigo token argila não identifica mais um candidato.

### Neutral

- **Papel** (`paper`): fundo contínuo da página.
- **Folha marfim** (`white`): cartas e controles claros.
- **Tinta verde** (`ink`): texto principal e ícones herdados.
- **Tinta suave** (`muted`): contexto, instruções, fontes e metadados.
- **Sálvia** (`sage`): suporte da carta de demonstração e hover do botão secundário.
- **Linha de papel** (`line`): divisores e bordas que organizam leitura e listas.
- **Folha em hover** (`choice-hover`): resposta clara sob o ponteiro.

**The Prioridade Rule.** Use o acento lima para importância e seleção; mantenha o verde profundo como referência de ação e progresso.

## Typography

**Display Font:** Fredoka (700), com fallback Rubik e sans-serif. Títulos principais, botões e teclas da urna.
**Body Font:** Rubik (300 a 900), com fallback system-ui. Texto corrido, subtítulos (700) e o texto da proposta (700).
**Meta Font:** IBM Plex Mono (500). Tema e autoria da carta, contador de propostas, etiquetas, legendas da urna e números das tabelas.
**LCD Font:** DotGothic16 (400). Tudo o que aparece no visor da urna: rótulos, dígitos, candidato e FIM.
**Wordmark:** DM Sans, só no nome "voteAI" ao lado do símbolo, para casar com o logo de `brand/logos/`.

**Character:** Os títulos são arredondados, cheios e diretos; a ênfase vem da cor (lima no verde, verde no papel), nunca do itálico, porque a Fredoka não tem itálico. Texto de apoio e controles mantêm formas simples e leitura direta. As fontes são arquivos WOFF2 locais em `dist/assets/fonts/`, nos recortes latino e latino estendido, com `font-display: swap`; Rubik é pré-carregada.

### Hierarchy

- **Display:** título principal fluido, com peso (600), entrelinha (1.04) e espaçamento negativo. No celular, a landing usa `clamp(37px,10.6vw,46px)` e entrelinha (1.06), para que título, botão e carta de demonstração caibam na primeira tela.
- **Headline:** cabeçalhos de seção em Rubik (700); a base documentada é a seção explicativa. Outras hierarquias reais usam (31px), (32px), (36px), (42px), (49px) ou (62px) conforme função.
- **Proposal:** ideia durante o teste, (31px) no desktop; no celular acompanha a altura da tela com `clamp(23px,3.9dvh,32px)` e entrelinha (1.24). A carta de demonstração tem tamanho próprio de (29px), reduzido a (21px) na landing do celular.
- **Title:** títulos operacionais dos passos em Rubik, sem competir com a proposta.
- **Body:** texto global; contextos locais variam entre (12px) e (17px). Descrições usam `muted`, entrelinhas generosas e medidas observadas de (30ch), (40ch), (50ch), (70ch) ou (75ch) conforme o bloco.
- **Label:** botões e respostas em Fredoka (600). Metadados usam IBM Plex Mono em tamanhos menores; percentuais grandes usam Fredoka e contadores usam numerais tabulares. As teclas da urna usam Fredoka (700); o visor usa DotGothic16, com rótulos de (9px), ou (10px) na urna do celular.

**The Ideia em Destaque Rule.** Dê à proposta a maior presença tipográfica da carta; mantenha tema, anonimato, contexto e rodapé subordinados.

## Layout

A página é fluida, com largura máxima (1184px) e margem total inicial de (96px). Abaixo de (1100px), a margem total passa a (64px); abaixo de (650px), a (40px); abaixo de (360px), a (32px). Cabeçalho, conteúdo e rodapé compartilham o alinhamento central.

A apresentação inicial usa duas colunas assimétricas (`1.05fr 1fr`) sobre verde profundo, espaço de (80px) entre elas e carta dominante. O título marfim usa lime elétrico na segunda ideia; o CTA usa lime elétrico e tinta verde. No celular, abaixo de (650px), torna-se uma coluna compacta: título, uma frase de apoio, botão em largura total e a carta de demonstração com as quatro respostas cabem na primeira tela; o cabeçalho da carta, o contexto e o rodapé da demonstração ficam ocultos. Quando o botão principal sai de vista, um botão fixo "Começar meu teste" aparece na base da tela e some ao chegar à chamada final.

O teste concentra leitura em um contêiner de até (640px), com quatro respostas em grade de duas colunas e altura mínima de (59px). No desktop, a carta mantém altura de (360px); a região interna de texto rola, e as quatro respostas mantêm coordenadas estáveis entre perguntas.

No celular, a votação ocupa exatamente uma tela (`100dvh`), sem rolagem da página: cabeçalho de (52px) só com a marca e Salvar e sair, linha de progresso, carta flexível que ocupa o espaço restante e as quatro respostas em 2×2, com altura `clamp(48px,7.2dvh,58px)` e respiro inferior para a área segura. Etapas, título da página, textos de ajuda, rodapé da carta e rodapé do site ficam ocultos; o ×2 de Importante carrega a explicação. O texto longo continua rolando dentro da carta. A página da urna segue a mesma regra: o aparelho fica em coluna, com o visor em cima e o teclado embaixo (números à esquerda, BRANCO, CORRIGE e CONFIRMA empilhados à direita); em telas com menos de (700px) de altura, o título e o visor diminuem.

O resultado usa duas colunas, aparelho e resumo; abaixo de (850px), empilha com o resumo primeiro. A tabela de temas passa de duas colunas para uma abaixo de (650px). Fontes e revisão usam linhas expansíveis com tema, proposta e controles; no celular, o tema sobe para sua própria linha. As colunas do método tornam-se uma abaixo de (850px).

Os intervalos recorrentes no frontmatter registram medidas usadas, sem presumir uma grade universal rígida. Preserve as regras específicas de composição e permita que filhos de grid encolham (`min-width: 0`), especialmente no resultado.

## Elevation & Depth

A leitura usa contraste tonal, bordas e camadas de papel. A demonstração inclina a folha frontal (-2.5deg) e a folha traseira (3deg); o teste apresenta a proposta como a nota de cima de um bloco de post-its, quase reta, com as notas restantes por trás. A urna é a exceção material: sombras externas e internas dão corpo à carcaça, reentrância ao LCD e pressão às teclas. Os valores completos de sombra estão em `dist/styles.css`.

### Shadow Vocabulary

- **Papel de demonstração:** sombra difusa, leve e curta; comunica uma folha sobre a superfície sálvia.
- **Ação sob ponteiro:** sombra discreta do botão verde junto à elevação de (-2px).
- **Carcaça da urna:** sombra de apoio e brilho interno da borda superior.
- **Reentrâncias e teclas:** sombras internas do bezel e teclado; sombras curtas sob botões físicos.
- **Mensagem transitória:** sombra maior para destacar feedback fixo acima da página.

**The Profundidade de Papel Rule.** O bloco de post-its é a única pilha física da etapa de respostas: sombra longa e suave sob a nota de cima e notas de trás em tons mais escuros de `note`. Fora dele, mantenha a leitura apoiada em tons e linhas; reserve a profundidade física mais forte para o aparelho e feedback transitório.

## Shapes

As superfícies têm curvas suaves e distintas: carta, palco, botão, resposta, campo e badge seguem os raios normativos do frontmatter. O símbolo da marca, "Urna", é desenhado numa grade de (64px): quadrado verde de raio (15px), a fenda lima de (30×5.5px) no topo e o sinal de confirmação lima com traço de (7px). Ele aparece com (35px) no cabeçalho, (30px) no celular, (27px) no teste e na urna do celular e (26px) no rodapé, sempre ao lado do nome em DM Sans ("vote" em negrito, "AI" regular). O favicon é o mesmo SVG; o ícone de toque (`apple-touch-icon.png`, 180px) usa fundo verde sem cantos. As versões horizontal, vertical, só ícone e monocromáticas, com o guia de uso, estão em `brand/logos/`. Etapas e indicadores usam círculos pequenos.

A urna tem silhueta própria, com cantos inferiores maiores, visor retangular emoldurado, teclado escuro e teclas curtas. Não normalize o aparelho para o raio dos cartões. As barras de resultado são finas e os divisores têm espessura de (1px).

## Components

### Buttons

Confiantes, simples e legíveis. O primário combina verde profundo e folha marfim; o secundário usa fundo transparente, borda suave e hover sálvia. Ambos têm altura mínima de (54px), espaçamento entre conteúdo de (20px), deslocamento em hover de (-2px) e retorno em active. A variante textual tem tamanho (13px), padding reduzido e sublinhado em hover. Botões desabilitados usam opacidade (.4) e cursor neutro.

O foco global tem contorno de (3px) e deslocamento de (5px), na cor `focus`. Não suprima esse indicador em controles interativos.

### Chips

Badges são informativos. A resposta registrada tem borda suave, raio de badge e texto pequeno; a conclusão usa preenchimento verde claro. Tema e autoria são rótulos com ícones, sem aparência de botão ou interação inventada.

### Cards / Containers

**Bloco de post-its.** A proposta é a nota de cima de um bloco adesivo. A nota é branca (`note`), contornada só por um anel de (1px) a 8% de tinta dentro da sombra, sem borda, cantos `rounded.note` e uma inclinação leve que varia entre (-0.7deg) e (0.8deg) de uma nota para outra; fica colada no topo (`transform-origin` no alto) e a sombra mais longa embaixo dá a impressão da base solta. Uma só cor para todas as notas, para que nenhuma lembre um partido. Seu cabeçalho reúne tema e autoria oculta; a proposta ocupa o centro; o contexto usa tinta suave; o rodapé não tem divisor.

Atrás dela aparecem até três notas (`note-2`, `note-3`, `note-4`), deslocadas e giradas para os lados, e, sob o bloco, a espessura do bloco: uma linha fina por nota restante (0.75px cada, em `note-edge`). As notas de trás somem quando faltam três, duas e uma proposta, e a espessura afina a cada resposta. O bloco reserva (18px) abaixo da nota, ou (16px) no celular, para que os botões não mudem de lugar.

Ao responder, um selo com o nome da resposta bate no topo da nota, meio para fora da borda: CONCORDO em verde profundo com texto marfim, DISCORDO em marfim com borda e texto em tinta, IMPORTANTE ×2 em lima elétrico e NÃO SEI em sálvia, todos em Fredoka (700) maiúscula de (26px), ou (22px) no celular, com borda marfim de (3px), raio de (12px) e inclinação própria entre (-5deg) e (5deg). O selo entra em (.2s), descendo de escala 1.7 para 1. Ao mesmo tempo, a nota descola: a base se levanta em perspectiva até cerca de 42% da animação, com ângulo de 6 a 16 graus que diminui em notas mais altas para não cobrir os botões, e então a nota sai, ainda com o selo, na direção da resposta (concordância à direita, discordância à esquerda, importância para cima, dúvida para baixo). A saída leva (520ms), via Web Animations, e a transparência só começa depois do descolamento, para o selo ficar legível. A nota seguinte sobe da posição da primeira nota de trás para o topo em (.34s). Voltar traz a nota anterior de volta ao bloco, entrando pela esquerda em (.42s). No toque, a nota segue o dedo na horizontal, inclinando conforme o arraste; passado (40px), o botão correspondente se destaca e o selo da resposta aparece na nota, ficando opaco aos (80px); passado (80px), a resposta é registrada; antes disso, a nota volta ao lugar. O texto da proposta rola só na vertical (`touch-action: pan-y`) para não roubar o gesto. Com movimento reduzido, o selo aparece por (380ms) e a nota troca sem deslocamento. A carta de demonstração da landing usa a mesma cor e os mesmos cantos.

**Composição no celular.** O tema e a autoria ficam no topo, a proposta fica centralizada no espaço livre e o contexto fica ancorado na base, em (14px). O tamanho da proposta é ajustado a cada texto e a cada tela (`fitProposal` em `dist/app.js`), entre (22px) e (46px), para que proposta e contexto ocupem cerca de 80% da área de texto. A conta é refeita quando a nota muda de tamanho. Sem JavaScript, vale `clamp(23px,3.9dvh,32px)`. O desktop mantém (31px).

### Inputs / Fields

A busca tem borda fina, raio de campo, ícone de linha e fundo transparente. O foco fica no contêiner via `:focus-within`, com contorno de (3px) e deslocamento de (4px). O filtro usa select nativo com altura mínima de (45px), preservando o controle familiar do dispositivo. O catálogo informa a contagem e apresenta texto claro quando nenhum item corresponde. Não há estado de erro de formulário implementado para esses campos.

### Navigation

Navegação discreta em Rubik, tamanho (14px), peso (500), com sublinhado em hover. No teste, a ação é Salvar e sair. No celular, o link da explicação inicial some, os intervalos diminuem e a marca mantém presença; no teste e na urna, o rótulo Brasil 2026 também some. A indicação de etapas usa círculos numerados, confirmação e verde para progresso; não depende apenas da cor.

### Response Controls

Discordo é claro; Concordo é verde; Importante é lima e mostra ×2; Não sei mantém fundo transparente. Todos combinam ícone e texto, em grade estável. Hover sobe (-3px), active escala (.98), e o teclado aparece como apoio no desktop. Os símbolos são SVG inline com traço de (1.65), sem dependência de fonte de ícones.

### Brazilian Voting Machine

A assinatura da revelação é um corpo marfim com tela LCD verde clara e teclado carvão. A última resposta inicia automaticamente uma simulação de voto, sem clique adicional, como numa urna de verdade:

1. O visor mostra "SEU VOTO PARA Presidente" e dois campos de dígito vazios, com cursor piscando no primeiro.
2. Em (0.9s), a tecla do primeiro dígito afunda e o número entra no campo; em (1.8s), o segundo. Cada tecla toca um bipe curto, sintetizado e sujeito ao controle de som.
3. Em (2.5s), surgem o retrato em cinza, o nome e o partido do candidato com maior afinidade.
4. Em (3.7s), CONFIRMA afunda, toca o som real de confirmação e o visor mostra FIM.
5. Em (5.3s), a interface avança para o resultado.

Os campos de dígito medem (40×50px) no desktop e (36×46px) no celular; FIM usa (64px), ou (54px) no celular. A pessoa pode pular a animação a qualquer momento. Empate e ausência de dados não digitam número: mostram a apuração com barra de progresso em (2.4s) e estados textuais próprios, sem fabricar vencedor. Retratos aparecem só nesta etapa, em cinza, com dimensões e enquadramentos equivalentes.

Com `prefers-reduced-motion: reduce`, CSS reduz animações e transições a (.001ms), o cursor do visor para de piscar, a saída da carta permanece estável e JavaScript revela o resultado sem a simulação. O som real de confirmação inicia habilitado e é preparado na interação com o teste. A pessoa pode silenciá-lo. Bloqueio do navegador mantém o resultado e oferece reprodução por clique.

### Landing animada e vídeo

A primeira região combina verde profundo, headline editorial marfim e lime elétrico. A frase de apoio diz o que acontece em uma linha: 25 propostas reais, sem o nome de quem as fez, e no fim a afinidade com Lula ou Flávio Bolsonaro. A carta real mantém quatro ações funcionais; folhas e estrela têm deriva discreta coordenada. No celular, o botão fixo de começar entra deslizando de baixo, sobre fundo papel quase opaco. Os passos explicativos revelam por observação de interseção, com conteúdo disponível mesmo sem movimento. A chamada final usa a superfície lime.

O vídeo Hyperframes usa quadro 16:9 de 1280×720, duração de 18s, textos em português e nenhuma locução. Reproduz silenciosamente em loop com pausar, repetir e tela cheia. Movimento reduzido mostra poster estático e preserva controle de reproduzir. O texto fora do vídeo mantém o mecanismo acessível. Identidades partidárias só aparecem no beat de revelação.

## Do's and Don'ts

### Do:

- **Do** preserve papel claro, verde profundo e os papéis das fontes (Fredoka, Rubik, IBM Plex Mono e DotGothic16) em novas superfícies.
- **Do** escreva propostas e contextos em português do dia a dia: troque termos técnicos e jurídicos por palavras comuns e explique no contexto o nome que não puder sair.
- **Do** preserve a altura das cartas e permita rolagem interna do texto longo sem mover os botões.
- **Do** mantenha a votação e a urna do celular dentro de uma tela; se faltar espaço, retire informação do topo antes de deixar a página rolar.
- **Do** use o símbolo "Urna" a partir dos arquivos de `brand/logos/`, sem redesenhar.
- **Do** mantenha o foco visível, controles rotulados e respostas distinguíveis por texto e ícone.
- **Do** use a mesma estrutura e o mesmo tratamento de retrato para os candidatos.
- **Do** mantenha estados explícitos para espera, apuração, empate, ausência de dados e busca vazia.
- **Do** respeite movimento reduzido e ofereça o salto da revelação.

### Don't:

- **Don't** revele autoria, retrato ou fonte identificadora na etapa de respostas.
- **Don't** transforme o acento de prioridade em decoração generalizada.
- **Don't** aplique a profundidade da urna a todos os cartões e seções.
- **Don't** corte textos longos, mude a posição dos botões entre perguntas ou permita que a urna alargue a página de resultado.
- **Don't** use imagem ou tipografia que dê exposição desigual aos candidatos.
- **Don't** invente escalas, estados de formulário ou componentes ausentes do código entregue.

Refinamento da landing: título em etapas com sublinhado desenhado; cards flutuantes. Vídeo sem rodapé, loop silencioso apenas quando 45% visível, pausa fora de tela/aba oculta. Controle discreto sobre o vídeo; movimento reduzido preserva poster e reprodução manual.
