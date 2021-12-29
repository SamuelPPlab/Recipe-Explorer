import React from "react";
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import { Button, Tooltip } from "@material-ui/core";


const GoBackToSuggestions = () => {
  const suggestionProps = {
    id: 'suggestions',
    variant: 'contained',
    color: 'primary',
    href: '/suggestions',
  };

  return(
    <Tooltip title="See Suggestions for the day" placement="right">
      <Button style={{ width: '50px', height: '50px' }} {...suggestionProps}>
        <EmojiObjectsIcon fontSize="large" />
      </Button>
    </Tooltip>
  );
}

export default GoBackToSuggestions;
