import React from "react";
import ExploreIcon from '@material-ui/icons/Explore';
import { Button } from "@material-ui/core";

const ExploreButton = () => {
  const exploreButtonProps = {
    id: 'explore button',
    variant: 'contained',
    color: 'primary',
    href: '/explore',
  };

  return(
    <Button {...exploreButtonProps} style={{ width: '50px', height: '50px' }}>
      <ExploreIcon fontSize="large" />
    </Button>
  );
};

export default ExploreButton;
