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
typography:
  display:
    fontFamily: "'Fraunces', serif"
    fontSize: "clamp(50px,5.4vw,78px)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-.035em"
  headline:
    fontFamily: "'Fraunces', serif"
    fontSize: "43px"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-.035em"
  proposal:
    fontFamily: "'Fraunces', serif"
    fontSize: "31px"
    fontWeight: 600
    lineHeight: 1.22
    letterSpacing: "-.035em"
  title:
    fontFamily: "'DM Sans', sans-serif"
    fontSize: "17px"
    fontWeight: 500
    lineHeight: 1.35
  body:
    fontFamily: "'DM Sans', sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "'DM Sans', sans-serif"
    fontSize: "15px"
    fontWeight: 500
    lineHeight: 1.6
rounded:
  paper: "14px"
  stage: "18px"
  button: "8px"
  choice: "9px"
  field: "7px"
  badge: "4px"
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

Fraunces traz voz às ideias; DM Sans torna ações, contexto e números fáceis de reconhecer. A profundidade é discreta nas superfícies de leitura e física na urna brasileira da revelação. Retratos recebem o mesmo recorte e tratamento em escala de cinza. A autoria oculta durante as respostas e a igualdade de exposição dos candidatos são compromissos do produto que também orientam a hierarquia visual.

**Key Characteristics:**

- Papel claro com camadas suaves de sálvia.
- Verde profundo para tinta, ações e progresso.
- Tipografia editorial para ideias; sans serif para operação.
- Cartas de altura estável com rolagem interna para leitura de propostas longas.
- Urna física com LCD e teclado como assinatura da revelação.
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

**Display Font:** Fraunces, com fallback serif.
**Body Font:** DM Sans, com fallback sans-serif.

**Character:** Os títulos têm curvas editoriais e itálico expressivo. Texto de apoio e controles mantêm formas simples, peso contido e leitura direta. As fontes são arquivos locais, com `font-display: swap`.

### Hierarchy

- **Display:** título principal fluido, com peso (600), entrelinha (1.08) e espaçamento negativo. No celular, usa `clamp(48px,11.5vw,68px)`; abaixo de (360px), o tamanho é (46px).
- **Headline:** cabeçalhos de seção em Fraunces; a base documentada é a seção explicativa. Outras hierarquias reais usam (31px), (32px), (36px), (42px), (49px) ou (62px) conforme função.
- **Proposal:** ideia durante o teste; no celular passa a (28px), entrelinha (1.24), e abaixo de (360px) a (25px). A carta de demonstração tem tamanho próprio de (29px).
- **Title:** títulos operacionais dos passos em DM Sans, sem competir com a proposta.
- **Body:** texto global; contextos locais variam entre (12px) e (17px). Descrições usam `muted`, entrelinhas generosas e medidas observadas de (30ch), (40ch), (50ch), (70ch) ou (75ch) conforme o bloco.
- **Label:** referência de botões e respostas; metadados usam tamanhos menores. Percentuais e progresso usam numerais tabulares. O LCD e o teclado permanecem em DM Sans, com tamanhos proporcionais ao aparelho.

**The Ideia em Destaque Rule.** Dê à proposta a maior presença tipográfica da carta; mantenha tema, anonimato, contexto e rodapé subordinados.

## Layout

A página é fluida, com largura máxima (1184px) e margem total inicial de (96px). Abaixo de (1100px), a margem total passa a (64px); abaixo de (650px), a (40px); abaixo de (360px), a (32px). Cabeçalho, conteúdo e rodapé compartilham o alinhamento central.

A apresentação inicial usa duas colunas assimétricas (`1.05fr 1fr`) sobre verde profundo, espaço de (80px) entre elas e carta dominante. O título marfim usa lime elétrico na segunda ideia; o CTA usa lime elétrico e tinta verde. No celular, abaixo de (650px), torna-se uma coluna. O teste concentra leitura em um contêiner de até (640px), com quatro respostas em grade de duas colunas e altura mínima de (59px), reduzida a (55px) no celular. A carta mantém altura de 360px no desktop e 350px abaixo de 650px. Cabeçalho e rodapé permanecem fixos; a região interna de texto rola. Assim as quatro respostas mantêm coordenadas estáveis entre perguntas.

O resultado usa duas colunas, aparelho e resumo; abaixo de (850px), empilha com o resumo primeiro. A tabela de temas passa de duas colunas para uma abaixo de (650px). Fontes e revisão usam linhas expansíveis com tema, proposta e controles; no celular, o tema sobe para sua própria linha. As colunas do método tornam-se uma abaixo de (850px).

Os intervalos recorrentes no frontmatter registram medidas usadas, sem presumir uma grade universal rígida. Preserve as regras específicas de composição e permita que filhos de grid encolham (`min-width: 0`), especialmente no resultado.

## Elevation & Depth

A leitura usa contraste tonal, bordas e camadas de papel. A demonstração inclina a folha frontal (-2.5deg) e a folha traseira (3deg); o teste apresenta a carta reta e delimitada. A urna é a exceção material: sombras externas e internas dão corpo à carcaça, reentrância ao LCD e pressão às teclas. Os valores completos de sombra estão no sidecar.

### Shadow Vocabulary

- **Papel de demonstração:** sombra difusa, leve e curta; comunica uma folha sobre a superfície sálvia.
- **Ação sob ponteiro:** sombra discreta do botão verde junto à elevação de (-2px).
- **Carcaça da urna:** sombra de apoio e brilho interno da borda superior.
- **Reentrâncias e teclas:** sombras internas do bezel e teclado; sombras curtas sob botões físicos.
- **Mensagem transitória:** sombra maior para destacar feedback fixo acima da página.

**The Profundidade de Papel Rule.** Mantenha a leitura apoiada em tons e linhas; reserve a profundidade física mais forte para o aparelho e feedback transitório.

## Shapes

As superfícies têm curvas suaves e distintas: carta, palco, botão, resposta, campo e badge seguem os raios normativos do frontmatter. O símbolo da marca é um quadrado verde com confirmação; seu raio é (10px), reduzido a (8px) no celular. Etapas e indicadores usam círculos pequenos.

A urna tem silhueta própria, com cantos inferiores maiores, visor retangular emoldurado, teclado escuro e teclas curtas. Não normalize o aparelho para o raio dos cartões. As barras de resultado são finas e os divisores têm espessura de (1px).

## Components

### Buttons

Confiantes, simples e legíveis. O primário combina verde profundo e folha marfim; o secundário usa fundo transparente, borda suave e hover sálvia. Ambos têm altura mínima de (54px), espaçamento entre conteúdo de (20px), deslocamento em hover de (-2px) e retorno em active. A variante textual tem tamanho (13px), padding reduzido e sublinhado em hover. Botões desabilitados usam opacidade (.4) e cursor neutro.

O foco global tem contorno de (3px) e deslocamento de (5px), na cor `focus`. Não suprima esse indicador em controles interativos.

### Chips

Badges são informativos. A resposta registrada tem borda suave, raio de badge e texto pequeno; a conclusão usa preenchimento verde claro. Tema e autoria são rótulos com ícones, sem aparência de botão ou interação inventada.

### Cards / Containers

A carta de proposta usa folha marfim, borda de linha e o padding normativo. Seu cabeçalho reúne tema e autoria oculta; a proposta ocupa o centro; o contexto usa tinta suave; um divisor organiza o rodapé. No celular, o padding do teste passa a (24px 24px 20px). A entrada sobe (12px) em (.35s); cada resposta sai numa direção: concordância à direita, discordância à esquerda, importância para cima, dúvida para baixo.

### Inputs / Fields

A busca tem borda fina, raio de campo, ícone de linha e fundo transparente. O foco fica no contêiner via `:focus-within`, com contorno de (3px) e deslocamento de (4px). O filtro usa select nativo com altura mínima de (45px), preservando o controle familiar do dispositivo. O catálogo informa a contagem e apresenta texto claro quando nenhum item corresponde. Não há estado de erro de formulário implementado para esses campos.

### Navigation

Navegação discreta em DM Sans, tamanho (14px), peso (500), com sublinhado em hover. No teste, a ação é Salvar e sair. No celular, o link da explicação inicial some, os intervalos diminuem e a marca mantém presença. A indicação de etapas usa círculos numerados, confirmação e verde para progresso; não depende apenas da cor.

### Response Controls

Discordo é claro; Concordo é verde; Importante é lima e mostra ×2; Não sei mantém fundo transparente. Todos combinam ícone e texto, em grade estável. Hover sobe (-3px), active escala (.98), e o teclado aparece como apoio no desktop. Os símbolos são SVG inline com traço de (1.65), sem dependência de fonte de ícones.

### Brazilian Voting Machine

A assinatura da revelação é um corpo marfim com tela LCD verde clara e teclado carvão. O visor mostra espera explícita, apuração e resultado. A última resposta inicia automaticamente a apuração; CONFIRMA acende sem exigir um clique adicional. A barra progride em (2.3s) e a interface conclui em (2.4s). A pessoa pode pular a animação. Empate e ausência de dados usam estados textuais próprios, sem fabricar vencedor. Retratos aparecem após a revelação, em cinza, com dimensões e enquadramentos equivalentes.

Com `prefers-reduced-motion: reduce`, CSS reduz animações e transições a (.001ms), a saída da carta permanece estável e JavaScript avança/revela sem espera. O som real de confirmação inicia habilitado e é preparado na interação com o teste. A pessoa pode silenciá-lo. Bloqueio do navegador mantém o resultado e oferece reprodução por clique.

### Landing animada e vídeo

A primeira região combina verde profundo, headline editorial marfim e lime elétrico. A carta real mantém quatro ações funcionais; folhas e estrela têm deriva discreta coordenada. Os passos explicativos revelam por observação de interseção, com conteúdo disponível mesmo sem movimento. A chamada final usa a superfície lime.

O vídeo Hyperframes usa quadro 16:9 de 1280×720, duração de 18s, textos em português e nenhuma locução. Reproduz silenciosamente em loop com pausar, repetir e tela cheia. Movimento reduzido mostra poster estático e preserva controle de reproduzir. O texto fora do vídeo mantém o mecanismo acessível. Identidades partidárias só aparecem no beat de revelação.

## Do's and Don'ts

### Do:

- **Do** preserve papel claro, verde profundo e a relação Fraunces/DM Sans em novas superfícies.
- **Do** preserve a altura das cartas e permita rolagem interna do texto longo sem mover os botões.
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
