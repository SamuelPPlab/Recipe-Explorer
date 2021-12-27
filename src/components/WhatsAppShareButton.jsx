import React from "react";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Button } from "@material-ui/core";

const WhatsAppShareButton = ({ pathname }) => {
  const message = "Dá uma olhada nessa receita: "
  return (
    <div>
      <a href={`https://api.whatsapp.com/send?text=${message}${pathname}`} target="_blank" rel="noopener noreferrer" >
        <Button
          color='primary'
          variant="outlined"
        >
          <WhatsAppIcon color="success" fontSize="large" />
        </Button>
      </a>
    </div>
  );
}

export default WhatsAppShareButton;
