import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Redirect } from "react-router";
import Button from "../components/Button";
import { fetchRandomRecipe } from "../redux/actions/detailPage";
import { alcoholicOptionsFetcher, areaFetcher, glassFetcher, ingredientFetcher, ingredientSearch } from "../redux/actions/explorePage";
import { swapMainPage } from "../redux/actions/mainPage";
import Input from "./Input";
import RadioButton from "./RadioButton";

const ExploreHeader = ({ swapMain, ingredients, area, glasses, alcoholOptions, loading, isItFood, surprise, id }) => {
  const [showFood, setShowFood] = useState(false);
  const [selectedRadioOption, setSelectedRadioOption] = useState('Ingredients');
  const [redirect, setRedirect] = useState(false);
  const [searchIng, setSearchIng] = useState('');

  const dispatch = useDispatch();

  const foodExploreOptions = ['Ingredients', 'Area', 'Surprise me'];
  const drinkExploreOptions = ['Ingredients', 'Alcohol Options', 'Surprise me'];

  useEffect(() => {
    if (showFood !== isItFood) {
      swapMain();
    }

    switch(selectedRadioOption) {
      case 'Ingredients':
        ingredients(showFood);
      break;
      case 'Area':
        area();
      break;
      case 'Alcohol Options':
        alcoholOptions();
      break;
      case 'Glasses':
        glasses();
      break;
      case 'Surprise me':
        setRedirect(true);
        surprise(showFood);
      break;
      default:
        return null;
    }
  }, [selectedRadioOption, showFood, alcoholOptions, area, glasses, ingredients, surprise, isItFood, swapMain]);

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
    onClick: () => {ingredients(showFood)},
  };

  if(redirect && id) return <Redirect to={isItFood ? `/foods/${id}` : `/drinks/${id}`} />

  return(
    <div>
      <Button
        id="Explore Drinks"
        name="Explore Drinks"
        onClick={ () => {
          setShowFood(false);
        } }
      />
      <Button
        id="Explore Foods"
        name="Explore Foods"
        onClick={ () => {
          setShowFood(true);
          setSearchIng('');
        } }
      />
      { 
        !loading && <RadioButton
          options={showFood ? foodExploreOptions : drinkExploreOptions}
          selectedFilter={selectedRadioOption}
          setSelectedFilter={setSelectedRadioOption}
        />
      }
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

const mapDispatchToProps = (dispatch) => ({
  swapMain: () => dispatch(swapMainPage()),
  ingredients: (showFood) => (dispatch(ingredientFetcher(showFood))),
  area:  () => dispatch(areaFetcher()),
  glasses: () => dispatch(glassFetcher()),
  alcoholOptions: () => dispatch(alcoholicOptionsFetcher()),
  surprise: (isItFood) => dispatch(fetchRandomRecipe(isItFood))
});

const mapStateToProps = ({ exploreReducer: { loading }, mainPageReducer: { isItFood }, detailReducer: { id } }) => ({
  loading,
  isItFood,
  id,
});

export default connect(mapStateToProps, mapDispatchToProps)(ExploreHeader);
