import mainData from "../../APIintegration/mainPage";
import { fetchSelectedCategoryItems, getRecipesByAlcoholicOption, getRecipesByArea, getRecipesByIngredients } from "../../APIintegration/categories";
import { searchEngine } from "../../APIintegration/search";

export const LOADING = 'LOADING';
export const SUCCESS = 'SUCCESS';
export const ERROR = 'ERROR';
export const CHANGE_PAGE = 'CHANGE_PAGE';
export const SHOULD_NOT_LOAD_MAIN_RECIPES = 'SHOULD_NOT_LOAD_MAIN_RECIPES';
export const SHOULD_LOAD_MAIN_RECIPES = 'SHOULD_LOAD_MAIN_RECIPES';
export const SWAP_MAIN_PAGE = 'SWAP MAIN PAGE';

const loading = () => ({ type: LOADING });

const success = (list) => ({ type: SUCCESS, list, isSearchResult: false });

const shouldNotLoadMainRecipes = () => ({ type: SHOULD_NOT_LOAD_MAIN_RECIPES });

const error = (error) => ({ type: ERROR, error });

export const changePage = (newPage) => ({ type: CHANGE_PAGE, newPage });
 
export const shouldLoadMainRecipes = () => ({ type: SHOULD_LOAD_MAIN_RECIPES });

export const swapMainPage = () => ({ type: SWAP_MAIN_PAGE });

export const searchResults = (list) => ({ type: SUCCESS, list, isSearchResult: true })

export const searching = (filter, value, food) => ((dispatch) => {
  dispatch(loading());
  dispatch(shouldNotLoadMainRecipes());
  return searchEngine(filter, value, food).then(
    (r) => dispatch(searchResults(r)),
    (e) => dispatch(error(e)),
  );
});

export const mainPageFetcher = (food) => ((dispatch) => {
  dispatch(loading());
  return mainData(food).then(
    (r) => dispatch(success(r)),
    (e) => dispatch(error(e)),
  );
});

export const categorySelector = (isItFood, category) => ((dispatch) => {
  dispatch(loading());
  dispatch(shouldNotLoadMainRecipes());
  return fetchSelectedCategoryItems(isItFood, category).then(
    (r) => dispatch(success(r)),
    (e) => dispatch(error(e)),
  );
});

export const recipesByIngredients = (isItFood, ingredient) => ((dispatch) => {
  dispatch(loading());
  dispatch(shouldNotLoadMainRecipes());
  return(
    getRecipesByIngredients(isItFood, ingredient).then(
      (r) => dispatch(success(r)),
      (e) => dispatch(error(e)),
    )
  );
});

export const recipesByAlcoholOption = (option) => ((dispatch) => {
  dispatch(loading());
  dispatch(shouldNotLoadMainRecipes());
  return(
    getRecipesByAlcoholicOption(option).then(
      (r) => dispatch(success(r)),
      (e) => dispatch(error(e)),
    )
  );
});

export const recipesByAreaFetcher = (area) => ((dispatch) => {
  dispatch(loading());
  dispatch(shouldNotLoadMainRecipes());
  return(
    getRecipesByArea(area).then(
      (r) => dispatch(success(r)),
      (e) => dispatch(error(e)),
    )
  );
});
