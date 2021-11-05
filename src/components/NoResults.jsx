import React from "react";
import { useDispatch } from 'react-redux';
import { searching } from "../redux/actions/mainPage";
import Button from "./Button";

const NoResults = () => {
  const dispatch = useDispatch();
  const goBackProps = {
    name: 'Voltar',
    id: 'back to main',
    onClick: () => dispatch(searching('Name', '', true)),
  };

  return(
    <div>
      No results for your search :(
      <Button {...goBackProps} />
    </div>
  );
}

export default NoResults;
