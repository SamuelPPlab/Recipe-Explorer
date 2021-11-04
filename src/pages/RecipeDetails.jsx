import React, { useEffect, useState } from "react";
import MainRecipeDetails from "../components/MainRecipeDetails";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { ingredientAndMeasures } from "../services/ingredientAndMeasureConcatenator";
import { getLocalStorageKey } from "../services/localStorage";
import { fetchSixRandomRecipes, resetId, setSuggestionsBasedOnUser } from "../redux/actions/detailPage";
import UnorganizedList from "../components/UnorganizedList";
import Button from "../components/Button";
import useLoadDetails from "../customHooks/useLoadDetails";
import ShareMenu from "../components/ShareMenu";
import Recomendations from "../components/Recomendations";
import { swapMainPage } from "../redux/actions/mainPage";
import useLoadSuggestions from "../customHooks/useLoadSuggestions";

const RecipeDetails = ({ location: { pathname }, ingredients, loading, measures, waitRedirect,
  resetId, getRandomRecomendations, isItFood, swapMain, foods, drinks, getRecomendations }) => {

  const [startRecipe, setStartRecipe] = useState(false);
  const id = pathname.split('/')[2];
  const inProgress = getLocalStorageKey('inProgressRecipes');
  const [surpriseMe, setSurpriseMe] = useState(false);

  useLoadDetails(pathname);
  useLoadSuggestions(foods, drinks);

  const pathnameIsFood = pathname.includes('/foods');

  useEffect(() => {
    if(isItFood !== pathnameIsFood) {
      swapMain();
    }
  }, [isItFood, swapMain, pathnameIsFood]);

  const getRandomArrayItem = (array, index) => (array[index]);

  useEffect(() => {
    if(surpriseMe) {
      getRandomRecomendations(!isItFood);
    }

    if(!surpriseMe && foods && drinks) {
      const recomendations = [];
      let suggestionPool = isItFood ? drinks : foods;
      const removeItemfromSuggestion = (index) => (
        suggestionPool = suggestionPool.filter((currentItem) => currentItem !== suggestionPool[index])
      );
      for(let i = 0; i < 6; i += 1) {
        const randomIndex = Math.floor(Math.random() * suggestionPool.length);
        recomendations.push(getRandomArrayItem(suggestionPool, randomIndex));
        removeItemfromSuggestion(randomIndex);
      }
      getRecomendations(recomendations);
    }
  }, [pathnameIsFood, getRandomRecomendations, isItFood, surpriseMe, foods, drinks, getRecomendations]);

  useEffect(() => {
    if (id && !loading) {
      resetId();
    }
  }, [id, loading, resetId]);

  if (startRecipe) return <Redirect to={`${pathname}/in-progress`} />;

  const texts = !loading && ingredientAndMeasures(ingredients, measures);

  const surpriseMeButtonProps = {
    name: surpriseMe ? 'See Chosen Suggestions' : 'Get Random Suggestions',
    id: 'Surprise Button',
    onClick: () => setSurpriseMe(!surpriseMe),
  };

  const startRecipeButtonProps = {
    name: inProgress[id] ? "Continue Cooking" : "Start Recipe",
    id: "start recipe",
    onClick: () => setStartRecipe(!startRecipe),
  };

  return(
    <div >
      <MainRecipeDetails pathname={pathname} >
        <ShareMenu id={id} pathname={pathname} />
        <UnorganizedList texts={texts} />
      </MainRecipeDetails>
      <Button {...surpriseMeButtonProps} />
      <Recomendations pathname={pathname} />
      <Button {...startRecipeButtonProps} />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  swapMain: () => dispatch(swapMainPage()),
  resetId: () => dispatch(resetId()),
  getRandomRecomendations: (isItFood) => dispatch(fetchSixRandomRecipes(isItFood)),
  getRecomendations: (recomendations) => dispatch(setSuggestionsBasedOnUser(recomendations)),
});

const mapStateToProps = ({
  detailReducer: { recipe: { ingredients, recomendations, measures, name, image }, waitRedirect, loading },
  suggestionPageReducer: { suggestionPool: { drinks, foods } },
  mainPageReducer: { isItFood },
  }) => ({
  ingredients,
  waitRedirect,
  recomendations,
  measures,
  name,
  image,
  loading,
  isItFood,
  drinks,
  foods,
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetails);
