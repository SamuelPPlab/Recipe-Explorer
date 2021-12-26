import React, { useEffect, useState } from "react";
import { fetchCategories } from "../APIintegration/categories";
import { useDispatch } from "react-redux";
import { Button, ButtonGroup } from "@material-ui/core";
import Loading from "./Loading";
import { categorySelector } from "../redux/actions/mainPage";

const Categories = ({ isItFood }) => {
  const [categoriesOptions, setCategoriesOptions] = useState([]);

  useEffect(() => {
    fetchCategories(isItFood, setCategoriesOptions);
  }, [isItFood]);

  const dispatch = useDispatch();

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
            onClick={() => dispatch(categorySelector(isItFood, category))}
          >
            {category}
          </Button>
        ))
      }
    </div>
  )
};

export default Categories;
