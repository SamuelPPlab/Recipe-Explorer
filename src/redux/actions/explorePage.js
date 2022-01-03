import { fetchAlcoholic, fetchAreas, fetchGlasses, fetchIngredients } from "../../APIintegration/categories";

export const LOADING = 'LOADING';
export const ERROR_AREAS = 'ERROR_AREAS';
export const CHANGE_INGREDIENT_PAGE = 'CHANGE_INGREDIENT_PAGE';
export const SUCCESS_AREAS = 'SUCCESS_AREAS';
export const CLEAR_STATE = 'CLEAR_STATE';
export const SUCCESS_ALCOHOLIC = 'SUCCESS_ALCOHOLIC';
export const SUCCESS_GLASSES = 'SUCCESS_GLASSES';
export const SUCCESS_INGREDIENTS = 'SUCCESS_INGREDIENTS';
export const SUCCESS_RECIPES = 'SUCCESS_RECIPES';
export const INGREDIENT_SEARCH = 'INGREDIENT_SEARCH';
export const CLEAR_INGREDIENT_SEARCH = 'CLEAR_INGREDIENT_SEARCH';

const loading = () => ({ type: LOADING });

const success = (areas) => ({
  type: SUCCESS_AREAS,
  areas,
});

const successIngredients = (ingredients) => ({
  type: SUCCESS_INGREDIENTS,
  ingredients,
});

const successGlasses = (glasses) => ({
  type: SUCCESS_GLASSES,
  glasses,
});

const successAlcoholic = (alcoholicOptions) => ({
  type: SUCCESS_ALCOHOLIC,
  alcoholicOptions,
});

const error = (error) => ({
  type: ERROR_AREAS,
  error,
});

export const clearIngredientSearch = () => ({ type: CLEAR_INGREDIENT_SEARCH });

export const ingredientSearch = (query) => ({ type: INGREDIENT_SEARCH, query });

export const changeIngredientPage = (newPage, pageSize) => ({ type: CHANGE_INGREDIENT_PAGE, newPage, pageSize });

export const clearState = () => ({ type: CLEAR_STATE });

export const areaFetcher = () => ((dispatch) => {
  dispatch(loading());
  return(
    fetchAreas().then(
      (r) => dispatch(success(r)),
      (e) => dispatch(error(e)),
    )
  );
});

export const ingredientFetcher = (isItFood) => ((dispatch) => {
  dispatch(loading());
  return(
    fetchIngredients(isItFood).then(
      (r) => dispatch(successIngredients(r)),
      (e) => dispatch(error(e)),
    )
  );
});

export const glassFetcher = () => ((dispatch) => {
  dispatch(loading());
  return(
    fetchGlasses().then(
      (r) => dispatch(successGlasses(r)),
      (e) => dispatch(error(e)),
    )
  );
});

export const alcoholicOptionsFetcher = () => ((dispatch) => {
  dispatch(loading());
  return(
    fetchAlcoholic().then(
      (r) => dispatch(successAlcoholic(r)),
      (e) => dispatch(error(e)),
    )
  );
});
