import React, { useState } from "react";
import Button from "./Button";
import leftArrow from "../images/leftArrow.png"
import { Redirect } from "react-router";

const BackToMain = () => {
  const backArrow = <img src={leftArrow} style={{ width: '50px' }} alt="back arrow" />;
  const [backToMain, goBackToMain] = useState (false);

  if (backToMain) return <Redirect to='/main' />;
  return(
    <Button
      id="back"
      name={backArrow}
      onClick={() => goBackToMain(!backToMain)}
    />
  )
}

export default BackToMain;
