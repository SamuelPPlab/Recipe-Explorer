import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Button from "./Button";
import { waitRedirect } from "../redux/actions/detailPage";

const RecomendationCard = ({ image, name, id, isItFood, handleClick }) => {
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();

  const goToRecipeButtonProps = {
    name: 'More Details',
    id: 'More Details Button',
    onClick: () => {
      handleClick();
      setRedirect(!redirect);
      dispatch(waitRedirect());
    },
  }

  return(
    <div style={{ width: '400px', textAlign: 'center' }}>
      <img src={image} style={{ width: '400px' }} alt={name} />
      <h3 style={{ textAlign: 'center' }} >{name}</h3>
      <Link to={isItFood ? `/drinks/${id}` : `/foods/${id}`}>
        <Button {...goToRecipeButtonProps} />
      </Link>
    </div>
  );
}

export default RecomendationCard;
