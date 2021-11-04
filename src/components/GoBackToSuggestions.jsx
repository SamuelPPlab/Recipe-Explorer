import React, { useState } from "react";
import { Redirect } from "react-router";
import suggestionIcon from '../images/suggestionIcon.png';

const GoBackToSuggestions = () => {
  const [redirect, setRedirect] = useState(false);

  if(redirect) return <Redirect to='/suggestions' />
  const suggestionIMG = <img src={suggestionIcon} alt='suggetion icon' style={{ width: '50px' }} />;
  return(
    <div>
      <button onClick={() => setRedirect(!redirect)}>
        {suggestionIMG}
      </button>
    </div>
  );
}

export default GoBackToSuggestions;
