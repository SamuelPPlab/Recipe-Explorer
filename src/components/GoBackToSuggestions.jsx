import React from "react";
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import { Button } from "@material-ui/core";

const GoBackToSuggestions = () => {
  const suggestionProps = {
    id: 'suggestions',
    variant: 'contained',
    color: 'primary',
    href: '/suggestions',
  };

  return(
    <Button style={{ width: '50px', height: '50px' }} {...suggestionProps}>
      <EmojiObjectsIcon fontSize="large" />
    </Button>
  );
}

export default GoBackToSuggestions;
