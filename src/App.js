import React,{useEffect, useState} from "react";
import Recipe from './Recipe';
import './App.css';

const App = () => {

  const APP_ID = '7faec56a';
  const APP_KEY = '8606cab07eb14b7f5fbac49a3af482a8'
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQeury] = useState()

  useEffect( () => {
    getRecipes();
    // eslint-disable-next-line
  }, [query]);


  const getRecipes = async () => {
    fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&health=alcohol-free

    `)
      .then((x) => x.json())
      .then((y) => setRecipes(y.hits) + console.log(y.hits));
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQeury(search);
    setSearch('');
  }


  return(
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button 
          className="search-button" 
          type="submit">
            search
          </button>
      </form>
      <div className="recipes">
      {recipes.map(recipe => (
        <Recipe 
        title={recipe.recipe.label} 
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div>
  )
}

export default App;
