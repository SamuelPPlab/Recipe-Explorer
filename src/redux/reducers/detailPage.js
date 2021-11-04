import { DETAIL_LOADING, DETAIL_ERROR, DETAIL_SUCCESS, DETAIL_RESET_ID, RECOMENDATION_SUCCESS, RESET_STATE, WAIT_REDIRECT, ALREADY_REDIRECTED } from '../actions/detailPage';

const INITIAL_STATE = {
  loading: true,
  recipe: false,
  error: '',
  waitRedirect: false,
  recomendations: false,
  id: false,
};

const detailReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case DETAIL_LOADING:
      return { ...state, loading: true };
    case RECOMENDATION_SUCCESS:
      return { ...state, recomendations: action.recomendations };
    case DETAIL_ERROR:
      return { ...state, error: action.error };
    case DETAIL_SUCCESS:
      return { ...state, loading: false, recipe: action.recipe, id: action.recipe.id, waitRedirect: false };
    case DETAIL_RESET_ID:
      return { ...state, id: false };
    case RESET_STATE:
      return { ...INITIAL_STATE };
    case WAIT_REDIRECT:
      return { ...state, waitRedirect: true };
    case ALREADY_REDIRECTED:
      return { ...state, waitRedirect: false };
    default:
      return state;
  };
};

export default detailReducer;
