---


---

# Vue Currency Converter

An application made with Vue.js and Vuetify, utilizing Vuex, Vue Router and RESTful API endpoints.

# Description

Application consists of two pages - converter on the homepage and conversions history table on the other one.

Navigation between pages in created with Vue Router, with a 404 fallback, redirecting user back to the homepage.

## Converter

Currency converter on the homepage is inspired by Google one, it shares its layout and some of the functionalities.

When the homepage is rendered for the first time, the converter header displays most recent conversion rate from 1 Pound sterling to Euro. Filling converter form with a set of new data updates header.

Once currencies are set initially, user can freely change both amounts, to recalculate them.

When one of the currencies is set, a new conversion is being made and saved via Vuex to localStorage.

### Validation

User inputs of both - 'from' and 'to' - values are validated by the same rules, allowing only digits and a single dot. If identical currencies are chosen, one of them is immediately changed for a different one.
Values in the converter header are displayed in currency format.

### Vuex

Vuex mutations trigger updates of the state located in localStorage. Each change between two currencies saves another conversion.

## Table

Saved conversion are listed using Vuetify table, which allows users to sort them by both conversion values, both currencies and date. Conversions can be removed permanently one by one. 



## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
