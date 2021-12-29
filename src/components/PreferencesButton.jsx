import React from "react";
import SettingsIcon from '@material-ui/icons/Settings';
import { Button, Tooltip } from "@material-ui/core";

const PreferencesButton = () => {
  const setPreferencesProps = {
    id: "Set Preferences",
    color: 'primary',
    variant: 'contained',
    href: '/preferences',
  };

  return(
    <Tooltip title="Configure Preferences" placement="left">
      <Button {...setPreferencesProps} style={{ width: '50px', height: '50px' }} >
        <SettingsIcon fontSize="large" />
      </Button>
    </Tooltip>
  );
};

export default PreferencesButton;
