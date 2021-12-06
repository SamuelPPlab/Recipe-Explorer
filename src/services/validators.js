export const emailValidator = (email) => {
  return (/^([\w.%+-]+)@([\w-]+\.)+([\w]{3})$/i.test(email));
};

export const validateUserName = (userName) => {
  return /^[a-z][a-z\s]*$/i.test(userName);
};

export const passwordLengthValidator = (password) => {
  const minPasswordLength = 8;
  return password.length >= minPasswordLength;
};

export const passwordMatcher = (password, confirmPassword) => {
  return password === confirmPassword;
};
