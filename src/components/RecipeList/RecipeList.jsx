import RecipeCard from '../RecipeCard/RecipeCard.jsx'
import styles from './RecipeList.module.css'
import { useState } from 'react'
 export default function RecipeList({ recipes }) {
   const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [query, setQuery] = useState('')

  const filteredRecipes = recipes.filter((r) =>
    r.name.toLowerCase().includes(query.toLowerCase())
  )
  return (
    <div>
            <input type= "text" placeholder="Search recipes..." onChange={(e) => setQuery(e.target.value)}/>
     <ul className={styles.list}>
      {filteredRecipes.map((recipe, index) => (
        /*
        React uses `key` to decide whether a list item in the new render is the
        “same” one as before. Here the key is the array index: 0, 1, 2, …
        
        After the parent reverses the array, index 0 still refers to “first row
        in the list,” but that row now shows different data (a different recipe).
        React will often reuse the component instance that was already at that
        index: props update to the new recipe, while any local state (e.g. Pin)
        stays with that instance — so UI that depends on state can disagree with
        the recipe you see on the card.
        
        Try it: pin a card, then reverse order and watch whether “pinned” still
        matches the recipe you originally pinned.
        */
      <RecipeCard key={recipe.id} recipe={recipe} onSelect = {setSelectedRecipe} />
      ))}
    </ul>
    {selectedRecipe && (
      <div className= {styles.details}>
        <button onClick={() => selectedRecipe(null)}>Close</button>
        <h2>{selectedRecipe.name}</h2>
        <p>{selectedRecipe.description}</p>
      </div>
    )}
      </div>
   )
}
