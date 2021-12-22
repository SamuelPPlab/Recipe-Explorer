export const emailValidator = (email) => {
  const emaildotcom = /^([\w.%+-]+)@([\w-]+\.)+([\w]{3})$/i.test(email);
  const emaildotcomdotsome = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i.test(email);
  return emaildotcom || emaildotcomdotsome;
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
