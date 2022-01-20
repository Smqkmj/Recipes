import React, { Fragment } from 'react';
import './App.css';
import InputRecipe from './components/InputRecipe';
import ListRecipes from './components/ListRecipe';

function App() {
  return (
    <Fragment>
      <InputRecipe />
      <ListRecipes/>
      </Fragment>
  );
}

export default App;
