import React from "react";
import { useDispatch } from "react-redux";
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

  const dispatch = useDispatch();

  return(
    <div style={{ margin: '50px', textAlign: 'center' }}>
      <Link to='/main'>
        <button onClick={() => dispatch(recipesByAlcoholOption(option))}>
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

export default AlcoholicOptionCard;
