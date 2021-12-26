import React from "react";
import SettingsIcon from '@material-ui/icons/Settings';
import { Button } from "@material-ui/core";

const PreferencesButton = () => {
  const setPreferencesProps = {
    id: "Set Preferences",
    color: 'primary',
    variant: 'contained',
    href: '/preferences'
  };

  return(
    <Button {...setPreferencesProps} style={{ width: '50px', height: '50px' }} >
      <SettingsIcon fontSize="large" />
    </Button>
  );
};

export default PreferencesButton;
