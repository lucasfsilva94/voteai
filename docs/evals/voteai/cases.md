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
15 testes de unidade aprovados; engine com 100% das linhas/funções e 96,25% das ramificações cobertas. Audio/media com testes de gravação real, cache, falha de decode, autoplay bloqueado e binding de fetch no navegador. Seleção verificada em 250 sementes.

Chrome/Playwright: fluxo completo desktop 1440px e mobile 390px, retomada e correção, fontes e busca, exclusão local, todas as respostas Não sei e armazenamento bloqueado. Rolagem vertical não responde à proposta e busca mantém foco visível.

Animação sem movimento reduzido: última resposta inicia apuração automaticamente, som ativado por padrão, buffer do MP3 verdadeiro decodificado e reproduzido uma vez, preferência de silêncio e pular animação. Autoplay bloqueado exibe opção de repetição sem impedir o resultado. Falha de compartilhamento/cópia exibe resumo selecionável, sem respostas individuais.

Layout: todas as 50 propostas verificadas em 1440px, 390px e 320px, sem mudança nas coordenadas dos quatro botões. Nenhum texto precisa de rolagem no desktop; 8 propostas rolam internamente em 390px e 13 em 320px. Foco na região de texto permite ler com setas sem registrar voto.

Histórico da versão inicial: revisão visual externa resolveu os achados de rolagem e foco; veredito `ship` para esses dois achados.

Refinamento da landing: título em etapas com sublinhado desenhado; cards flutuantes. Vídeo sem rodapé, loop silencioso apenas quando 45% visível, pausa fora de tela/aba oculta. Controle discreto sobre o vídeo; movimento reduzido preserva poster e reprodução manual.
