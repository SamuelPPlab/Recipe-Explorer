import React, { useEffect, useState } from "react";
import { Pagination } from "@material-ui/lab";
import { connect, useDispatch } from "react-redux";
import { Button, Grid } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import { fetchSixRandomRecipes, setSuggestionsBasedOnUser } from "../redux/actions/detailPage";
import { swapMainPage } from "../redux/actions/mainPage";
import Loading from "./Loading";
import RecomendationCard from "./RecomendationCard";

const Recomendations = ({ recomendations, isItFood, foods, drinks }) => {

  const { pathname } = useLocation();
  
  const pathnameIsFood = pathname.includes('food');

  const [recipesShowing, setRecipesShowing] = useState([]);
  const [surpriseMe, setSurpriseMe] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if(recomendations) {
      setRecipesShowing(recomendations.slice(0, 2));
    }
  }, [recomendations]);

  const getRandomArrayItem = (array, index) => (array[index]);

  useEffect(() => {
    if(surpriseMe) {
      dispatch(fetchSixRandomRecipes(!isItFood));
    }

    if(!surpriseMe && foods && drinks) {
      const recomendations = [];
      let suggestionPool = isItFood ? drinks : foods;
      const removeItemfromSuggestion = (index) => (
        suggestionPool = suggestionPool.filter((currentItem) =>
          (currentItem !== suggestionPool[index]))
      );
      for(let i = 0; i < 6; i += 1) {
        const randomIndex = Math.floor(Math.random() * suggestionPool.length);
        recomendations.push(getRandomArrayItem(suggestionPool, randomIndex));
        removeItemfromSuggestion(randomIndex);
      }
      dispatch(setSuggestionsBasedOnUser(recomendations));
    }
  }, [pathnameIsFood, isItFood, surpriseMe, foods, drinks, dispatch]);

  const changeRecipes = (page) => {
    setRecipesShowing(recomendations.slice((page - 1) * 2, page * 2));
  };

  if (!recomendations) return <Loading />;

  const length = recomendations.length;

  return(
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setSurpriseMe(!surpriseMe)}
      >
        {surpriseMe ? "See chosen suggestions" : "See random suggestions"}
      </Button>
      <Grid container spacing={2}>
        {
          recipesShowing.map(({ name, image, isAlcoholic, category, id }) => (
            <Grid item key={name}>
              <RecomendationCard
                id={id}
                isItFood={isItFood}
                name={name}
                image={image}
                isAlcoholic={isAlcoholic}
                category={category}
                handleClick={() => dispatch(swapMainPage())}
              />
            </Grid>
          ))
        }
      </Grid>
      <Pagination size="large" hidePrevButton hideNextButton count={Math.ceil(length / 2)} onClick={({ target: { innerText } }) => changeRecipes(parseInt(innerText))} />
    </div>
  );
};

const mapStateToProps = ({ detailReducer: { recomendations }, mainPageReducer: { isItFood }, suggestionPageReducer: { suggestionPool: { drinks, foods } }, }) => ({
  recomendations,
  isItFood,
  drinks,
  foods,
});

export default connect(mapStateToProps)(Recomendations);
