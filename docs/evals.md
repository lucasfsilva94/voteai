# Casos de avaliação

- RN-01: 25 IDs únicos, todos os sete temas, equilíbrio de autoria exclusiva em várias sementes.
- RN-02/RN-03: concordância, discordância, importância ×2 e posições compartilhadas.
- RN-04: percentuais independentes, empate explícito e zero respostas válidas.
- RN-05: corrigir resposta recalcula; sessão corrompida ou de versão inválida é rejeitada.
- RN-06/RN-09: conclusão no navegador, movimento reduzido, urna responsiva e navegação por teclado.
- RN-08: compartilhamento sem respostas individuais; cálculo offline.
- Degradação: armazenamento inacessível, áudio indisponível e falha de compartilhamento não bloqueiam resultado.
- RN-06: última resposta inicia apuração automaticamente e tenta reproduzir MP3 verdadeiro; falha de áudio oferece repetir.
- RN-10: comparar coordenadas dos quatro botões em todas as 50 propostas, nos viewports desktop/mobile; nenhuma pergunta pode mover os botões. Texto interno longo pode rolar.
- RN-11: cores computadas de candidatos e legenda correspondem a PT/PL, com nomes presentes.
- RN-12: vídeo existe, controles funcionam e movimento reduzido interrompe autoplay.
- RN-13: nenhum nome/domínio da referência concorrente em texto da interface e metadados.

## Validação executada

Última verificação: 14/10/2026, no Chrome instalado (via Playwright), sobre o site servido localmente e conferido também no GitHub Pages.

- **Regras:** 15 testes de unidade aprovados (`npm test`). Na versão inicial, o engine teve 100% das linhas e funções e 96,25% das ramificações cobertas, e a seleção foi verificada em 250 sementes.
- **Votação no celular:** em 375×667, 390×844 e 430×932, a página não rola; nenhuma das 50 propostas transborda a nota; a letra da proposta se ajusta entre 22 e 45 px, e o texto ocupa em mediana 61% a 78% da nota. Os quatro botões não mudam de posição entre perguntas, no desktop e no celular.
- **Bloco de post-its:** os quatro selos de resposta aparecem legíveis durante a saída da nota; o arraste no toque segue o dedo, destaca o botão e só responde depois de 80 px; com movimento reduzido, a nota troca sem deslocamento.
- **Urna:** em 320×568, 360×640, 375×667, 390×844 e no desktop, o retrato do candidato aparece inteiro e os botões Pular animação e Som ficam na tela; a simulação digita os dois dígitos, mostra o candidato, confirma e leva ao resultado.
- **Landing:** em 1440×900 e 390×844, sem erros no console e sem rolagem horizontal; o botão principal e a demonstração cabem na primeira tela; a demonstração troca de nota sozinha e para com movimento reduzido; o vídeo carrega (19,7 s) e fica pausado com movimento reduzido; as perguntas frequentes abrem; responder na demonstração começa o teste pela proposta exibida.

Os testes de navegador do repositório (`npm run test:browser`, `test:layout`, `test:animation`, `test:video`) precisam de `npm install` e não foram executados nesta rodada; as verificações acima foram feitas com scripts avulsos.
