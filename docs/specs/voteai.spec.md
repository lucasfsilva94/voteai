# Especificação Técnica: voteAI

**Código:** `dist/`, `scripts/`, `tests/` · **Base:** `/` · **Depende de:** catálogo estático em `dist/catalog.js`

## 1. Visão Geral
Site independente que compara respostas a propostas de Lula e Flávio Bolsonaro, com base nos planos de governo publicados. Fluxo: início → 25 propostas ocultas → apuração animada na urna brasileira → resultado → revisão com fontes.

## 2. Entradas e Saídas (Contratos / APIs)
Proposta: `{"id":"eco-01","area":"economia","texto":"…","contexto":"…","posicoes":{"A":"sem-posicao","B":"concorda"},"fontes":[{"candidato":"B","url":"https://static.poder360.com.br/uploads/2026/08/Programa-Governo-LULA-2026.pdf","pagina":75,"documento":"…"}]}`.

Sessão: `{"version":1,"order":["eco-01"],"answers":{"eco-01":"agree"},"index":1,"revealed":false}`. Respostas: `agree`, `disagree`, `important`, `skip`. Resultado: `{"scores":{"A":0,"B":1},"weight":1,"percentages":{"A":0,"B":100},"winner":"B","status":"winner"}`. `winner` pode ser `null`; `status`: `winner`, `tie`, `empty`.

## 3. Lógica do Fluxo / Regras de Negócio
- RN-01: sortear 25 propostas do catálogo de 50; equilibrar autoria exclusiva de A e B, incluir sete áreas e embaralhar a ordem. Não mostrar candidato, partido, documento ou páginas durante o questionário.
- RN-02: Concordo vale 1; Importante significa Concordo com peso 2. Discordo vale 1 para o candidato do lado oposto à proposta, conforme a lógica comparativa do teste. Isso é regra do teste, não uma declaração de oposição de quem não possui posição documentada.
- RN-03: quando ambos apoiam, concordância pontua para ambos e discordância para nenhum. Não sei tem peso zero e avança; no voteAI não acrescenta perguntas extras.
- RN-04: percentual = pontos / soma dos pesos válidos × 100. Percentuais são independentes e não precisam somar 100%. Não inferir vencedor em empate; todas as respostas Não sei geram resultado insuficiente.
- RN-05: permitir voltar e corrigir; persistir a sessão localmente com versão e validação; permitir retomar ou reiniciar.
- RN-06: ao registrar a última resposta, iniciar automaticamente a apuração da urna, sem uma segunda confirmação. Som habilitado por padrão, usando o MP3 de confirmação indicado pelo usuário. Preparar/desbloquear o áudio na interação com o teste; caso o navegador bloqueie o som, mostrar opção de ouvi-lo novamente sem bloquear o resultado. Respeitar movimento reduzido e oferecer pular animação.
- RN-07: mostrar os dois percentuais, detalhamento por tema, revisão das respostas e links dos documentos com páginas. Separar posição documentada de inferência da pontuação.
- RN-08: sem cadastro, analytics ou envio das respostas. Compartilhar somente resumo quando o usuário aciona Compartilhar. Não usar API de IA: o nome é marca; cálculo determinístico.
- RN-09: responsivo, navegação por teclado, foco visível, contraste legível e anúncio de mudanças. Arraste horizontal permite concordar/discordar; gesto vertical preserva a rolagem e nunca registra uma resposta.
- RN-10: reservar altura constante para a carta no mesmo viewport e manter os quatro botões nas mesmas coordenadas entre perguntas. Texto longo rola dentro da carta, sem cortar conteúdo; foco no texto suspende atalhos de voto para permitir leitura.
- RN-11: identidade de candidatos apenas fora da etapa cega: Lula/PT vermelho #E4142C (CSS institucional atual); Flávio/PL azul #004F9F, verde #009640 e amarelo #FFD500 (manual oficial, p. 8). Manter tratamento e exposição equivalentes; números continuam acompanhados de nomes, sem depender apenas de cor.
- RN-12: a landing deixa claro, na primeira tela, que o teste é para o 2º turno da eleição para presidente, em 25 de outubro de 2026, entre Lula e Flávio Bolsonaro; mostra contagem regressiva para a data (antes, no dia e depois), os dois candidatos com tratamento igual e em ordem alfabética, perguntas frequentes e sinais de confiança verdadeiros (sem prova social inventada). Vídeo feito em Remotion, cerca de 20 segundos, português, sem locução, reprodução silenciosa e controles de pausar/repetir; movimento reduzido exibe imagem estática e opção de reproduzir. Exemplos e demonstrações usam propostas apoiadas pelos dois candidatos. Texto real continua disponível fora do vídeo.
- RN-13: remover todas as menções textuais à referência concorrente da interface, metadados e vídeo; preservar links diretos aos documentos de propostas e créditos dos retratos e áudio. Proveniência histórica pode permanecer em documentação interna de pesquisa.

## 4. Tratamento de Erros e Exceções
| Situação | Resposta |
|---|---|
| Armazenamento indisponível | Continuar em memória com aviso discreto |
| Sessão inválida ou catálogo alterado | Descartar dados incompatíveis e oferecer novo teste |
| Todas as respostas Não sei | Explicar que não há respostas para calcular afinidade |
| Empate | Mostrar ambos, sem desempate artificial |
| Compartilhamento/cópia indisponível | Exibir resumo selecionável |
| Áudio indisponível | Continuar revelação visual |
| Autoplay de áudio bloqueado | Resultado continua; oferecer ouvir confirmação por clique |
| Vídeo não carregado | Exibir poster, manter texto explicativo e botão iniciar |
| Fontes externas indisponíveis | Preservar referência com link e página; não bloquear o teste |

## 5. Decisões de entrega
Identidade própria inspirada no processo de votação brasileiro, visual sóbrio e contemporâneo. Sem ADR: arquitetura estática facilmente reversível. Não inclui pesquisa eleitoral, estatísticas de usuários ou confirmação oficial do cenário eleitoral da referência.

## 6. Revisão de 14/10/2026
Requisitos RN-06 e RN-10 a RN-13 solicitados diretamente pelo usuário. Formato de vídeo sem locução confirmado. Atualizar documentação e testes antes da publicação. Nenhuma mudança na pontuação.

### Landing
A landing do 2º turno (RN-12) substituiu o refinamento anterior de título em etapas e cards flutuantes.

## 7. Requisitos e critérios de aceite
RF-01: questionário cego com quatro respostas. RF-02: propostas dos mesmos dois candidatos e fontes nos planos de governo. RF-03: revelação animada na urna brasileira. RF-04: revisão e transparência do cálculo. RF-05: retomar localmente e reiniciar. RF-06: após a última resposta, a urna apura automaticamente com o áudio real de confirmação. RF-07: cores partidárias nos resultados. RF-08: cartas estáveis e vídeo explicativo em Remotion na landing. RF-09: interface exclusivamente com a marca voteAI.

- CA-01: dado um teste completo, quando a urna confirma a apuração, então mostra os dois percentuais e o vencedor ou empate.
- CA-02: dadas somente respostas Não sei, quando concluir, então informa ausência de evidência em vez de escolher candidato.
- CA-03: dada uma sessão parcialmente respondida, quando recarregar, então oferece retomada no mesmo ponto.
- CA-04: dadas perguntas curtas e longas, quando alternar entre elas no mesmo viewport, então os botões mantêm posição e o conteúdo permanece legível.
- CA-05: dada a 25ª resposta, quando registrar, então a urna digita o número, confirma e revela sem clique adicional, com som habilitado salvo preferência de silêncio.
- CA-06: dado movimento reduzido, quando abrir a landing, então o vídeo permanece pausado com a capa e o controle de reproduzir.

RNF-01: sem envio das respostas. RNF-02: funciona com armazenamento bloqueado. RNF-03: mobile e desktop com teclado e movimento reduzido.
