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

### Refinamento da landing solicitado na continuação
Título entra em etapas, com sublinhado desenhado; conjunto de cards flutua suavemente. O vídeo aprovado mantém loop silencioso, sem rodapé de controles: inicia quando pelo menos 45% fica visível, pausa ao sair ou ocultar a aba, retoma ao voltar. Uma ação discreta sobre o vídeo permite pausa pelo teclado e reprodução manual quando movimento reduzido estiver ativo. Movimento reduzido desativa as animações decorativas. Este refinamento substitui os controles de repetir/tela cheia da RN-12.
