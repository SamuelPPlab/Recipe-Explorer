import { ButtonGroup, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';
import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Navigate } from 'react-router';
import { Button } from "@material-ui/core";
import { useTheme } from '@material-ui/styles';

const useStyles = makeStyles(() => {
  const theme = useTheme();
  const { palette: { primary, secondary } } = theme;
  return(
    {
      cardContainer: {
        width: '300px',
        height: '520px',
        display: 'flex',
        boxShadow: '4px 4px 4px grey',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundImage: `repeating-linear-gradient(-5deg, #ccc, #ccc 10px, #dbdbdb 60px, #dbdbdb 120px);`,
        border: '1px solid gray',
        '&:hover': {
          boxShadow: '10px 10px 10px grey',
        }
      },
      cardMedia: {
        width: '300px',
        height: '300px',
        marginTop: '-8px',
        transform: "skewY(-3deg)",
      },
      recipeName: {
        margin: '0',
        fontFamily: `'Russo One', sans-serif;`,
        fontSize: '2em',
        color: 'grey'
      }
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
        <h3
          className={classes.recipeName}
        >
          {name}
        </h3>
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
