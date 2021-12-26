import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Navigate } from "react-router";
import { Button, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
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
    onChange: ({ target: { value } }) => setSearchIng(value),
    variant: 'outlined'
  };

  const searchButtonProps = {
    id: 'Search Ingredient',
    onClick: () => {
      dispatch(ingredientSearch(searchIng));
      setSearchIng('');
    },
    style: {
      width: '55px',
      height: '55px'
    },
    color: 'primary',
    variant: 'contained'
  };

  const clearSearchButtonProps = {
    label: 'Clear Search Results',
    id: 'Clear Search Results',
    onClick: () => {dispatch(ingredientFetcher(showFood))},
  };

  const exploreDrinksProps = {
    id: "Explore Drinks",
    onClick: () => {
      setShowFood(false);
    },
    variant: 'contained',
    color: 'primary',
  };

  const exploreFoodsProps = {
    id: "Explore Foods",
    onClick: () => {
      setShowFood(true);
      setSearchIng('');
    },
    variant: 'contained',
    color: 'primary',
  };

  const exploreOptionsProps = showFood ? foodExploreOptions : drinkExploreOptions;

  return(
    <div>
      <Button {...exploreDrinksProps} >Explore drinks</Button>
      <Button {...exploreFoodsProps} >Explore Foods</Button>
      {
        !loading && <RadioGroup value={selectedRadioOption} onChange={({ target: { value } }) => setSelectedRadioOption(value)}>
          {
            exploreOptionsProps.map((option) => (
              <FormControlLabel
                key={option}
                control={<Radio color="primary" />}
                label={option}
                value={option}
              />
            ))
          }
        </RadioGroup>}
      {
        selectedRadioOption === 'Ingredients' && !loading && <div>
          <TextField {...searchIngredientsProps} />
          <Button {...searchButtonProps} ><SearchIcon /></Button>
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
