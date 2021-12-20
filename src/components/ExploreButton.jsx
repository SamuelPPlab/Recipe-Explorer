import React, { useState } from "react";
import { Navigate } from "react-router";
import exploreIcon from '../images/exploreIcon.svg';
import Button from "./Button";

const ExploreButton = () => {
  const exploreImage = <img src={exploreIcon} alt="explore Icon" style={{ width: '50px' }} />;
  const [goToExplore, setGoToExplore] = useState(false);
  if(goToExplore) return <Navigate to='/explore' />;

  const exploreButtonProps = {
    name: exploreImage,
    id: 'explore button',
    onClick: () => setGoToExplore(!goToExplore),
  };

  return(
    <Button {...exploreButtonProps} />
  );
};

export default ExploreButton;
