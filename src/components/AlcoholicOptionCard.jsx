import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { recipesByAlcoholOption } from "../redux/actions/mainPage";
import alcoholIcon from "../images/alcoholIcon.png";
import noAlcoholIcon from "../images/noAlcoholIcon.png";
import optionalAlcohol from "../images/optionalAlcohol.png";

const AlcoholicOptionCard = ({ option, getRecipes }) => {
  const options = {
    'Alcoholic': alcoholIcon,
    'Non alcoholic': noAlcoholIcon,
    'Optional alcohol': optionalAlcohol,
  };

  return(
    <div style={{ margin: '50px', textAlign: 'center' }}>
      <Link to='/main'>
        <button onClick={() => getRecipes(option)}>
          <img
            src={options[option]}
            alt={option}
            style={{ width: '200px' }}
          />
          <h3>{option}</h3>
        </button>
      </Link>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getRecipes: (option) => dispatch(recipesByAlcoholOption(option)),
});

export default connect(null, mapDispatchToProps) (AlcoholicOptionCard);
