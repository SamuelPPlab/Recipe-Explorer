import React from "react";
import ShareMenu from "./ShareMenu";

const DoneRecipeCard = ({ timesCooked, datesCooked, id, name, image, isFood }) => {
  const pathname = isFood ? `/foods/${id}` : `/drinks/${id}`;
  return(
    <div>
      <img src={image} alt={name} style={{height: '300px'}} />
      <h1>{name}</h1>
      <p>Times you cooked this recipe: {timesCooked}</p>
      <p>Days you cooked this recipe: {datesCooked}</p>
      <ShareMenu id={id} pathname={pathname} />
    </div>
  );
}

export default DoneRecipeCard;
