import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { recipesByIngredients } from "../redux/actions/mainPage";

const IngredientCard = ({ isItFood, ingredient, loadSelectedRecipes }) => {
  const ingredientIMGProps = {
    src: `https://www.themealdb.com/images/ingredients/${ingredient}.png`,
    style: { width: '200px' },
  };

  return(
    <div style={{ margin: '50px', textAlign: 'center' }}>
      <Link to='/main'>
        <button onClick={() => loadSelectedRecipes(isItFood, ingredient)}>
          <img alt={ingredient} {...ingredientIMGProps} />
          <h3>{ingredient}</h3>
        </button>
      </Link>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  loadSelectedRecipes: (isItFood, ingredient) => (dispatch(recipesByIngredients(isItFood, ingredient))),
});

export default connect(null, mapDispatchToProps)(IngredientCard);
