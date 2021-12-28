import { ButtonGroup, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Navigate } from 'react-router';
import { Button } from "@material-ui/core";
import { useTheme } from '@material-ui/styles';

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return(
    {
      cardContainer: {
        maxWidth: '300px',
        height: '505px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: 'red'
      },
      cardMedia: {
        width: '300px',
        height: '300px',
        marginTop: '-8px',
        transform: "skewY(-3deg)",
      },
      
    }
  )
});

const RecipeCard = ({ name, image, id, directory, onClick = null, children, isItFood, redirectOnClick = true }) => {
  const [redirectDetails, setRedirectDetails] = useState(false);
  const [redirectProgress, setRedirectProgress] = useState(false);

  const classes = useStyles(isItFood);

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
  };

  const startCookingRecipeProps = {
    id: 'Start Cooking Recipe',
    onClick: () => setRedirectProgress(true),
    variant: 'contained',
  };

  return (
    <Card className={classes.cardContainer}>
      <CardMedia
        className={classes.cardMedia}
        component="img"
        image={image}
        alt={name}
      />
      <CardContent>
        <Typography
          align='center'
          variant="h5"
        >
          {name}
        </Typography>
      </CardContent>
      <CardActions>
        {children}
        <ButtonGroup color={isItFood ? 'primary' : 'secondary'} fullWidth>
          <Button {...seeDetailsProps} >See details</Button>
          <Button {...startCookingRecipeProps} >Start cooking</Button>
        </ButtonGroup>
      </CardActions>
    </Card>
  );
};

export default RecipeCard;
