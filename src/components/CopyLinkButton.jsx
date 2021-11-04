import React from "react";
import shareIcon from "../images/shareIcon.svg";
import { copyLink } from "../services/copyLink";
import Button from "./Button";

const CopyLinkButton = ({ pathname }) => {
  const share = <img src={shareIcon} alt="share icon" style={{ width: '50px' }} />;
  const shareButtonProps = {
    name: share,
    id: "share-btn",
    onClick: () => copyLink(pathname),
  };

  return(
    <Button {...shareButtonProps} />
  )
}

export default CopyLinkButton;
