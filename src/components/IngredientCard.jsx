import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@material-ui/core";
import { recipesByIngredients } from "../redux/actions/mainPage";

const IngredientCard = ({ isItFood, ingredient }) => {
  const ingredientIMG = `https://www.themealdb.com/images/ingredients/${ingredient}.png`;

  const dispatch = useDispatch();

  const buttonProps = {
    onClick: () => dispatch(recipesByIngredients(isItFood, ingredient)),
    variant: 'contained',
    color: 'primary',
    size: 'large',
    style: {
      margin: '10px',
    },
  };

  return(
    <Card style={{ maxWidth: '200px', height: '410px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <CardMedia
        component="img"
        style={{ width: '200px', marginTop: '10px' }}
        image={ingredientIMG}
        alt={ingredient}
      />
      <CardContent >
        <Typography align="center" variant="h6">
          {ingredient}
        </Typography>
      </CardContent>
      <Link to="/main" style={{ textDecoration: 'none' }}>
        <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
          <Button {...buttonProps} >
            See recipes
          </Button>
        </CardActions>
      </Link>
    </Card>
  );
};

export default IngredientCard;
