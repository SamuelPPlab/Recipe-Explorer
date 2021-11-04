import React from "react";

const UnorganizedList = ({ texts }) => {
  return (
    <ul>
    {
      texts.map((text, index) => (
        <li key={`${text}${index}`}>
          {text}
        </li>
      ))
    }
    </ul>
  );
}

export default UnorganizedList;
