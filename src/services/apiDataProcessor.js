function ingredientMapper(recipe, type) {
  const ingredients = [];
  const recipeValues = Object.entries(recipe);
  const increment = 1;
  const initialIndex = 0;
  for (let i = initialIndex; i < recipeValues.length; i += increment) {
    if (recipeValues[i][0].includes(type)) ingredients.push(recipeValues[i][1]);
  }
  return ingredients;
}

const watchToEmbed = (link) => {
  const endpoint = link.split('=');
  return `https://www.youtube.com/embed/${endpoint[1]}`;
};

export const apiDataProcessor = (recipe) => {
  const {
    idMeal, strMeal, strArea, strCategory, strInstructions, strMealThumb,
    strSource, strYoutube, strTags, idDrink, strDrink, strDrinkThumb, strAlcoholic,
  } = recipe;

  if (idMeal) {
    return ({
      id: idMeal,
      area: strArea,
      category: strCategory,
      name: strMeal,
      image: strMealThumb,
      source: strSource,
      instructions: strInstructions,
      ingredients: ingredientMapper(recipe, 'strIngredient').filter((item) => item !== '' && item),
      measures: ingredientMapper(recipe, 'strMeasure'),
      tags: strTags,
      video: watchToEmbed(strYoutube),
    });
  }
  return ({
    id: idDrink,
    isAlcoholic: strAlcoholic,
    category: strCategory,
    name: strDrink,
    image: strDrinkThumb,
    instructions: strInstructions,
    ingredients: ingredientMapper(recipe, 'strIngredient').filter((item) => item !== '' && item),
    measures: ingredientMapper(recipe, 'strMeasure'),
    tags: strTags,
    video: strYoutube,
  });
};

export const mainPageData = (recipe) => {
  const { idMeal, idDrink, strMealThumb, strDrinkThumb, strMeal, strDrink } = recipe;
  if (idMeal) {
    return ({
      id: idMeal,
      name: strMeal,
      image: strMealThumb,
    });
  }
  return ({
    id: idDrink,
    name: strDrink,
    image: strDrinkThumb,
  });
};
