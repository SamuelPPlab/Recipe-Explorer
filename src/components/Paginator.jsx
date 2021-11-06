import React from "react";
import { backToTop } from "../services/backToTop";
import Button from "./Button";

const Paginator = ({ length, pageChanger, pageSize = 15, scrollToTop = false }) => {
  let pageNumber = Math.ceil(length / pageSize);
  const counter = [];

  for(let i = 1; i <= pageNumber; i += 1) {
    counter.push(i);
  };

  const handleClick = (number) => {
    pageChanger(number);
    scrollToTop && backToTop();
  };

  return(
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
      {
        counter.map((number) => (
          <Button
            key={number}
            onClick={() => handleClick(number)}
            name={number}
            id={`go to page ${number}`}
          />
        ))
      }
    </div>
  );
};

export default Paginator;
