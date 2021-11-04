export const ageValidator = (age) => {
  if (parseInt(age)) {
    return true;
  }
  return false;
};

export const nameValidator = (name) => {
  if (name !== '' && name.length < 15) {
    return true;
  }
  return false;
}