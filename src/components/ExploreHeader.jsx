import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Navigate } from "react-router";
import { Button, Drawer, List, TextField } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import { fetchRandomRecipe } from "../redux/actions/detailPage";
import { alcoholicOptionsFetcher, areaFetcher, ingredientFetcher, ingredientSearch } from "../redux/actions/explorePage";
import { swapMainPage } from "../redux/actions/mainPage";
import ListMenuItem from "./ListMenuItem";
import LocalBarIcon from '@material-ui/icons/LocalBar';
import FastfoodIcon from '@material-ui/icons/Fastfood';

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

  return(
    <div style={{ display: 'flex' }}>
      <Drawer variant="permanent" anchor="left">
        <List>
          <ListMenuItem
            icon={<LocalBarIcon color="primary" />}
            itemText="Explore drinks by"
            currentOption={selectedRadioOption}
            setCurrentOption={setSelectedRadioOption}
            options={drinkExploreOptions}
          />
          <ListMenuItem
            icon={<FastfoodIcon color="primary" />}
            itemText="Explore foods by"
            currentOption={selectedRadioOption}
            setCurrentOption={setSelectedRadioOption}
            options={foodExploreOptions}
          />
        </List>
      </Drawer>
        {
          selectedRadioOption === 'Ingredients' && !loading && <div style={{ marginLeft: '30%' }}>
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
