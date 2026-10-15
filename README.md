# voteAI

Compare propostas de Lula e Flávio Bolsonaro sem ver a autoria e revele sua afinidade numa urna brasileira animada.

Site publicado: https://lucasfsilva94.github.io/voteai/

## Funcionalidades
25 propostas por teste, quatro respostas, votação que cabe numa tela de celular sem rolagem, importância com peso dobrado, urna que digita o número do candidato dígito a dígito antes de confirmar com o som verdadeiro, paletas PT/PL no resultado, revisão com fontes, retomada local e compartilhamento de resumo. Landing animada com vídeo explicativo Hyperframes sem locução.

Documentação: [spec](docs/specs/voteai.spec.md), [produto](PRODUCT.md), [design](DESIGN.md), [arquitetura](docs/ARCHITECTURE.md), [avaliações](docs/evals/voteai/cases.md).

## Executar
```sh
npm install
npm run dev
```
Abra http://127.0.0.1:5173/. A pasta `dist/` já contém o site completo e pode ser servida por qualquer hospedagem estática; não exige build ou backend.

## Publicação
O workflow [`.github/workflows/pages.yml`](.github/workflows/pages.yml) roda os testes e publica `dist/` no GitHub Pages a cada push na `main`. Também pode ser disparado manualmente na aba Actions.

## Verificação
`npm test`: cálculo, seleção equilibrada, empates, respostas insuficientes e armazenamento bloqueado.

`npm run test:browser`: fluxo completo com Chrome instalado, desktop/mobile, retomada, correção, fontes, busca, exclusão e degradação de armazenamento. O caminho do Chrome está no script e pode ser adaptado ao sistema.

`node tests/animation.browser.mjs`: animação real, som opcional, pular apuração e revelação temporizada. Execute com o servidor local ativo.

`npm run test:layout`: estabilidade dos controles nas 50 propostas em desktop, celular e telas estreitas.

Dados: `dist/catalog.js`. Regras: `dist/engine.js`. Interface: `dist/app.js` e `dist/styles.css`. Créditos: [docs/CREDITS.md](docs/CREDITS.md).

O catálogo reúne um recorte de propostas com referências a documentos e páginas, recuperado em 14/10/2026. Resultado é afinidade com esse recorte, não pesquisa eleitoral ou recomendação de voto.
