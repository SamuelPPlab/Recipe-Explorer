export const mapDetailsStateToProps = ({ detailReducer, mainPageReducer }) => ({
  ingredients: detailReducer.recipe.ingredients,
  recomendations: detailReducer.recomendations,
  measures: detailReducer.recipe.measures,
  name: detailReducer.recipe.name,
  image: detailReducer.recipe.image,
  loading: detailReducer.loading,
  isItFood: mainPageReducer.isItFood,
});
