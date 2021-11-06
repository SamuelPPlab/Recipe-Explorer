import React, { useEffect, useState } from "react";
import { fetchCategories } from "../APIintegration/categories";
import { useDispatch } from "react-redux";
import Button from "./Button";
import Loading from "./Loading";
import { categorySelector } from "../redux/actions/mainPage";

const Categories = ({ isItFood }) => {
  const [categoriesOptions, setCategoriesOptions] = useState([]);

  useEffect(() => {
    fetchCategories(isItFood, setCategoriesOptions);
  }, [isItFood]);

  const dispatch = useDispatch();
  if(categoriesOptions.length < 1) return <Loading />
  return(
    <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
      {
        categoriesOptions.map((category) => (
          <Button
            key={category}
            id={category}
            name={category}
            onClick={() => dispatch(categorySelector(isItFood, category))}
          />
        ))
      }
    </div>
  );
};

export default Categories;
