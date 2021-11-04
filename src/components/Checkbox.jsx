import React, { useState } from "react";
import '../css/crossOutText.css'

const Checkbox = ({ text, onChange = null, startChecked = false, crossOut = false, disable = false }) => {
  const [checked, setChecked] = useState(startChecked);
  const classCSS = checked ? 'crossedOutText' : 'normalText';
  return (
    <div>
      <label htmlFor={text} className={ crossOut ? classCSS : ''} >
        <input
          id={text}
          disabled={disable && checked}
          type="checkbox"
          checked={checked}
          onChange={({ target }) => {
            setChecked(!checked);
            onChange && onChange(target.id);
          }}
        />
        {text}
      </label>
    </div>
  );
}

export default Checkbox;
