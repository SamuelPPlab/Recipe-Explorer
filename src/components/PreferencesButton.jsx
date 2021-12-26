import React, { useState } from "react";
import { Navigate } from "react-router";
import preferences from "../images/preferences.png";
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
    <div>
      <Button {...setPreferencesProps} style={{ width: '50px', height: '50px' }} >
        <SettingsIcon fontSize="large" />
      </Button>
    </div>
  );
};

export default PreferencesButton;
