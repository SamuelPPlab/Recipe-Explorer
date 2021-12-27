import React, { useState } from "react";
import { FormControlLabel, Checkbox } from "@material-ui/core";

const CheckboxItem = ({ text }) => {
  const [checked, setChecked] = useState(false);

  return (
    <FormControlLabel
      label={text}
      control={
        <Checkbox
          checked={checked}
          onChange={() => setChecked(!checked)}
          color="primary"
        />
      }
    />
  );
}

export default CheckboxItem;
