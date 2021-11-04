import { combineReducers } from "redux";
import mainPageReducer from "./mainPage";
import detailReducer from "./detailPage";
import exploreReducer from "./explorePage";
import suggestionPageReducer from "./suggestionPage";

const rootReducer = combineReducers({
  mainPageReducer,
  detailReducer,
  exploreReducer,
  suggestionPageReducer,
});

export default rootReducer;
