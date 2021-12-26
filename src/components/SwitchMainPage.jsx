import React, { useState } from "react";
import mealIcon from '../images/mealIcon.svg';
import { useDispatch } from 'react-redux';
import drinkIcon from '../images/drinkIcon.svg';
import { swapMainPage } from "../redux/actions/mainPage";
import LocalBarIcon from '@material-ui/icons/LocalBar';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import { Button } from "@material-ui/core";

const SwitchMainPage = ({ isItFood }) => {
  const dispatch = useDispatch();

  const switchMainPageProps = {
    onClick: () => dispatch(swapMainPage()),
    id: 'switch',
    variant: 'contained',
    size: 'large',
    color: 'primary',
  };

  return(
    <Button {...switchMainPageProps} >
      { isItFood ? <LocalBarIcon fontSize="large"/> : <FastfoodIcon fontSize="large" /> }
    </Button>
  );
};

export default SwitchMainPage;