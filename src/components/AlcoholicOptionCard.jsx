import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { recipesByAlcoholOption } from "../redux/actions/mainPage";
import alcoholIcon from "../images/alcoholIcon.png";
import noAlcoholIcon from "../images/noAlcoholIcon.png";
import optionalAlcohol from "../images/optionalAlcohol.png";
import { Button, Card, CardContent, CardMedia, Typography } from "@material-ui/core";

const AlcoholicOptionCard = ({ option, getRecipes }) => {
  const options = {
    'Alcoholic': alcoholIcon,
    'Non alcoholic': noAlcoholIcon,
    'Optional alcohol': optionalAlcohol,
  };

  const dispatch = useDispatch();

  const goToRecipesProps = {
    onClick: () => dispatch(recipesByAlcoholOption(option)),
    variant: "contained",
    color: 'primary',
    style: {
      margin: '10px',
      width: '280px',
    },
  };

  return(
    <Card style={{ maxWidth: '300px' }}>
      <CardMedia
        image={options[option]}
        alt={option}
        component="img"
      />
      <CardContent>
        <Typography align="center" variant="h6">
          {option}
        </Typography>
      </CardContent>
    <Link to='/main' style={{ textDecoration: 'none' }}>
      <Button {...goToRecipesProps} >
        See Recipes
      </Button>
    </Link>
    </Card>
  );
};

export default AlcoholicOptionCard;
