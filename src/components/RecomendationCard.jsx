import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Card, CardContent, CardMedia, Typography, Button, CardActions } from "@material-ui/core";
import { waitRedirect } from "../redux/actions/detailPage";

const RecomendationCard = ({ image, name, id, isItFood, handleClick }) => {
  const dispatch = useDispatch();

  const goToRecipeButtonProps = {
    href: isItFood ? `/drinks/${id}` : `/foods/${id}`,
    id: 'More Details Button',
    onClick: () => {
      handleClick();
      dispatch(waitRedirect());
    },
    variant: "contained",
    color: "primary",
    fullWidth: true,
  };

  return(
    <Card style={{ width: '400px', textAlign: 'center' }}>
      <CardMedia
        component="img"
        alt={name}
        image={image}
      />
      <CardContent>
        <Typography variant="h5">
          {name}
        </Typography>
      </CardContent>
      <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
        <Button {...goToRecipeButtonProps}>
          More details
        </Button>
      </CardActions>
    </Card>
  );
}

export default RecomendationCard;
