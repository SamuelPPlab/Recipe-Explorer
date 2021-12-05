import React from "react";
import ExploreButton from "./ExploreButton";
import GoBackToSuggestions from './GoBackToSuggestions';
import PreferencesButton from "./PreferencesButton";

const ExploreLinks = () => {
  return(
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <PreferencesButton />
      <ExploreButton />
      <GoBackToSuggestions />
    </div>
  )
};

export default ExploreLinks;
