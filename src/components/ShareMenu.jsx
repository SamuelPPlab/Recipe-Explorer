import React from "react";
import FavoriteButton from "./FavoriteButton";
import WhatsAppShareButton from "./WhatsAppShareButton";

const ShareMenu = ({ pathname, id }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
    <FavoriteButton id={id} />
    <WhatsAppShareButton pathname={`https://localhost:3000${pathname}`} />
  </div>
);

export default ShareMenu;
