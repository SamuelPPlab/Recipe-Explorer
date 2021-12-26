import React from "react";
import { useDispatch } from "react-redux";
import { Button, Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import { recipesByIngredients } from "../redux/actions/mainPage";

const IngredientCard = ({ isItFood, ingredient, loadSelectedRecipes }) => {
  const ingredientIMG = `https://www.themealdb.com/images/ingredients/${ingredient}.png`;

  const dispatch = useDispatch();

  const buttonProps = {
    onClick: () => dispatch(recipesByIngredients(isItFood, ingredient)),
    variant: 'contained',
    color: 'primary'
  }

  return(
    <Card>
      <Button {...buttonProps} >
        <CardMedia
          component="img"
          style={{ width: '200px' }}
          image={ingredientIMG}
          alt={ingredient}
        />
        <CardContent align="center" variant="h5">
          <Typography>
            {ingredient}
          </Typography>
        </CardContent>
      </Button>
    </Card>
  );
};

export default IngredientCard;
