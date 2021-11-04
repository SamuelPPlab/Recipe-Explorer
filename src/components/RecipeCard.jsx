import React, { useState } from 'react';
import { Redirect } from 'react-router';
import Button from './Button';

const RecipeCard = ({ name, image, id, directory, onClick = null, children, redirectOnClick = true }) => {
  const [redirectDetails, setRedirectDetails] = useState(false);
  const [redirectProgress, setRedirectProgress] = useState(false);

  if (redirectDetails && redirectOnClick) return <Redirect to={`${directory}/${id}`} />;
  if (redirectProgress) return <Redirect to={`${directory}/${id}/in-progress`} />;
  
  const handleClick = () => {
    setRedirectDetails(true);
    onClick && onClick();
  };

  const seeDetailsProps = {
    name: 'See Details',
    id: 'See Details Props',
    onClick: () => handleClick(),
  };

  const startCookingRecipeProps = {
    name: 'Start Cooking Recipe',
    id: 'Start Cooking Recipe',
    onClick: () => setRedirectProgress(true),
  }

  return (
    <div className="recipe-card" style={{ width: '300px', margin: '20px', textAlign: 'center' }} >
      <img
        style={{ height: '300px' }}
        src={image}
        alt="Foto da receita"
      />
      <div>
        <h5>{name}</h5>
        <Button {...seeDetailsProps} />
      </div>
      <div>
        {children}
      </div>
      <Button {...startCookingRecipeProps} />
    </div>
  );
}

export default RecipeCard;
