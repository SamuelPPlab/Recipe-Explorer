import React from "react";
import { List, ListItem, ListItemIcon } from "@material-ui/core";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const UnorganizedList = ({ texts }) => {
  return (
    <List>
      {
        texts.map((text, index) => (
          <ListItem key={`${text}${index}`}>
            <ListItemIcon>
              <KeyboardArrowRightIcon color="primary" />
            </ListItemIcon>
            {text.toUpperCase()}
          </ListItem>
        ))
      }
    </List>
  );
};

export default UnorganizedList;
