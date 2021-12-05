import React from "react";
import { useDispatch } from 'react-redux';
import { mainPageFetcher } from "../redux/actions/mainPage";
import Button from "./Button";

const NoResults = ({ isItFood }) => {
  const dispatch = useDispatch();
  const goBackProps = {
    name: 'Voltar',
    id: 'back to main',
    onClick: () => dispatch(mainPageFetcher(isItFood)),
  };

  return(
    <div>
      No results for your search :(
      <Button {...goBackProps} />
    </div>
  );
}

export default NoResults;
