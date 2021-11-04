import React from "react";
import BackToMain from "./BackToMain";
import CopyLinkButton from "./CopyLinkButton";
import FavoriteButton from "./FavoriteButton";
import ExploreButton from "./ExploreButton";
import WhatsAppShareButton from "./WhatsAppShareButton";

const ShareMenu = ({ pathname, id }) => {
  return(
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      <ExploreButton />
      <BackToMain />
      <FavoriteButton id={id} />
      <CopyLinkButton pathname={pathname} />
      <WhatsAppShareButton pathname={`https://localhost:3000${pathname}`} />
    </div>
  );
}

export default ShareMenu;
