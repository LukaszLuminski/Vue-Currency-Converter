---


---

# Vue Currency Converter

An application made with Vue.js and Vuetify, utilizing Vuex, Vue Router and RESTful API endpoints.

# Description

Application consists of two pages - converter on the homepage and conversions history table on the other page.

Navigation between pages in created with Vue Router, with a 404 fallback, redirecting user back to the converter.

## Converter

When the homepage is rendered for the first time, the converter header displays default values of the most recent conversion rate from 1 Pound sterling to Euro. Each new conversion updates header and is saved via Vuex to localStorage.

### Validation

Conversion amount input allows only digits and a single dot. If two identical currencies are chosen, the first one is immediately changed for the previously stored value of the second one.
Values in the converter header are formatted as currency strings.

### Vuex

Vuex mutations trigger updates of the state's copy located in localStorage.

## Table

Saved conversions are listed using Vuetify table, which allows users to sort them by both conversion values, both currencies and date. Conversions can be removed permanently one by one. 


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
