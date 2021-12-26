import { ButtonGroup, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { Navigate } from 'react-router';
import { Button } from "@material-ui/core";

const RecipeCard = ({ name, image, id, directory, onClick = null, children, redirectOnClick = true }) => {
  const [redirectDetails, setRedirectDetails] = useState(false);
  const [redirectProgress, setRedirectProgress] = useState(false);

  if (redirectDetails && redirectOnClick) return <Navigate to={`${directory}/${id}`} />;
  if (redirectProgress) return <Navigate to={`${directory}/${id}/in-progress`} />;
  
  const handleClick = () => {
    setRedirectDetails(true);
    onClick && onClick();
  };

  const seeDetailsProps = {
    id: 'See Details Props',
    onClick: () => handleClick(),
    variant: 'contained',
    color: 'primary'
  };

  const startCookingRecipeProps = {
    id: 'Start Cooking Recipe',
    onClick: () => setRedirectProgress(true),
    variant: 'contained',
    color: 'primary',
  };

  return (
    <Card style={{ maxWidth: '300px', height: '505px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <CardMedia
        style={{ width: '300px', height: '300px' }}
        component="img"
        image={image}
        alt={name}
      />
      <CardContent>
        <Typography
          align='center'
          variant="h5"
        >
          {name.toString()}
        </Typography>
      </CardContent>
      <CardActions>
        <ButtonGroup fullWidth>
          <Button {...seeDetailsProps} >See details</Button>
          <Button {...startCookingRecipeProps} >Start cooking</Button>
        </ButtonGroup>
      </CardActions>
    </Card>
  );
};

export default RecipeCard;
