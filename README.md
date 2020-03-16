[![Actions Status](https://github.com/navikt/helse-frontend-moduler/workflows/storybook/badge.svg)](https://github.com/navikt/helse-frontend-moduler/actions)
[![Storybook](https://img.shields.io/badge/storybook-github%20pages-blue?style=flat&logo=github)](https://navikt.github.io/helse-frontend-moduler)

# helse-frontend-moduler
Gjenbrukbare React-komponenter for interne flater i PO Helse

Komponentene er laget basert på våre behov i PO Helse men kan fint gjenbrukes i andre interne saksbehandlingsløsninger.
Opprett issues eller snakk med en på teamet om du har endringsønsker eller andre innspill.

## Storybook
Vi bruker [Storybook](https://storybook.js.org/) som et bibliotek og visningslag for komponentene våre. 
Storybook kan startes lokalt ved å kjøre `npm run storybook` og deployes til 
https://navikt.github.io/helse-frontend-moduler ved push til master. Storybooken kan også deployes manuelt ved å kjøre 
`npm run deploy-storybook`.

## Styling
For å kutte ned på peer dependencies som konsumenter må installere har vi valgt å kompilere less til css og bundle 
stilarkene med pakkene. Vi bruker [CSS-modules](https://github.com/css-modules/css-modules) for å garantere unike klassenavn slik at vi slipper navnkollisjoner i konsumentapplikasjoner.

## Publisering
Hver enkeltpakke publiseres til npm ved å fra pakkens directory kjøre `npm run build` og så `npm publish`. Før du publiserer
må du også bumpe pakkeversjonen ved å kjøre `npm version (major|minor|patch)`, avhengig av versjonen du ønsker å bumpe til. 
Du er også nødt til å logge inn med en npm-bruker som er lagt til som medlem i `@navikt`-orgen på npm.