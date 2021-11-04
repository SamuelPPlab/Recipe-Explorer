import React from "react";

const RadioButton = ({ options, selectedFilter, setSelectedFilter, name }) => (
  <div>
    { name }
    {
      options.map((option) => (
        <div key={option}>
          <label htmlFor={option}>
            <input
              id={option}
              type="radio"
              checked={selectedFilter === option}
              value={option}
              name={option}
              onChange={() => setSelectedFilter(option)}
            />
            {option}
          </label>
        </div>
      ))
    }
  </div>
);

export default RadioButton;
