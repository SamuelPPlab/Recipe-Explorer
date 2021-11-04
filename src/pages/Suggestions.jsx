import React, { useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import BackToMain from "../components/BackToMain";
import Button from "../components/Button";
import MainRecipeDetails from "../components/MainRecipeDetails";
import RecipeCard from "../components/RecipeCard";
import UnorganizedList from "../components/UnorganizedList";
import useLoadSuggestions from "../customHooks/useLoadSuggestions";
import { detailsFetcher, resetState } from "../redux/actions/detailPage";
import { getDrinkRecipeOfTheDay, getFoodRecipeOfTheDay } from "../redux/actions/suggestionPage";
import { ingredientAndMeasures } from "../services/ingredientAndMeasureConcatenator";

const Suggestions = ({ foodSuggestion, drinkSuggestion, foods, drinks, recipe, clearData }) => {

  const dispatch = useDispatch();

  useLoadSuggestions(foods, drinks);

  useEffect(() => {
    if (drinks && !drinkSuggestion) {
      dispatch(getDrinkRecipeOfTheDay());
    }
  }, [dispatch, drinks, drinkSuggestion]);

  useEffect(() => {
    if (foods && !foodSuggestion) {
      dispatch(getFoodRecipeOfTheDay());
    }
  }, [dispatch, foods, foodSuggestion]);

  useEffect(() => (clearData), [clearData]);
  useEffect(() => {
    clearData();
  }, [clearData]);

  const handleNewFoodClick = () => {
    dispatch(getFoodRecipeOfTheDay());
    clearData();
  };

  const handleNewDrinkClick = () => {
    dispatch(getDrinkRecipeOfTheDay());
    clearData();
  };

  const allFoodSuggestionsGone = foods.length === 0;
  const allDrinksSuggestionsGone = drinks.length === 0;

  const foodRecomendationProps = foodSuggestion && {
    image: foodSuggestion.image,
    name: foodSuggestion.name,
    id: foodSuggestion.id,
    category: foodSuggestion.category,
    directory: '/foods',
    redirectOnClick: false,
    onClick: () => dispatch(detailsFetcher(true, foodSuggestion.id)),
  };

  const drinkRecomendationProps = drinkSuggestion && {
    image: drinkSuggestion.image,
    name: drinkSuggestion.name,
    id: drinkSuggestion.id,
    category: drinkSuggestion.category,
    directory: '/drinks',
    redirectOnClick: false,
    onClick: () => dispatch(detailsFetcher(false, drinkSuggestion.id)),
  };

  const newFoodRecomendationProps = {
    name: 'New Food',
    id: 'New Food Recomendation',
    onClick: () => handleNewFoodClick(),
    disabled: allFoodSuggestionsGone,
  };

  const newDrinkRecomendationProps = {
    name: 'New Drink',
    id: 'New Drink Recomendation',
    onClick: () => handleNewDrinkClick(),
    disabled: allDrinksSuggestionsGone,
  };

  const hideDetailsButtonProps = {
    name: 'Hide Details',
    id: 'Hide Details',
    onClick: () => dispatch(resetState()),
  };

  const texts = recipe && ingredientAndMeasures(recipe.ingredients, recipe.measures);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        {
          foodSuggestion && <RecipeCard { ...foodRecomendationProps }>
            <Button {...newFoodRecomendationProps} />
          </RecipeCard>
        }
        { 
          drinkSuggestion && <RecipeCard { ...drinkRecomendationProps }>
            <Button {...newDrinkRecomendationProps} />
          </RecipeCard>
        }
      </div>
      <div>
        <BackToMain />
        {recipe && <Button {...hideDetailsButtonProps} />}
        {
          recipe && <MainRecipeDetails>
            <UnorganizedList texts={texts} />
          </MainRecipeDetails>
        }
      </div>
    </div>
  );
};

const mapStateToProps = ({ suggestionPageReducer: { foodSuggestion, drinkSuggestion, suggestionPool }, detailReducer: { recipe } }) => ({
  recipe,
  foodSuggestion,
  drinkSuggestion,
  foods: suggestionPool.foods,
  drinks: suggestionPool.drinks,
});

const mapDispatchToProps = (dispatch) => ({
  clearData: () => dispatch(resetState()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Suggestions);
