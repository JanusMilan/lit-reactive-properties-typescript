
## LitElement Website

A Single Page Application(SPA) based on Web Components using LitElement, Vaadin Router for navigation and TypeScript.

## Quickstart

To get started, install dependencies:

```sh
npm install
```

Start the preview of the app:

```sh
npm run start
```

This will open your default browser with the App.

## Scripts

- `start` runs your app for development, reloading on file changes
- `start:build` runs your app after it has been built using the build command
- `build` builds your app and outputs it in your `dist` directory
- `test` runs your test suite with Karma
- `lint` runs the linter for your project


# 'internalProperty' ist nicht im Lit 3.0 
- internalProperty has been renamed to 'state' in lit-element 3.0. 

- Also 'state'
- import {  internalProperty } from "lit-element";
- Im 'package.json': "lit-element": "^2.3.1"


# Reactive properties Lit 2.0
- https://lit.dev/docs/components/properties/

# Reactive properties Lit 2.0
- https://lit.dev/docs/v1/components/properties/

# PropertyDeclaration
- https://lit.dev/docs/api/ReactiveElement/#PropertyDeclaration
  
# Beschreibung
- CE Update und Rendern wird mit reactiven properties automatisch geregelt 
- Dafür wird LIT LifeCycle Methode 'update' und Map 'changedProperties' genutzt
- Zustand der CE wird also über reactiven properties automatisch geregelt
- Weiter wird CE LifeCycle Methode 'connectedCallback' genutzt um User Angabe abzufangen
- Beispiel ist künstlich, besser mit Events zu arbeiten?? 