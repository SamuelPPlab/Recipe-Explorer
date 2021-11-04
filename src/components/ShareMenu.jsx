import React from "react";
import BackToMain from "./BackToMain";
import CopyLinkButton from "./CopyLinkButton";
import FavoriteButton from "./FavoriteButton";
import ExploreButton from "./ExploreButton";
import WhatsAppShareButton from "./WhatsAppShareButton";
import GoBackToSuggestions from "./GoBackToSuggestions";

const ShareMenu = ({ pathname, id }) => {
  return(
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      <ExploreButton />
      <BackToMain />
      <FavoriteButton id={id} />
      <CopyLinkButton pathname={pathname} />
      <WhatsAppShareButton pathname={`https://localhost:3000${pathname}`} />
      <GoBackToSuggestions />
    </div>
  );
}

export default ShareMenu;
