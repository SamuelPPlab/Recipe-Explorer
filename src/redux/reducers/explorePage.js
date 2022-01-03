import { CHANGE_INGREDIENT_PAGE, CLEAR_INGREDIENT_SEARCH, CLEAR_STATE, ERROR_AREAS, INGREDIENT_SEARCH, LOADING, SUCCESS_ALCOHOLIC, SUCCESS_AREAS, SUCCESS_GLASSES, SUCCESS_INGREDIENTS } from "../actions/explorePage";

const INITIAL_STATE = {
  loading: true,
  error: '',
  areas: false,
  ingredients: false,
  apiResponse: [],
  alcoholicOptions: false,
  recipes: false,
  currentPage: 1,
};

const queryFinder = (query, state) => {
  const { apiResponse } = state;
  const filteredIngredients = apiResponse.filter((ingredient) =>
    (ingredient.toLowerCase().includes(query.toLowerCase())));

  return { ...state, ingredients: filteredIngredients.slice(0, 15) };
};

const exploreReducer = (state = INITIAL_STATE, action) => {
  const { ingredients, newPage, query, pageSize } = action;
  const { apiResponse } = state;
  switch(action.type) {
    case LOADING:
      return { ...state, loading: true };
    case ERROR_AREAS:
      return { ...state, loading: false, error: action.error };
    case SUCCESS_AREAS:
      return { ...INITIAL_STATE, loading: false, areas: action.areas };
    case SUCCESS_INGREDIENTS:
      return { ...INITIAL_STATE, loading: false, ingredients: ingredients, apiResponse: ingredients };
    case CLEAR_STATE:
      return { ...INITIAL_STATE };
    case SUCCESS_GLASSES:
      return { ...INITIAL_STATE, loading: false, glasses: action.glasses };
    case SUCCESS_ALCOHOLIC:
      return { ...INITIAL_STATE, loading: false, alcoholicOptions: action.alcoholicOptions };
    case CHANGE_INGREDIENT_PAGE:
      return { ...state, currentPage: newPage, ingredients: apiResponse.slice((newPage - 1) * pageSize, newPage * pageSize) };
    case INGREDIENT_SEARCH:
      return queryFinder(query, state);
    case CLEAR_INGREDIENT_SEARCH:
      return { ...state, ingredients: apiResponse.slice(0, 21) };
    default:
      return state;
  };
};

export default exploreReducer;
