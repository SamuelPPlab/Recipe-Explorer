const checkLogin = (email, passwordInput) => {
    const validEmail = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{3})$/i);
    const minPasswordLength = 6;
    const validPassword = passwordInput.length > minPasswordLength;
    if (validEmail && validPassword) return false;
    return true;
  };

export default checkLogin;
