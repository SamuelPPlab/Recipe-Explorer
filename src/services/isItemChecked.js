import { getLocalStorageKey } from "./localStorage"

export const isItemChecked = (item, id) => {
  const inProgress = getLocalStorageKey('inProgressRecipes');
  const checkedItems = inProgress[id] ? inProgress[id].boughtIngredients : [];
  return checkedItems.includes(item);
};
