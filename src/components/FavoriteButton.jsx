import React, { useState } from "react";
import { getLocalStorageKey, setFavorite } from "../services/localStorage";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Button } from "@material-ui/core";

const FavoriteButton = ({ id }) => {
  const currentRecipe = getLocalStorageKey('inProgressRecipes');
  const favorite = currentRecipe[id] ? currentRecipe[id].favorite : false;

  const [fav, setFav] = useState(favorite);

  return (
    <Button
      onClick={() => {
        setFavorite(id, favorite);
        setFav(!fav);
      }}
      color="primary"
      variant="outlined"
    >
      {favorite ? <FavoriteIcon color="error" fontSize="large" /> : <FavoriteBorderIcon color="error" fontSize="large" />}
    </Button>
  );
};

export default FavoriteButton;
