import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { getLocalStorageKey } from "../services/localStorage";
import { categorySelector, changePage, mainPageFetcher,
  recipesByAlcoholOption, shouldLoadMainRecipes } from "../redux/actions/mainPage";
import { Redirect } from "react-router";
import '../css/crossOutText.css'
import RecipeCard from "../components/RecipeCard";
import Header from "../components/Header";
import NoResults from "../components/NoResults";
import Loading from "../components/Loading";
import Categories from "../components/Categories";
import Paginator from "../components/Paginator";
import ShareMenu from "../components/ShareMenu";
import Button from "../components/Button";

const MainPage = ({ recipeList, loading, isItFood, shouldReloadRecipes, apiResponse, isSearchResult, location: { pathname } }) => {
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
  }, [isItFood, shouldReloadRecipes, loading, vegan, drinker, dispatch]);

  if(loading) return <Loading />;

  if(goToPreferences) return <Redirect to="/preferences" />;

  if(goToSugestions) return <Redirect to="/suggestions" />;
  
  if (!recipeList || recipeList.length < 1) return <NoResults isItFood={isItFood} />;

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
  
  const paginatorProps = {
    length: length,
    pageChanger: (newPage) => dispatch(changePage(newPage)),
    scrollToTop: true,
  };

  const headerProps = {
    isItFood,
    pathname,
    title: isItFood ? 'Food Recipes' : 'Drinks',
    isSearchResult,
  };

  return(
    <div>
      <Header {...headerProps} />
      <ShareMenu pathname={pathname} />
      <Categories isItFood={isItFood} />
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
      <Paginator {...paginatorProps} />
    </div>
  );
};

const mapStateToProps = ({ mainPageReducer: { shouldReloadRecipes, isSearchResult, recipeList, loading, error, isItFood, apiResponse } }) => ({
  recipeList,
  loading,
  error,
  isItFood,
  apiResponse,
  shouldReloadRecipes,
  isSearchResult,
});

export default connect(mapStateToProps)(MainPage);
