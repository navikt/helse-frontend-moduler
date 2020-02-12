[![Actions Status](https://github.com/navikt/helse-frontend-moduler/workflows/storybook/badge.svg)](https://github.com/navikt/helse-frontend-moduler/actions)

# helse-frontend-moduler
Gjenbrukbare React-komponenter for interne flater i PO Helse

Komponentene er laget basert på våre behov i PO Helse men kan fint gjenbrukes i andre interne saksbehandlingsløsninger.

## Storybook
Vi bruker [Storybook](https://storybook.js.org/) som et bibliotek og visningslag for komponentene våre. Storybook kan startes lokalt ved å kjøre `npm run storybook` og deployes til https://navikt.github.io/helse-frontend-moduler ved push til master. Storybooken kan også deployes manuelt ved å kjøre `npm run deploy-storybook`.

## Styling
Vi bruker CSS-in-JS-rammeverket [Emotion](https://emotion.sh/docs/introduction) for styling av komponentene. Hvorfor CSS-in-JS og ikke Less eller en annen CSS-preprocessor?

#### 1. Klassenavn med garantert lokal scope
Emotion genererer unike klassenavn for hver komponent slik at vi ikke trenger å bekymre oss for at vi endrer stylingen andre steder i applikasjonen når vi endrer en enkelt komponent. BEM løser dette for applikasjoner som bruker Less og CSS, men garanterer ikke unike klassenavn og resulterer i ganske "wordy" klassenavn man må forholde seg til i koden.

#### 2. Enkel læringskurve
Med Emotion kan man style komponenter med både js-objekter og vanlig CSS.

#### 3. Mer lesbar renderingkode
Her er to enkle eksempler for å illustrere dette, én med Less + BEM og én med Emotion:

```jsx
<div className="container">
  <h1 className="container--tittel">Hello, world!</h1>
  <p className="container--tekst">Dette er en komponent med Less + BEM</p>
  <div className="container container--knappegruppe">
    <button className="knapp knapp--hoved">A</button>
    <button className="knapp knapp--flat">B</button>
    <button className="knapp knapp--flat">C</button>
  </div>
</div>
```

```jsx
<Container>
  <Tittel>Hello, world!</Tittel>
  <Tekst>Dette er en komponent med Emotion</Tekst>
  <Knapper>
    <Hovedknapp>A</Hovedknapp>
    <Flatknapp>B</Flatknapp>
    <Flatknapp>C</Flatknapp>
  </Knapper>
</Container>
```
