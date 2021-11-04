export const concatenator = (ingredient, measure) => (
  `${ingredient}${(measure === '') ? '' : ` - ${measure}`}`
);

export const ingredientAndMeasures = (ingredients, measures) =>
  ingredients.map((ingredient, index) => concatenator(ingredient, measures[index]));
