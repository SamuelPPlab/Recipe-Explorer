import React from "react";
import ExploreIcon from '@material-ui/icons/Explore';
import { Button } from "@material-ui/core";
import Tooltip from '@mui/material/Tooltip';

const ExploreButton = () => {
  const exploreButtonProps = {
    id: 'explore button',
    variant: 'contained',
    color: 'primary',
    href: '/explore',
  };

  return(
    <Tooltip title="Explore Recipes" placement="right">
      <Button {...exploreButtonProps} style={{ width: '50px', height: '50px' }}>
        <ExploreIcon fontSize="large" />
      </Button>
    </Tooltip>
  );
};

export default ExploreButton;
