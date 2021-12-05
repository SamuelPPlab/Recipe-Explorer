import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { changeIngredientPage, clearState, ingredientFetcher } from "../redux/actions/explorePage";
import ExploreHeader from "../components/ExploreHeader";
import FlagCard from "../components/FlagCard";
import IngredientCard from "../components/IngredientCard";
import AlcoholicOptionCard from "../components/AlcoholicOptionCard";
import Paginator from "../components/Paginator";
import BackToMain from "../components/BackToMain";

const ExplorePage = ({ areas, loadIngredients, ingredients, isItFood, alcoholicOptions, apiResponse }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ingredientFetcher(false));
    return () => dispatch(clearState());
  }, [loadIngredients, dispatch]);

  const length = apiResponse && apiResponse.length;

  return(
    <div>
      <BackToMain />
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
