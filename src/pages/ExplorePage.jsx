import React, { useEffect } from "react";
import { connect } from "react-redux";
import { changeIngredientPage, clearState, ingredientFetcher, ingredientSearch } from "../redux/actions/explorePage";
import ExploreHeader from "../components/ExploreHeader";
import FlagCard from "../components/FlagCard";
import IngredientCard from "../components/IngredientCard";
import AlcoholicOptionCard from "../components/AlcoholicOptionCard";
import Paginator from "../components/Paginator";

const ExplorePage = ({ areas, loadIngredients, ingredients, isItFood, alcoholicOptions, clearState, newPage, apiResponse }) => {

  useEffect(() => {
    
    loadIngredients();
    return () => clearState();
  }, [loadIngredients, clearState]);

  const length = apiResponse && apiResponse.length;

  return(
    <div>
      <ExploreHeader />
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {
          areas && areas.map((area) => area !== 'Unknown' && <FlagCard key={area} area={area} />)
        }
        {
          ingredients && ingredients.map((ingredient) => <IngredientCard key={ingredient} isItFood={isItFood} ingredient={ingredient} />)
        }
        {
          alcoholicOptions && alcoholicOptions.map((option) => <AlcoholicOptionCard key={option} option={option} />)
        }
      </div>
      {ingredients && <Paginator pageChanger={newPage} length={length} />}
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

const mapDispatchToProps = (dispatch) => ({
  loadIngredients: () => dispatch(ingredientFetcher(false)),
  clearState: () => dispatch(clearState()),
  newPage: (newPage) => dispatch(changeIngredientPage(newPage)),
  searchIngredient: (query) => ingredientSearch(query),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExplorePage);
