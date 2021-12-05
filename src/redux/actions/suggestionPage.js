import { fetchSelectedCategoryItems, getRecipesByAlcoholicOption, getRecipesByArea } from "../../APIintegration/categories";
import { mainPageData } from "../../services/apiDataProcessor";
import { getLocalStorageKey } from "../../services/localStorage";

export const DRINK_RECIPE_OF_THE_DAY = 'DRINK_RECIPE_OF_THE_DAY';
export const CLEAR_SUGGESTION_STATE = 'CLEAR_SUGGESTION_STATE';
export const FOOD_RECIPE_OF_THE_DAY = 'FOOD_RECIPE_OF_THE_DAY';
export const DRINK_SUGGESTION_POOL = 'DRINK_SUGGESTION_POOL';
export const FOOD_SUGGESTION_POOL = 'FOOD_SUGGESTION_POOL';
export const LOADING_SUGGESTIONS = 'LOADING_SUGGESTIONS';
export const SUGGESTION_ERROR = 'SUGGESTION_ERROR';

const getUserFoodPreferences = async () => {
  const { checkedCountries, vegan, favoriteMeat } = getLocalStorageKey('preferences');
  let foodPool = [];

  if (!vegan && checkedCountries) {
    await Promise.all(checkedCountries.map((country) => getRecipesByArea(country).then((r) => foodPool.push(...r))));
  }

  if (favoriteMeat) {
    await fetchSelectedCategoryItems(true, favoriteMeat).then((r) => foodPool.push(...r));
  }

  if (vegan) {
    await fetchSelectedCategoryItems(true, 'Vegetarian').then((r) => foodPool.push(...r));
    await fetchSelectedCategoryItems(true, 'Vegan').then((r) => foodPool.push(...r));
  }

  foodPool = foodPool.map((recipe) => mainPageData(recipe));
  return foodPool;
};

const suggestionError = (error) => ({ type: SUGGESTION_ERROR, error });

const foodSuccess = (foods) => ({ type: FOOD_SUGGESTION_POOL, foods });

export const getFoodSuggestionPool = () => ((dispatch) => {
  return getUserFoodPreferences().then(
    (r) => dispatch(foodSuccess(r))
  )
});

const getUserDrinksPreferences = async (day) => {
  const { drinker } = getLocalStorageKey('preferences');
  let drinksPool = [];

  if (!drinker) {
    await getRecipesByAlcoholicOption('Non alcoholic').then((r) => drinksPool.push(...r));
    await getRecipesByAlcoholicOption('Optional alcohol').then((r) => drinksPool.push(...r));
  }

  if (drinker) {
    await getRecipesByAlcoholicOption('Alcoholic').then((r) => drinksPool.push(...r));
  }

  drinksPool = drinksPool.map((recipe) => mainPageData(recipe));
  return drinksPool;
};

const drinkSuccess = (drinks) => ({ type: DRINK_SUGGESTION_POOL, drinks });

export const getDrinkSuggestionPool = () => ((dispatch) => {
  return getUserDrinksPreferences().then(
    (r) => dispatch(drinkSuccess(r)),
    (e) => dispatch(suggestionError(e)),
  )
});

export const getFoodRecipeOfTheDay = () => ({ type: FOOD_RECIPE_OF_THE_DAY });

export const getDrinkRecipeOfTheDay = () => ({ type: DRINK_RECIPE_OF_THE_DAY });

export const clearSuggestionState = () => ({ type: CLEAR_SUGGESTION_STATE });
