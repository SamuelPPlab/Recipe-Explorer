import React, { useState } from "react";
import { FormControlLabel, ListItem, ListItemIcon, ListItemText, Radio, RadioGroup } from '@material-ui/core';

const ListMenuItem = ({ currentOption, setCurrentOption, options, itemText, icon }) => {

  const [active, setActive] = useState(false);

  return(
    <div>
      <ListItem
        button
        onClick={() => {
          setActive(!active);
        }}
        style={active ? { background: '#e9ecef', borderTop: '1px solid #adb5bd', borderBottom: '1px solid #adb5bd' } : null}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText>{itemText}</ListItemText>
      </ListItem>
      {
        active && <RadioGroup value={currentOption} style={{ marginLeft: '40px' }} onChange={({ target: { value } }) => setCurrentOption(value)}>
          {
            options.map((option) => (
              <FormControlLabel
                key={option}
                control={<Radio color="primary" />}
                label={option}
                value={option}
              />
            ))
          }
        </RadioGroup>
      }
    </div>
  );
};

export default ListMenuItem;
