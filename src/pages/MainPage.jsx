import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getLocalStorageKey } from "../services/localStorage";
import { categorySelector, changePage, mainPageFetcher, recipesByAlcoholOption, shouldLoadMainRecipes } from "../redux/actions/mainPage";
import { Redirect } from "react-router";
import '../css/crossOutText.css'
import RecipeCard from "../components/RecipeCard";
import Header from "../components/Header";
import NoResults from "../components/NoResults";
import Loading from "../components/Loading";
import Categories from "../components/Categories";
import ExploreButton from "../components/ExploreButton";
import SwitchMainPage from "../components/SwitchMainPage";
import Paginator from "../components/Paginator";
import Button from "../components/Button";

const MainPage = ({ recipeList, loading, isItFood, shouldReloadRecipes, loadMainRecipes, allowLoadingRecipes, apiResponse, newPage, loadVegetarianRecipes, loadNonAlcoholicDrinks }) => {
  const [goToPreferences, setGoToPreferences] = useState(false);
  const [goToSugestions, setGoToSugestions] = useState(false);

  const { vegan, drinker } = getLocalStorageKey('preferences');
  useEffect(() => {
    if(vegan && loading && shouldReloadRecipes) {
      loadVegetarianRecipes(isItFood);
      return;
    }
    if(!drinker && loading && shouldLoadMainRecipes && !isItFood) {
      loadNonAlcoholicDrinks();
      return;
    }
    if(shouldReloadRecipes && loading) {
      loadMainRecipes(isItFood);
      return;
    }
    if(!loading) {
      allowLoadingRecipes();
      return;
    }
  }, [isItFood, shouldReloadRecipes, loadMainRecipes, loading, allowLoadingRecipes, vegan, drinker, loadVegetarianRecipes, loadNonAlcoholicDrinks]);

  if(loading) return <Loading />;

  if(goToPreferences) return <Redirect to="/preferences" />;

  if(goToSugestions) return <Redirect to="/suggestions" />;
  
  if (recipeList.length < 1) return <NoResults />;

  const length = apiResponse.length;

  const setPreferencesProps = {
    name: "Set Preferences",
    id: "Set Preferences",
    onClick: () => setGoToPreferences(!goToPreferences),
  };

  const seeSuggestionsOfTheDayProps = {
    name: "See Recipes Of The Day",
    id: "See Recipes Of The Day",
    onClick: () => setGoToSugestions(!goToSugestions),
  };

  return(
    <div>
      <Header isItFood={isItFood} />
      <Categories isItFood={isItFood} />
      <SwitchMainPage isItFood={isItFood} />
      <ExploreButton />
      <Button {...setPreferencesProps} />
      <Button {...seeSuggestionsOfTheDayProps} />
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {
          recipeList.map(({ id, name, image }, index) => (
            <RecipeCard
              key={id}
              directory={isItFood ? '/foods' : '/drinks'}
              name={name}
              id={id}
              image={image}
              index={index}
            />
          ))
        }
      </div>
      <Paginator length={length} pageChanger={newPage} />
    </div>
  );
};

const mapStateToProps = ({ mainPageReducer: { shouldReloadRecipes, recipeList, loading, error, isItFood, apiResponse } }) => ({
  recipeList,
  loading,
  error,
  isItFood,
  apiResponse,
  shouldReloadRecipes,
});

const mapDispatchToProps = (dispatch) => ({
  loadVegetarianRecipes: (isItFood) => dispatch(categorySelector(isItFood, 'Vegetarian')),
  loadNonAlcoholicDrinks: () => dispatch(recipesByAlcoholOption('Non alcoholic')),
  allowLoadingRecipes: () => dispatch(shouldLoadMainRecipes()),
  loadMainRecipes: (isItFood) => dispatch(mainPageFetcher(isItFood)),
  newPage: (newPage) => dispatch(changePage(newPage)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
