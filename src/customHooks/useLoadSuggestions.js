import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getDrinkSuggestionPool, getFoodSuggestionPool } from "../redux/actions/suggestionPage";

const useLoadSuggestions = (foods, drinks) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!foods) {
      dispatch(getFoodSuggestionPool());
    }
    if (!drinks) {
      dispatch(getDrinkSuggestionPool());
    }
  }, [dispatch, drinks, foods]);
};

export default useLoadSuggestions;