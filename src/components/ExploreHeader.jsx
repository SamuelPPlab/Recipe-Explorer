import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Navigate } from "react-router";
import Button from "../components/Button";
import { fetchRandomRecipe } from "../redux/actions/detailPage";
import { alcoholicOptionsFetcher, areaFetcher, ingredientFetcher, ingredientSearch } from "../redux/actions/explorePage";
import { swapMainPage } from "../redux/actions/mainPage";
import Input from "./Input";
import RadioButton from "./RadioButton";

const ExploreHeader = ({ loading, isItFood, id }) => {
  const [showFood, setShowFood] = useState(false);
  const [selectedRadioOption, setSelectedRadioOption] = useState('Ingredients');
  const [redirect, setRedirect] = useState(false);
  const [searchIng, setSearchIng] = useState('');

  const dispatch = useDispatch();

  const foodExploreOptions = ['Ingredients', 'Area', 'Surprise me'];
  const drinkExploreOptions = ['Ingredients', 'Alcohol Options', 'Surprise me'];

  useEffect(() => {
    if (showFood !== isItFood) {
      dispatch(swapMainPage());
    }

    switch(selectedRadioOption) {
      case 'Ingredients':
        dispatch(ingredientFetcher(showFood));
      break;
      case 'Area':
        dispatch(areaFetcher());
      break;
      case 'Alcohol Options':
        dispatch(alcoholicOptionsFetcher());
      break;
      case 'Surprise me':
        setRedirect(true);
        dispatch(fetchRandomRecipe(isItFood));
      break;
      default:
        return null;
    }
  }, [selectedRadioOption, showFood, isItFood, dispatch]);

  if(redirect && id) return <Navigate to={isItFood ? `/foods/${id}` : `/drinks/${id}`} />;

  const searchIngredientsProps = {
    name: 'Search Ingredient',
    fieldValue: searchIng,
    setFieldValue: setSearchIng,
  };

  const searchButtonProps = {
    name: 'Search',
    id: 'Search Ingredient',
    onClick: () => {
      dispatch(ingredientSearch(searchIng));
      setSearchIng('');
    }
  };

  const clearSearchButtonProps = {
    name: 'Clear Search Results',
    id: 'Clear Search Results',
    onClick: () => {dispatch(ingredientFetcher(showFood))},
  };

  const exploreDrinksProps = {
    id: "Explore Drinks",
    name: "Explore Drinks",
    onClick: () => {
      setShowFood(false);
    },
  };

  const exploreFoodsProps = {
    id: "Explore Foods",
    name: "Explore Foods",
    onClick: () => {
      setShowFood(true);
      setSearchIng('');
    },
  };

  const exploreOptionsProps = {
    options: showFood ? foodExploreOptions : drinkExploreOptions,
    selectedFilter: selectedRadioOption,
    setSelectedFilter: setSelectedRadioOption,
  };

  return(
    <div>
      <Button {...exploreDrinksProps} />
      <Button {...exploreFoodsProps} />
      {!loading && <RadioButton {...exploreOptionsProps} />}
      {
        selectedRadioOption === 'Ingredients' && !loading && <div>
          <Input {...searchIngredientsProps} />
          <Button {...searchButtonProps} />
          <Button {...clearSearchButtonProps} />
        </div>
      }
    </div>
  );
};

const mapStateToProps = ({ exploreReducer: { loading }, mainPageReducer: { isItFood }, detailReducer: { id } }) => ({
  loading,
  isItFood,
  id,
});

export default connect(mapStateToProps)(ExploreHeader);
