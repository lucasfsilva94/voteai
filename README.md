<p align="center">
  <img alt="voteAI" src="brand/logo/horizontal/voteai-urna-horizontal-color.svg" width="360"/>
</p>

<p align="center"><strong>Primeiro as ideias. Depois os nomes.</strong></p>

<div align="center">

[![Site](https://img.shields.io/badge/Site-GitHub%20Pages-194b39)](https://lucasfsilva94.github.io/voteai/)
[![Deploy](https://github.com/lucasfsilva94/voteai/actions/workflows/pages.yml/badge.svg)](https://github.com/lucasfsilva94/voteai/actions/workflows/pages.yml)
[![Stack](https://img.shields.io/badge/Stack-HTML%20%C2%B7%20CSS%20%C2%B7%20JS-c8ee57)](#-tecnologia)
[![Backend](https://img.shields.io/badge/Backend-nenhum-173d2f)](#-tecnologia)

</div>

## 🗳️ Projeto

**voteAI** é um teste de afinidade para o **2º turno da eleição para presidente, em 25 de outubro de 2026**, entre **Lula** e **Flávio Bolsonaro**, sem mostrar quem propôs o quê. Você responde a 25 propostas reais dos planos de governo registrados no TSE, escritas em linguagem simples, uma de cada vez, como num bloco de post-its. No fim, uma urna eletrônica simulada digita o número, mostra o candidato, confirma e revela com quem suas ideias combinam mais, com as fontes de cada proposta.

<p align="center">
  <img alt="Vídeo do voteAI: a data do 2º turno e os dois candidatos, propostas às cegas recebendo selos, o teste no computador e no celular e a urna revelando o resultado" src="docs/media/voteai-demo.gif" width="896"/>
</p>

<p align="center"><a href="https://lucasfsilva94.github.io/voteai/">Abrir o site</a></p>

## ⚙️ Funcionalidades

- **Votação às cegas:** 25 propostas sorteadas de um catálogo de 50, equilibradas entre os dois candidatos (11 exclusivas de cada um e 3 que os dois apoiam) e os sete temas, em linguagem do dia a dia.
- **Quatro respostas:** Concordo, Discordo, Importante (vale o dobro) ou Não sei. Cada resposta carimba um selo na nota, que descola e sai do bloco. No computador, as setas do teclado também respondem.
- **Feito para o celular:** a votação e a urna cabem inteiras na tela, sem rolagem, de 320 px de largura em diante; a proposta ajusta o tamanho da letra para ocupar a nota, e dá para responder com o polegar ou arrastando a nota.
- **Urna simulada:** como na urna de verdade, ela digita o número um dígito por vez, mostra nome, partido e retrato, confirma com o som real da urna e revela o resultado.
- **Página do 2º turno:** contagem regressiva para 25 de outubro, os dois candidatos lado a lado com tratamento igual, vídeo explicativo, perguntas frequentes e uma demonstração que se anima sozinha.
- **Resultado transparente:** percentual por candidato e por tema, revisão das suas respostas e link para o documento e a página de cada proposta.
- **Privado:** sem cadastro e sem analytics. As respostas ficam só no seu navegador, e o teste pode ser retomado de onde parou.

> [!NOTE]
> O resultado mede afinidade com este recorte de propostas. Não é pesquisa eleitoral nem recomendação de voto.

## 🧰 Tecnologia

| Parte | Como é feita |
| --- | --- |
| Site | HTML, CSS e JavaScript em módulos, sem framework e sem etapa de build (`dist/` é o site final); fontes Rubik, Fredoka, IBM Plex Mono e DotGothic16 auto-hospedadas |
| Dados | Catálogo estático em `dist/catalog.js`, com documento e página de cada proposta |
| Cálculo | `dist/engine.js`: sorteio equilibrado e pontuação, roda no navegador |
| Som | Web Audio API, com o MP3 da confirmação da urna e o bipe das teclas |
| Testes | `node:test` para as regras; Playwright com o Chrome instalado para o navegador |
| Publicação | GitHub Actions publica `dist/` no GitHub Pages a cada push na `main` |
| Vídeos | [Remotion](https://www.remotion.dev/): o vídeo da página inicial (`LandingVideo`), também mostrado neste README |

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

O vídeo deste README é o mesmo da página inicial: cerca de 20 segundos, sem locução, em loop. Ele mostra a data do 2º turno e os dois candidatos, três propostas às cegas recebendo selos, o teste no computador e no celular e a urna revelando o resultado. É gerado com Remotion em [`video`](video), e os mockups usam capturas reais do site.

```bash
cd video
npm install
npm run dev                               # prévia interativa no Remotion Studio
npm run render                            # gera dist/assets/voteai-explainer.mp4
```

O GIF em loop deste README sai do mesmo vídeo; o comando está no [README do projeto de vídeo](video/README.md).

## 📁 Estrutura

```
dist/            site publicado (HTML, CSS, JS, catálogo e assets)
brand/           logo aprovado (logo/) com guia de uso e conceitos explorados (explorations/)
docs/            produto, especificação, arquitetura, créditos e mídia do README
video/           projeto Remotion do vídeo da página inicial (também usado neste README)
scripts/         servidor local e verificação no navegador
tests/           testes das regras, do layout e do fluxo no navegador
```

Fontes dos dados, retratos, tipografia e som estão em [docs/CREDITS.md](docs/CREDITS.md).
