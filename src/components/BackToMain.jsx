import React, { useState } from "react";
import Button from "./Button";
import leftArrow from "../images/leftArrow.png"
import { Navigate } from "react-router";

const BackToMain = () => {
  const backArrow = <img src={leftArrow} style={{ width: '50px' }} alt="back arrow" />;
  const [backToMain, goBackToMain] = useState (false);

  const backToMainProps = {
    id: "back",
    name: backArrow,
    onClick: () => goBackToMain(!backToMain),
  };

  if (backToMain) return <Navigate to='/main' />;
  return(
    <Button {...backToMainProps} />
  );
}

export default BackToMain;
