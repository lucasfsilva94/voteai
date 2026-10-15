# voteAI · Guia de uso do logo

Abra [index.html](index.html) para comparar os três conceitos lado a lado.

## Conceitos

| Conceito | Símbolo | Nome |
| --- | --- | --- |
| 1. Urna | Quadrado verde com a fenda de uma urna e o sinal de confirmação. É a evolução do símbolo atual. | DM Sans: "vote" em negrito, "AI" regular |
| 2. Visor | Visor da urna com dois campos de dígito, o primeiro confirmado e o segundo esperando. | DM Sans em negrito, com A e I dentro dos campos |
| 3. Folha | Folha de proposta com linhas de texto e o canto dobrado, onde o nome aparece. | Fraunces: "vote" reto, "AI" em itálico |

## Arquivos

```
logos/
  concept-<n>-<nome>/
    horizontal/  voteai-<nome>-horizontal-{color,mono-dark,mono-light}.svg
    vertical/    voteai-<nome>-vertical-{color,mono-dark,mono-light}.svg
    icon/        voteai-<nome>-icon-{color,mono-dark,mono-light}.svg
```

- **Horizontal:** header do site, assinatura de e-mail, documentos.
- **Vertical:** perfis em redes sociais, capas, materiais quadrados.
- **Ícone:** favicon, ícone de app, avatar, marca d'água.

Todos os SVGs têm `viewBox`, `<title>` e `<desc>`, e o texto já está convertido em traçado. Eles não dependem de fontes instaladas.

## Cores

| Papel | Hex | Uso |
| --- | --- | --- |
| Verde | `#194B39` | Fundo do símbolo, campos do visor |
| Lima | `#C8EE57` | Detalhes do símbolo (fenda, sinal, linhas, dobra) |
| Tinta | `#173D2F` | Nome em fundos claros e versão mono escura |
| Papel | `#F6F5EE` | Fundo preferencial |
| Branco | `#FFFFFF` | Versão mono clara |

- **Cor:** em papel, branco ou sálvia (`#E4E9DD`).
- **Mono escuro:** fundos claros, impressão em preto ou em uma cor.
- **Mono claro:** sobre o verde da marca, fotos escuras ou fundos escuros.

Nas versões monocromáticas, os detalhes do símbolo são vazados, e o fundo aparece através deles.

## Área de respiro e tamanhos mínimos

- Mantenha em volta do logo um espaço livre igual à metade da altura do símbolo.
- Digital: horizontal com no mínimo 120 px de largura; ícone com no mínimo 16 px.
- Impressão: horizontal com no mínimo 30 mm de largura.

## Não faça

- Esticar, inclinar ou girar.
- Trocar as cores fora da paleta, ou aplicar gradiente, sombra ou brilho.
- Separar o "AI" do "vote" ou mudar a fonte do nome.
- Colocar a versão em cor sobre fundos escuros ou muito carregados (use a mono clara).

## Uso na web

```html
<img src="voteai-urna-horizontal-color.svg" alt="voteAI" width="180" height="54">
```

## Exportar para PNG

Com o Chrome instalado, sem nenhuma outra ferramenta:

```bash
chrome --headless=new --screenshot=logo.png --window-size=1024,1024 voteai-urna-icon-color.svg
```

Ou com Inkscape: `inkscape logo.svg --export-type=png --export-width=1024`.
