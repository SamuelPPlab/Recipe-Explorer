import React from "react";
import DoneRecipeCard from "../components/DoneRecipeCard";
import { getLocalStorageKey } from "../services/localStorage";

const DoneRecipes = () => {
  const recipes = getLocalStorageKey('inProgressRecipes');
  const ids = Object.keys(recipes);

  return(
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {
        ids.map((id) => {
          const { datesCooked, timesCooked, favorite, name, image, isFood } = recipes[id];
          return (
            <DoneRecipeCard
              key={id}
              id={id}
              isFood={isFood}
              name={name}
              image={image}
              datesCooked={datesCooked}
              timesCooked={timesCooked}
              favorite={favorite}
            />
          );
        })
      }
    </div>
  );
}

export default DoneRecipes;
