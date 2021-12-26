import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { changeIngredientPage, clearState, ingredientFetcher } from "../redux/actions/explorePage";
import ExploreHeader from "../components/ExploreHeader";
import FlagCard from "../components/FlagCard";
import IngredientCard from "../components/IngredientCard";
import AlcoholicOptionCard from "../components/AlcoholicOptionCard";
import Paginator from "../components/Paginator";
import BackToMain from "../components/BackToMain";
import { Button, Drawer, Grid, List, ListItem } from "@material-ui/core";

const ExplorePage = ({ areas, loadIngredients, ingredients, isItFood, alcoholicOptions, apiResponse }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ingredientFetcher(false));
    return () => dispatch(clearState());
  }, [loadIngredients, dispatch]);

  const length = apiResponse && apiResponse.length;

  return(
    <div>
      <ExploreHeader/>
      <BackToMain />
      <Grid container spacing={2}>
        {
          areas && areas.map((area) => area !== 'Unknown' && <Grid item><FlagCard key={area} area={area} /></Grid>)
        }
        {
          ingredients && ingredients.map((ingredient) => <Grid item><IngredientCard key={ingredient} isItFood={isItFood} ingredient={ingredient} /></Grid>)
        }
        {
          alcoholicOptions && alcoholicOptions.map((option) => <Grid item><AlcoholicOptionCard key={option} option={option} /></Grid>)
        }
      </Grid>
      {ingredients && <Paginator pageChanger={(newPage) => dispatch(changeIngredientPage(newPage))} length={length} />}
    </div>
  );
};

const mapStateToProps = ({ exploreReducer: { loading, areas, ingredients, alcoholicOptions, apiResponse }, mainPageReducer: { isItFood } }) => ({
  areas,
  loading,
  ingredients,
  isItFood,
  alcoholicOptions,
  apiResponse,
});

export default connect(mapStateToProps)(ExplorePage);
