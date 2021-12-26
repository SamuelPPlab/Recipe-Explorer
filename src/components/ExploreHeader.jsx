import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Navigate } from "react-router";
import { Button, Drawer, List, FormControlLabel, FormLabel, ListItem, ListItemIcon, ListItemText, Radio, RadioGroup, TextField } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import { fetchRandomRecipe } from "../redux/actions/detailPage";
import { alcoholicOptionsFetcher, areaFetcher, ingredientFetcher, ingredientSearch } from "../redux/actions/explorePage";
import { swapMainPage } from "../redux/actions/mainPage";
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

  const exploreOptionsProps = showFood ? foodExploreOptions : drinkExploreOptions;

  return(
    <div style={{ display: 'flex' }}>
      <Drawer variant="permanent" anchor="left">
        <List>
          <ListItem button onClick={() => setShowFood(false)}>
            <ListItemIcon><LocalBarIcon color="primary" /></ListItemIcon>
            <ListItemText>Explore drinks by</ListItemText>
          </ListItem>
          {
            !showFood && <RadioGroup value={selectedRadioOption} style={{ marginLeft: '40px' }} onChange={({ target: { value } }) => setSelectedRadioOption(value)}>
              {
                drinkExploreOptions.map((option) => (
                  <FormControlLabel
                    key={option}
                    control={<Radio color="primary" />}
                    label={option}
                    value={option}
                  />
                ))
              }
            </RadioGroup>
          }
          <ListItem button onClick={() => setShowFood(true)}>
            <ListItemIcon><FastfoodIcon color="primary" /></ListItemIcon>
            <ListItemText>Explore foods by</ListItemText>
          </ListItem>
          {
            showFood && <RadioGroup value={selectedRadioOption} style={{ marginLeft: '40px' }} onChange={({ target: { value } }) => setSelectedRadioOption(value)}>
              {
                foodExploreOptions.map((option) => (
                  <FormControlLabel
                    key={option}
                    control={<Radio color="primary" />}
                    label={option}
                    value={option}
                  />
                ))
              }
            </RadioGroup>
          }
        </List>
      </Drawer>
      <div>
        {
          selectedRadioOption === 'Ingredients' && !loading && <div>
            <TextField {...searchIngredientsProps} />
            <Button {...searchButtonProps} ><SearchIcon /></Button>
            <Button {...clearSearchButtonProps} />
          </div>
        }
      </div>
    </div>
  );
};

const mapStateToProps = ({ exploreReducer: { loading }, mainPageReducer: { isItFood }, detailReducer: { id } }) => ({
  loading,
  isItFood,
  id,
});

export default connect(mapStateToProps)(ExploreHeader);
