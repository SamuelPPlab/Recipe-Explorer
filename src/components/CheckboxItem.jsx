import React, { useState } from "react";
import { FormControlLabel, Checkbox } from "@material-ui/core";

const CheckboxItem = ({ text, onChange }) => {
  const [checked, setChecked] = useState(false);

  return (
    <FormControlLabel
      label={text}
      control={
        <Checkbox
          checked={checked}
          disabled={checked}
          onChange={() => {
            onChange();
            setChecked(!checked);
          }}
          color="primary"
        />
      }
    />
  );
};

export default CheckboxItem;
