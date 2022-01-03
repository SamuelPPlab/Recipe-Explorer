import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { changeIngredientPage, clearState, ingredientFetcher } from "../redux/actions/explorePage";
import ExploreHeader from "../components/ExploreHeader";
import FlagCard from "../components/FlagCard";
import IngredientCard from "../components/IngredientCard";
import AlcoholicOptionCard from "../components/AlcoholicOptionCard";
import { Grid } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import SearchBar from "../components/SearchBar";

const ExplorePage = ({ areas, loadIngredients, ingredients, isItFood, alcoholicOptions, apiResponse }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ingredientFetcher(false));
    return () => dispatch(clearState());
  }, [loadIngredients, dispatch]);

  const length = ingredients && ingredients.length;
  const pageSize = 21;

  const paginationProps = {
    hideNextButton: true,
    color: 'primary',
    hidePrevButton: true,
    size: "large",
    count: Math.ceil(length / pageSize),
    onClick: ({ target: { innerText } }) => dispatch(changeIngredientPage(parseInt(innerText), pageSize)),
  };

  return(
    <Grid container spacing={4} style={{ width: '100%', marginTop: '30px' } }>
    <ExploreHeader />
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <SearchBar />
    </div>
      {
        areas && areas.map((area) => area !== 'Unknown' && <Grid key={area} item><FlagCard area={area} /></Grid>)
      }
      {
        ingredients && ingredients.map((ingredient) => <Grid key={ingredient} item><IngredientCard isItFood={isItFood} ingredient={ingredient} /></Grid>)
      }
      {
        alcoholicOptions && alcoholicOptions.map((option) => <Grid key={option} item><AlcoholicOptionCard option={option} /></Grid>)
      }
    <div style={{ width: '100%', padding: '30px', display: 'flex', justifyContent: 'center' }}>
      {ingredients && <Pagination {...paginationProps} /> }
    </div>
    </Grid>
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
