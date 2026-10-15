<p align="center">
  <img alt="voteAI" src="brand/logos/concept-1-urna/horizontal/voteai-urna-horizontal-color.svg" width="360"/>
</p>

<p align="center"><strong>Primeiro as ideias. Depois os nomes.</strong></p>

<div align="center">

[![Site](https://img.shields.io/badge/Site-GitHub%20Pages-194b39)](https://lucasfsilva94.github.io/voteai/)
[![Deploy](https://github.com/lucasfsilva94/voteai/actions/workflows/pages.yml/badge.svg)](https://github.com/lucasfsilva94/voteai/actions/workflows/pages.yml)
[![Stack](https://img.shields.io/badge/Stack-HTML%20%C2%B7%20CSS%20%C2%B7%20JS-c8ee57)](#-tecnologia)
[![Backend](https://img.shields.io/badge/Backend-nenhum-173d2f)](#-tecnologia)

</div>

## 🗳️ Projeto

**voteAI** é um teste de afinidade com as propostas de **Lula** e **Flávio Bolsonaro** para 2026, sem mostrar quem propôs o quê. Você responde a 25 propostas reais, uma de cada vez. No fim, uma urna eletrônica simulada digita o número, confirma e revela com quem suas ideias combinam mais, com as fontes de cada proposta.

<p align="center">
  <img alt="Demonstração do voteAI no computador e no celular" src="docs/media/voteai-demo.gif" width="896"/>
</p>

<p align="center"><a href="docs/media/voteai-demo.mp4">Assistir em MP4 (1280×720)</a> · <a href="https://lucasfsilva94.github.io/voteai/">Abrir o site</a></p>

## ⚙️ Funcionalidades

- **Votação às cegas:** 25 propostas sorteadas de um catálogo de 50, equilibradas entre os dois candidatos e os sete temas.
- **Quatro respostas:** Concordo, Discordo, Importante (vale o dobro) ou Não sei. No computador, as setas do teclado também respondem.
- **Feito para o celular:** a votação cabe inteira na tela, sem rolagem; dá para responder com o polegar ou arrastando o cartão.
- **Urna simulada:** a urna digita o número do candidato um dígito por vez, mostra o retrato, confirma com o som real da urna e revela o resultado.
- **Resultado transparente:** percentual por candidato e por tema, revisão das suas respostas e link para o documento e a página de cada proposta.
- **Privado:** sem cadastro e sem analytics. As respostas ficam só no seu navegador, e o teste pode ser retomado de onde parou.

> [!NOTE]
> O resultado mede afinidade com este recorte de propostas. Não é pesquisa eleitoral nem recomendação de voto.

## 🧰 Tecnologia

| Parte | Como é feita |
| --- | --- |
| Site | HTML, CSS e JavaScript em módulos, sem framework e sem etapa de build (`dist/` é o site final) |
| Dados | Catálogo estático em `dist/catalog.js`, com documento e página de cada proposta |
| Cálculo | `dist/engine.js`: sorteio equilibrado e pontuação, roda no navegador |
| Som | Web Audio API, com o MP3 da confirmação da urna e o bipe das teclas |
| Testes | `node:test` para as regras; Playwright com o Chrome instalado para o navegador |
| Publicação | GitHub Actions publica `dist/` no GitHub Pages a cada push na `main` |
| Vídeos | [Remotion](https://www.remotion.dev/) (demonstração do README) e Hyperframes (vídeo da página inicial) |

## 🚀 Como usar

**Online:** abra **[lucasfsilva94.github.io/voteai](https://lucasfsilva94.github.io/voteai/)**, toque em *Descobrir minha afinidade* e responda.

**Localmente** (requer [Node.js](https://nodejs.org/) 22 ou mais recente):

```bash
git clone https://github.com/lucasfsilva94/voteai.git
cd voteai
npm run dev
```

Abra http://127.0.0.1:5173/. Como não há build, qualquer servidor estático que sirva a pasta `dist/` também funciona.

## 🧪 Testes

```bash
npm test
```

Os testes cobrem o cálculo, a seleção equilibrada, empates, respostas insuficientes e armazenamento bloqueado. Os testes de navegador (`npm run test:browser`, `npm run test:layout`) precisam do Playwright (`npm install`) e do Google Chrome instalado.

## 🎬 Vídeo de demonstração

O vídeo deste README é gerado com Remotion em [`media/readme-demo`](media/readme-demo). Os mockups usam capturas reais do site.

```bash
cd media/readme-demo
npm install
npx remotion studio                       # prévia interativa
npx remotion render VoteAIDemo out/voteai-demo.mp4
```

## 📁 Estrutura

```
dist/            site publicado (HTML, CSS, JS, catálogo e assets)
brand/logos/     logo em SVG: 3 conceitos, guia de uso e comparação
docs/            produto, especificação, arquitetura, créditos e mídia do README
media/           fontes dos vídeos (Remotion e Hyperframes)
scripts/         servidor local e verificação no navegador
tests/           testes das regras e do layout
```

Fontes dos dados, retratos, tipografia e som estão em [docs/CREDITS.md](docs/CREDITS.md).
