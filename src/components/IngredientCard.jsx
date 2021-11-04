import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { recipesByIngredients } from "../redux/actions/mainPage";

const IngredientCard = ({ isItFood, ingredient, loadSelectedRecipes }) => {
  return(
    <div style={{ margin: '50px', textAlign: 'center' }}>
      <Link to='/main'>
        <button onClick={() => loadSelectedRecipes(isItFood, ingredient)}>
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

const mapDispatchToProps = (dispatch) => ({
  loadSelectedRecipes: (isItFood, ingredient) => (dispatch(recipesByIngredients(isItFood, ingredient))),
});

export default connect(null, mapDispatchToProps)(IngredientCard);
