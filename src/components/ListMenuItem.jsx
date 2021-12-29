import React from "react";
import { FormControlLabel, ListItem, ListItemIcon, ListItemText, Radio, RadioGroup } from '@material-ui/core';

const ListMenuItem = ({ currentOption, setCurrentOption, options, itemText, icon, active, setActive }) => {

  return(
    <div>
      <ListItem
        button
        onClick={() => {
          setActive();
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
