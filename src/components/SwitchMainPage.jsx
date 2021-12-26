import React from "react";
import { useDispatch } from 'react-redux';
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
    <Button style={{ width: '50px', height: '50px' }} {...switchMainPageProps} >
      {isItFood ? <LocalBarIcon fontSize="large"/> : <FastfoodIcon fontSize="large" />}
    </Button>
  );
};

export default SwitchMainPage;