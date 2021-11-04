import {
  LOADING, SUCCESS, ERROR, SWAP_MAIN_PAGE, SHOULD_NOT_LOAD_MAIN_RECIPES, SHOULD_LOAD_MAIN_RECIPES, CHANGE_PAGE
} from '../actions/mainPage';
import { mainPageData } from '../../services/apiDataProcessor';

const INITIAL_STATE = {
  loading: true,
  recipeList: [],
  error: '',
  isItFood: true,
  shouldReloadRecipes: true,
  currentPage: 1,
  apiResponse: [],
};

const mainPageReducer = (state = INITIAL_STATE, action) => {
  const { list, error, newPage } = action;
  const { isItFood } = state;

  switch(action.type) {
    case LOADING:
      return { ...state, loading: true };
    case SUCCESS:
      const apiResponse = list.map((recipe) => mainPageData(recipe));
      return { ...state, apiResponse, recipeList: apiResponse.slice(0, 12), loading: false };
    case SHOULD_NOT_LOAD_MAIN_RECIPES:
      return { ...state, loading: true, shouldReloadRecipes: false };
    case SHOULD_LOAD_MAIN_RECIPES:
      return { ...state, shouldReloadRecipes: true };
    case ERROR:
      return { ...state, error, loading: false };
    case SWAP_MAIN_PAGE:
      return { ...state, isItFood: !isItFood, loading: true };
    case CHANGE_PAGE:
      return { ...state, currentPage: newPage, recipeList: state.apiResponse.slice((newPage - 1) * 12, newPage * 12) };
    default:
      return state;
  };
};

export default mainPageReducer;
