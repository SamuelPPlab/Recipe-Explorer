import React from "react";
import CopyLinkButton from "./CopyLinkButton";
import FavoriteButton from "./FavoriteButton";
import WhatsAppShareButton from "./WhatsAppShareButton";

const ShareMenu = ({ pathname, id }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
    <FavoriteButton id={id} />
    <CopyLinkButton pathname={pathname} />
    <WhatsAppShareButton pathname={`https://localhost:3000${pathname}`} />
  </div>
);

export default ShareMenu;
