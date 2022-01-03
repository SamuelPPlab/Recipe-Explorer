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
  const [redirect, setRedirect] = useState(false);

  const dispatch = useDispatch();

  const foodExploreOptions = ['Spices and more', 'Area', 'Surprise me'];
  const drinkExploreOptions = ['Ingredients', 'Alcohol Options', 'Surprise me'];

  useEffect(() => {


    switch(selectedRadioOption) {
      case 'Ingredients':
        dispatch(ingredientFetcher());
      break;
      case 'Spices and more':
        dispatch(ingredientFetcher(true));
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
  }, [selectedRadioOption, isItFood, dispatch]);

  if(redirect && id) return <Navigate to={isItFood ? `/foods/${id}` : `/drinks/${id}`} />;

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
