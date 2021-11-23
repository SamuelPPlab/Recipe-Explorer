import React, { useState } from "react";
import { Redirect } from "react-router";
import preferences from "../images/preferences.png";
import Button from "./Button";

const PreferencesButton = () => {
  const [goToPreferences, setGoToPreferences] = useState(false)
  const preferencesIMG = <img style={{ height: '50px' }} src={preferences} alt="preferences" />;
  const setPreferencesProps = {
    name: preferencesIMG,
    id: "Set Preferences",
    onClick: () => setGoToPreferences(!goToPreferences),
  };

  if (goToPreferences) return <Redirect to="/preferences" />;

  return(
    <div>
      <Button {...setPreferencesProps} />
    </div>
  );
};

export default PreferencesButton;
