import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { changeIngredientPage, clearState, ingredientFetcher } from "../redux/actions/explorePage";
import ExploreHeader from "../components/ExploreHeader";
import FlagCard from "../components/FlagCard";
import IngredientCard from "../components/IngredientCard";
import AlcoholicOptionCard from "../components/AlcoholicOptionCard";
import Paginator from "../components/Paginator";
import { Grid } from "@material-ui/core";

const ExplorePage = ({ areas, loadIngredients, ingredients, isItFood, alcoholicOptions, apiResponse }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ingredientFetcher(false));
    return () => dispatch(clearState());
  }, [loadIngredients, dispatch]);

  const length = apiResponse && apiResponse.length;

  return(
    <div style={{ maxWidth: '100vw' }}>
      <ExploreHeader />
      <div style={{ marginLeft: '220px', width: 'calc(100vw - 270px)', marginTop: '30px' }}>
        <Grid container spacing={4}>
          {
            areas && areas.map((area) => area !== 'Unknown' && <Grid key={area} item><FlagCard area={area} /></Grid>)
          }
          {
            ingredients && ingredients.map((ingredient) => <Grid key={ingredient} item><IngredientCard isItFood={isItFood} ingredient={ingredient} /></Grid>)
          }
          {
            alcoholicOptions && alcoholicOptions.map((option) => <Grid key={option} item><AlcoholicOptionCard option={option} /></Grid>)
          }
        </Grid>
        {ingredients && <Paginator pageChanger={(newPage) => dispatch(changeIngredientPage(newPage))} length={length} />}
      </div>
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
