import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { getLocalStorageKey } from "../services/localStorage";
import { categorySelector, changePage, mainPageFetcher,
  recipesByAlcoholOption, shouldLoadMainRecipes } from "../redux/actions/mainPage";
import '../css/crossOutText.css'
import RecipeCard from "../components/RecipeCard";
import NoResults from "../components/NoResults";
import Loading from "../components/Loading";
import Categories from "../components/Categories";
import ExploreLinks from "../components/ExploreLinks";
import Pagination from '@material-ui/lab/Pagination';
import { Grid } from "@material-ui/core";

const MainPage = ({ recipeList, loading, isItFood, shouldReloadRecipes, apiResponse }) => {
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

  const pageSize = 10;

  const paginationProps = {
    size: "large",
    color: 'primary',
    hideNextButton: true,
    hidePrevButton: true,
    count: Math.ceil(length / pageSize),
    onClick: ({ target: { innerText } }) => dispatch(changePage(parseInt(innerText), pageSize)),
  };

  return(
    <div>
      <div style={{ width: '100%', borderTop: '2px solid black', borderBottom: '2px solid black', marginBottom: '30px', paddingTop: '20px', background: 'linear-gradient(180deg, rgba(244,244,244,1) 69%, rgba(206,217,254,1) 100%)' }}>
        <ExploreLinks isItFood={isItFood} />
        <Categories isItFood={isItFood} />
      </div>
      <Grid container spacing={4} style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
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
      <div style={{ marginTop: '30px', marginBottom: '10px', display: 'flex', justifyContent: 'center' }}>
        <Pagination {...paginationProps} />
      </div>
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
