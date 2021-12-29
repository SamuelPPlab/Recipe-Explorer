import React from "react";
import ExploreButton from "./ExploreButton";
import GoBackToSuggestions from './GoBackToSuggestions';
import PreferencesButton from "./PreferencesButton";
import ProfileButton from "./ProfileButton";
import SwitchMainPage from './SwitchMainPage';

const ExploreLinks = ({ isItFood }) => {
  return(
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <SwitchMainPage isItFood={isItFood} />
      <ExploreButton />
      <GoBackToSuggestions />
      <PreferencesButton />
      <ProfileButton />
    </div>
  )
};

export default ExploreLinks;
