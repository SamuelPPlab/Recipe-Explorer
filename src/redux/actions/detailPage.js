import { getRandomRecipe } from "../../APIintegration/categories";
import fetchDetails from "../../APIintegration/detailPage";
import { apiDataProcessor, mainPageData } from "../../services/apiDataProcessor";

export const DETAIL_SUCCESS = 'DETAIL_SUCCESS';
export const DETAIL_LOADING = 'DETAIL_LOADING';
export const WAIT_REDIRECT = 'WAIT_REDIRECT';
export const DETAIL_RESET_ID = 'DETAIL_RESET_ID';
export const DETAIL_ERROR = 'DETAIL_ERROR';
export const RECOMENDATION_SUCCESS = 'RECOMENDATION_SUCCESS';
export const RESET_STATE = 'RESET_STATE';
export const ALREADY_REDIRECTED = 'ALREADY_REDIRECTED';

const loading = () => ({ type: DETAIL_LOADING });

const success = (recipe) => ({ type: DETAIL_SUCCESS, recipe: apiDataProcessor(recipe) });

const error = (error) => ({ type: DETAIL_ERROR, error });

const setRandomRecomendations = (recomendations) => (
  { type: RECOMENDATION_SUCCESS, recomendations: recomendations.map((recipe) => mainPageData(recipe)) }
);

export const resetId = () => ({ type: DETAIL_RESET_ID });

export const resetState = () => ({ type: RESET_STATE });

export const waitRedirect = () => ({ type: WAIT_REDIRECT });

export const detailsFetcher = (food, id) => ((dispatch) => {
  dispatch(loading());
  return fetchDetails(food, id).then(
    (r) => dispatch(success(r)),
    (e) => dispatch(error(e)),
  );
});

export const fetchRandomRecipe = (isItFood) => ((dispatch) => {
  dispatch(loading());
  return getRandomRecipe(isItFood).then(
    (r) => dispatch(success(r)),
    (e) => dispatch(error(e)),
  );
});

export const fetchSixRandomRecipes = (isItFood) => (async (dispatch) => {
  const items = [...Array(6)];
  return await Promise.all(items.map(() => getRandomRecipe(isItFood))).then((r) => dispatch(setRandomRecomendations(r)))
});

export const setSuggestionsBasedOnUser = (recomendations) => ({
  type: RECOMENDATION_SUCCESS, recomendations,
});
