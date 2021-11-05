import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { recipesByIngredients } from "../redux/actions/mainPage";

const IngredientCard = ({ isItFood, ingredient }) => {
  const dispatch = useDispatch();
  return(
    <div style={{ margin: '50px', textAlign: 'center' }}>
      <Link to='/main'>
        <button onClick={(ingredient) => (dispatch(recipesByIngredients(isItFood, ingredient)))}>
          <img
            src={`https://www.themealdb.com/images/ingredients/${ingredient}.png`}
            alt={ingredient}
            style={{ width: '200px' }}
          />
          <h3>{ingredient}</h3>
        </button>
      </Link>
    </div>
  );
};

export default IngredientCard;
