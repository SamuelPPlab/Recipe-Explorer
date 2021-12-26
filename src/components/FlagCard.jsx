import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { recipesByAreaFetcher } from "../redux/actions/mainPage";
import { countryFlags } from "../services/countryFlags";
import { Card, CardContent, CardMedia, Typography, Button, CardActions } from "@material-ui/core";

const FlagCard = ({ area, isItFood }) => {
  const dispatch = useDispatch();
  const flagSource = countryFlags[area];
  
  const getRecipeProps = {
    onClick: () => dispatch(recipesByAreaFetcher(area, isItFood)),
    variant: 'contained',
    color: 'primary',
    style: {
      marginBottom: '10px'
    }
  };

  return(
    <Card style={{ maxWidth: '200px', height: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <CardMedia
        alt={`${area} flag`}
        image={flagSource}
        component="img"
      />
      <CardContent>
        <Typography align="center" variant="h6">
          {area} food
        </Typography>
      </CardContent>
      <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
        <Link to="/main" style={{ textDecoration: 'none' }}>
          <Button {...getRecipeProps}>
            See Recipes
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default FlagCard;
