import { ButtonGroup, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';
import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Navigate } from 'react-router';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import { Button } from "@material-ui/core";
import { useTheme } from '@material-ui/styles';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core';
import { orange, teal } from '@material-ui/core/colors';

const theme = createTheme({
  palette: {
    primary: orange,
    secondary: teal,
  }
});

const useStyles = makeStyles(() => {
  return(
    {
      cardContainer: {
        width: '300px',
        height: ({ isItFood }) => isItFood ? '550px' : '505px',
        display: 'flex',
        boxShadow: '4px 4px 4px grey',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundImage: `repeating-linear-gradient(-5deg, #ccc, #ccc 10px, #dbdbdb 60px, #dbdbdb 120px);`,
        border: '1px solid gray',
        '&:hover': {
          boxShadow: '10px 10px 10px grey',
        },
      },
      cardMedia: {
        width: '300px',
        height: '300px',
        marginTop: '-8px',
        transform: "skewY(-3deg)",
      },
      recipeName: {
        fontSize: ({ nameSize }) => nameSize > 21 ? '1.5em' : '2em',
        margin: '0',
        fontFamily: `'Russo One', sans-serif;`,
        color: '#424242',
      }
    }
  );
});

const RecipeCard = ({ name, image, id, directory, onClick = null, children, isItFood, redirectOnClick = true }) => {
  const [redirectDetails, setRedirectDetails] = useState(false);
  const [redirectProgress, setRedirectProgress] = useState(false);

  const classes = useStyles({ isItFood, nameSize: name.length });

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
    <ThemeProvider theme={theme}>
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
            <Button {...startCookingRecipeProps} ><LocalDiningIcon />Start cooking</Button>
          </ButtonGroup>
        </CardActions>
      </Card>
    </ThemeProvider>
  );
};

export default RecipeCard;
