import React, { useState } from "react";
import blackHeartIcon from "../images/blackHeartIcon.svg";
import whiteHeartIcon from "../images/whiteHeartIcon.svg";
import { getLocalStorageKey, setFavorite } from "../services/localStorage";
import Button from "./Button";

const FavoriteButton = ({ id }) => {
  const currentRecipe = getLocalStorageKey('inProgressRecipes');
  const favorite = currentRecipe[id] ? currentRecipe[id].favorite : false;
  const whiteHeart = <img src={whiteHeartIcon} alt="white heart" style={{ width: '50px'}} />;
  const blackHeart = <img src={blackHeartIcon} alt="black heart" style={{ width: '50px'}} />;
  const [fav, setFav] = useState(favorite);
  return (
    <Button
      type="button"
      id="favorite"
      name={fav ? blackHeart : whiteHeart}
      onClick={ () => {
        setFavorite(id, favorite);
        setFav(!fav);
      } }
    />
  )
}

export default FavoriteButton;
