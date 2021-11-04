import { template } from './localStorageRecipeTemplate';

export const getLocalStorageKey = (key) => {
  const doesKeyExist = JSON.parse(localStorage.getItem(key));

  if(!doesKeyExist) {
    localStorage.setItem(key, JSON.stringify({}));
  } 
  return JSON.parse(localStorage.getItem(key));
};

export const saveCheckedItem = (id, item, name, image, isFood) => {
  const IPR = getLocalStorageKey('inProgressRecipes');
  // IPR = in progress recipes
  const RDE = IPR[id]
  ? { ...IPR[id], boughtIngredients: [...IPR[id].boughtIngredients, item], name, image }
  : { ...template, name, image, boughtIngredients: [item], isFood };
  // RDE = recipe data structure
  IPR[id] = RDE;
  localStorage.setItem('inProgressRecipes', JSON.stringify(IPR));
};

export const setFavorite = (id, currentStatus) => {
  const RD = getLocalStorageKey('inProgressRecipes');
  // RD = recipe data
  const RDE = RD[id] ? { ...RD[id], favorite: !currentStatus } : { ...template, favorite: !currentStatus };
  RD[id] = RDE;
  localStorage.setItem('inProgressRecipes', JSON.stringify(RD));
};

export const saveCookedDate = (id) => {
  const IPR = getLocalStorageKey('inProgressRecipes');
  let currentRecipe = IPR[id];
  const { datesCooked } = currentRecipe;
  const currentDate = new Date().toLocaleDateString();
  const newData = { ...currentRecipe, datesCooked: [...datesCooked, currentDate] };
  newData.timesCooked = newData.datesCooked.length;
  newData.boughtIngredients = [];
  currentRecipe = newData;
  IPR[id] = currentRecipe;
  localStorage.setItem('inProgressRecipes', JSON.stringify(IPR));
};
