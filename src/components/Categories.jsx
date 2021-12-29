import React, { useEffect, useState } from "react";
import { fetchCategories } from "../APIintegration/categories";
import { useDispatch } from "react-redux";
import { Button, Grid } from "@material-ui/core";
import Loading from "./Loading";
import { categorySelector, setSelectedCategory } from "../redux/actions/mainPage";
import { connect } from "react-redux";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(
  () => (
    {
      categoriesContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        padding: '20px'
      },
    }
  )
);

const Categories = ({ isItFood, category }) => {
  const classes = useStyles();

  const [categoriesOptions, setCategoriesOptions] = useState([]);

  useEffect(() => {
    fetchCategories(isItFood, setCategoriesOptions);
  }, [isItFood]);

  const dispatch = useDispatch();

  const handleClick = (newCategory) => {
    dispatch(setSelectedCategory(newCategory));
    dispatch(categorySelector(isItFood, newCategory));
  };

  if(categoriesOptions.length < 1) return <Loading />;

  return(
    <Grid container spacing={2} className={classes.categoriesContainer}>
      {
        categoriesOptions.map((currentCategory) => (
          <Grid key={currentCategory} item>
            <Button
              color="primary"
              variant={currentCategory === category ? "contained" : "outlined"}
              id={currentCategory}
              onClick={() => handleClick(currentCategory)}
            >
              {currentCategory}
            </Button>
          </Grid>
        ))
      }
    </Grid>
  )
};

const mapStateToProps = ({ mainPageReducer: { category } }) => ({
  category,
});

export default connect(mapStateToProps)(Categories);
