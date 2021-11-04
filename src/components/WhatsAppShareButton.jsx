import React from "react";

const WhatsAppShareButton = ({ pathname }) => {
  const message = "Dá uma olhada nessa receita: "
  return (
    <div>
      <a href={`https://api.whatsapp.com/send?text=${message}${pathname}`} target="_blank" rel="noopener noreferrer" >
        <button>
          <img src="https://cdn.onlinewebfonts.com/svg/img_24852.png" style={{ width: '50px' }} alt='Whatsapp Icon' />
        </button>
      </a>
    </div>
  );
}

export default WhatsAppShareButton;
