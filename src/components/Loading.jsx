import React from "react";

const Loading = () => {
  const url = `https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgifimage
.net%2Fwp-content%2Fuploads%2F2018%2F04%2Floading-icon-gif-6.gif&f=1&nofb=1`;
  return (
    <img
      src={url}
      alt='loading'
    />
  );
};

export default Loading;
