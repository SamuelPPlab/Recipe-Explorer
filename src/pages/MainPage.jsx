import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { getLocalStorageKey } from "../services/localStorage";
import { categorySelector, changePage, mainPageFetcher,
  recipesByAlcoholOption, shouldLoadMainRecipes } from "../redux/actions/mainPage";
import '../css/crossOutText.css'
import RecipeCard from "../components/RecipeCard";
import Header from "../components/Header";
import NoResults from "../components/NoResults";
import Loading from "../components/Loading";
import Categories from "../components/Categories";
import ExploreLinks from "../components/ExploreLinks";
import { useLocation } from "react-router-dom";
import Pagination from '@material-ui/lab/Pagination';
import { Grid } from "@material-ui/core";

const MainPage = ({ recipeList, loading, isItFood, shouldReloadRecipes, apiResponse }) => {
  const { pathname } = useLocation();
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
  
  if (!recipeList || recipeList.length < 1) return <NoResults isItFood={isItFood} />;

  const length = apiResponse.length;

  const headerProps = {
    isItFood,
    pathname,
    title: isItFood ? 'Food Recipes' : 'Drinks',
  };

  const pageSize = 10;

  return(
    <div>
      <Header {...headerProps} />
      <ExploreLinks />
      <Categories isItFood={isItFood} />
      <Grid container spacing={4}>
        {
          recipeList.map(({ id, name, image }, index) => (
            <Grid item key={id}>
              <RecipeCard
                isItFood={isItFood}
                directory={isItFood ? '/foods' : '/drinks'}
                name={name}
                id={id}
                image={image}
                index={index}
              />
            </Grid>
          ))
        }
      </Grid>
      <Pagination size="large" hideNextButton hidePrevButton count={Math.ceil(length / pageSize)} onClick={({ target: { innerText } }) => dispatch(changePage(parseInt(innerText), pageSize))} />
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
