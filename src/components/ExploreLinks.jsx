import React from "react";
import ExploreButton from "./ExploreButton";
import GoBackToSuggestions from './GoBackToSuggestions';

const ExploreLinks = () => {
  return(
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <ExploreButton />
      <GoBackToSuggestions />
    </div>
  )
};

export default ExploreLinks;
