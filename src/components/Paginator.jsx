import React from "react";
import Button from "./Button";

const Paginator = ({ length, pageChanger, pageSize = 12 }) => {
  let pageNumber = Math.ceil(length / pageSize);
  const counter = [];

  for(let i = 1; i <= pageNumber; i += 1) {
    counter.push(i);
  };

  return(
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
      {
        counter.map((number) => (
          <Button
            key={number}
            onClick={() => pageChanger(number)}
            name={number}
            id={`go to page ${number}`}
          />
        ))
      }
    </div>
  );
};

export default Paginator;
