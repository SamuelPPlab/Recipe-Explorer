import React, { useEffect, useState } from "react";
import { fetchCategories } from "../APIintegration/categories";
import { useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import Loading from "./Loading";
import { categorySelector, setSelectedCategory } from "../redux/actions/mainPage";
import { connect } from "react-redux";

const Categories = ({ isItFood, category }) => {
  const [categoriesOptions, setCategoriesOptions] = useState([]);

  useEffect(() => {
    fetchCategories(isItFood, setCategoriesOptions);
  }, [isItFood]);

  const dispatch = useDispatch();

  const handleClick = (category) => {
    dispatch(setSelectedCategory(category));
    dispatch(categorySelector(isItFood, category));
  };

  if(categoriesOptions.length < 1) return <Loading />;

  return(
    <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', marginTop: '20px', marginBottom: '20px' }}>
      {
        categoriesOptions.map((category) => (
          <Button
            color="primary"
            variant="contained"
            key={category}
            id={category}
            onClick={() => handleClick(category)}
          >
            {category}
          </Button>
        ))
      }
    </div>
  )
};

const mapStateToProps = ({ mainPageReducer: { category } }) => ({
  category,
});

export default connect(mapStateToProps)(Categories);
