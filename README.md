This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Content of the application

Example of a resusable list component that renders dynamically the data that is passed into it by props

The data is from the Rick & Morty API: [https://rickandmortyapi.com/](https://rickandmortyapi.com/)

- react
- styled-components
- sass
- (no libraries such as: material-ui)

### Features

This list has the following features

- Display N columns and their data
- Image rendering
- Expand row
- Pagination
- Filtering
- Sorting

### Install dependencies

```bash
yarn install
```

### Run in your local machine

```bash
yarn start
```

[http://localhost:3000](http://localhost:3000)

### Check documentation and propTypes

```bash
yarn styleguidist-dev
```

[http://localhost:6060](http://localhost:6060)

##### Decisions

React is a great library that renders only the changes that affects some elements of the DOM.
Styled-componets was used to render jsx elements according to props sent to the component
Just like styled-components (that have a theme) SASS is very useful to create and use variables throughout our file/application

##### Future Improvements

Just like we send a component element as the prop expandedRow, the idea of the next feature is to also being able to send componets to be render in any desirable item from the header or row of the list


##### Live preview
[https://alexis-rick-and-morty-api.netlify.app/](https://alexis-rick-and-morty-api.netlify.app/)


##### Documentation
[https://alexis-rick-and-morty-api-docs.netlify.app/](https://alexis-rick-and-morty-api-docs.netlify.app/)

