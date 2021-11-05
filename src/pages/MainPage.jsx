import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
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

const MainPage = ({ recipeList, loading, isItFood, shouldReloadRecipes, apiResponse }) => {
  const [goToPreferences, setGoToPreferences] = useState(false);
  const [goToSugestions, setGoToSugestions] = useState(false);
  const dispatch = useDispatch();

  const { vegan, drinker } = getLocalStorageKey('preferences');
  useEffect(() => {
    if(vegan && loading && shouldReloadRecipes) {
      dispatch(categorySelector(isItFood, 'Vegetarian'));
      return;
    }
    if(!drinker && loading && shouldLoadMainRecipes && !isItFood) {
      dispatch(recipesByAlcoholOption('Non alcoholic'));
      return;
    }
    if(shouldReloadRecipes && loading) {
      dispatch(mainPageFetcher(isItFood));
      return;
    }
    if(!loading) {
      dispatch(shouldLoadMainRecipes());
      return;
    }
  }, [isItFood, shouldReloadRecipes, loading, vegan, drinker]);

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
      <Paginator length={length} pageChanger={(newPage) => dispatch(changePage(newPage))} />
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

export default connect(mapStateToProps)(MainPage);
