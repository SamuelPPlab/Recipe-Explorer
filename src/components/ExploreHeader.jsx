import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Navigate } from "react-router";
import { Button, Drawer, List, Typography } from "@material-ui/core";
import { fetchRandomRecipe } from "../redux/actions/detailPage";
import { alcoholicOptionsFetcher, areaFetcher, ingredientFetcher } from "../redux/actions/explorePage";
import { swapMainPage } from "../redux/actions/mainPage";
import ListMenuItem from "./ListMenuItem";
import LocalBarIcon from '@material-ui/icons/LocalBar';
import FastfoodIcon from '@material-ui/icons/Fastfood';

const ExploreHeader = ({ isItFood, id }) => {
  const [selectedRadioOption, setSelectedRadioOption] = useState('Ingredients');
  const [redirectToDrink, setRedirectToDrink] = useState(false);
  const [redirectToFood, setRedirectToFood] = useState(false);

  const dispatch = useDispatch();

  const foodExploreOptions = ['Meats and more', 'Area', 'Get random food'];
  const drinkExploreOptions = ['Fruits and more', 'Alcohol Options', 'Get random drink'];

  useEffect(() => {
    switch(selectedRadioOption) {
      case drinkExploreOptions[0]:
        dispatch(ingredientFetcher());
      break;
      case drinkExploreOptions[1]:
        dispatch(alcoholicOptionsFetcher());
      break;
      case drinkExploreOptions[2]:
        setRedirectToDrink(true);
        dispatch(fetchRandomRecipe(false));
      break;
      case foodExploreOptions[0]:
        dispatch(ingredientFetcher(true));
      break;
      case foodExploreOptions[1]:
        dispatch(areaFetcher());
      break;
      case foodExploreOptions[2]:
        setRedirectToFood(true);
        dispatch(fetchRandomRecipe(true));
      break;
      default:
        return null;
    }
  }, [selectedRadioOption, isItFood, dispatch]);

  if(redirectToDrink) return <Navigate to={`/drinks/${id}`} />;
  if(redirectToFood) return <Navigate to={`/foods/${id}`} />;

  return(
    <div style={{ display: 'flex', width: '100%', background: 'red' }}>
      <Drawer variant="permanent" anchor="left">
        <Typography variant="h4" align="center" style={{ background: '#e9ecef', paddingTop: '10px', paddingBottom: '10px', borderBottom: '2px solid #adb5bd' }}>
          Options
        </Typography>
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
    </div>
  );
};

const mapStateToProps = ({ exploreReducer: { loading }, mainPageReducer: { isItFood }, detailReducer: { id } }) => ({
  loading,
  isItFood,
  id,
});

export default connect(mapStateToProps)(ExploreHeader);
