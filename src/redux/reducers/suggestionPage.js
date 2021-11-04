import { CLEAR_SUGGESTION_STATE, DRINK_RECIPE_OF_THE_DAY, DRINK_SUGGESTION_POOL, FOOD_RECIPE_OF_THE_DAY, FOOD_SUGGESTION_POOL, SUGGESTION_ERROR } from "../actions/suggestionPage";

const INITIAL_STATE = {
  foodSuggestion: false,
  drinkSuggestion: false,
  error: false,
  suggestionPool: { foods: false, drinks: false },
};

const suggestionPageReducer = (state = INITIAL_STATE, action) => {
  const { foods, drinks, error, type } = action;
  const { suggestionPool } = state;

  const randomFoodIndex = suggestionPool.foods && Math.floor(Math.random() * suggestionPool.foods.length);
  const randomDrinkIndex = suggestionPool.drinks && Math.floor(Math.random() * suggestionPool.drinks.length);

  switch(type) {
    case FOOD_SUGGESTION_POOL:
      return { ...state, suggestionPool: { ...suggestionPool, foods } };
    case SUGGESTION_ERROR:
      return { ...state, error };
    case DRINK_SUGGESTION_POOL:
      return { ...state, suggestionPool: { ...suggestionPool, drinks } };
    case FOOD_RECIPE_OF_THE_DAY:
      return { ...state, suggestionPool: { drinks: suggestionPool.drinks, foods: suggestionPool.foods.filter((item) => (item !== suggestionPool.foods[randomFoodIndex])) }, foodSuggestion: suggestionPool.foods[randomFoodIndex] };
    case DRINK_RECIPE_OF_THE_DAY:
      return { ...state, suggestionPool: { foods: suggestionPool.foods, drinks: suggestionPool.drinks.filter((item) => (item !== suggestionPool.drinks[randomDrinkIndex])) }, drinkSuggestion: suggestionPool.drinks[randomDrinkIndex] };
    case CLEAR_SUGGESTION_STATE:
      return { ...INITIAL_STATE };
    default:
      return state;
  };
};

export default suggestionPageReducer;
