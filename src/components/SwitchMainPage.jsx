import React, { useState } from "react";
import mealIcon from '../images/mealIcon.svg';
import { useDispatch } from 'react-redux';
import drinkIcon from '../images/drinkIcon.svg';
import { swapMainPage } from "../redux/actions/mainPage";
import Button from "./Button";

const SwitchMainPage = ({ isItFood }) => {
  const mealImage = <img src={mealIcon} alt="meal Icon" style={{ width: '50px' }} />;
  const drinkImage = <img src={drinkIcon} alt="explore Icon" style={{ width: '50px' }} />;

  const [buttonName, setButtonName] = useState(isItFood ? drinkImage : mealImage);
  const dispatch = useDispatch();
  const handleSwitch = () => {
    setButtonName(isItFood ? mealImage : drinkImage);
    dispatch(swapMainPage());
  };

  return(
    <Button
      name={ buttonName }
      onClick={ handleSwitch }
      id='switch'
      type="button"
    />
  );
};

export default SwitchMainPage;