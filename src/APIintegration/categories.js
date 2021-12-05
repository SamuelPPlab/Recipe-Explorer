import { badSourcesFilter } from "../services/filterBadIngredientIMGSources";
import { stringFormatter } from "./search";

const categories = (isItFood) => {
  const foodUrl = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const drinkUrl = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

  if (isItFood) {
    return fetch(foodUrl).then((r) => r.json()
      .then(({ meals }) => meals.map(({ strCategory }) => strCategory)));
  }
  return fetch(drinkUrl).then((r) => r.json()
    .then(({ drinks }) => drinks.map(({ strCategory }) => strCategory)));
};

export const fetchCategories = async (isItFood, callback) => {
  const options = await categories(isItFood);
  callback(options);
};

export const fetchSelectedCategoryItems = (isItFood, category) => {
  const foodCategoryUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
  const drinkCategoryUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

  if (isItFood) {
    return fetch(`${foodCategoryUrl}${category}`).then((r) => r.json().then(({ meals }) => meals));
  }
  return fetch(`${drinkCategoryUrl}${category}`).then((r) => r.json().then(({ drinks }) => drinks));
};

export const fetchAreas = () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  return fetch(url).then((r) => r.json()
    .then(({ meals }) => meals.map(({ strArea }) => strArea)));
};

export const fetchIngredients = (isItFood) => {
  const drinks = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  const foods = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const url = isItFood ? foods : drinks;

  if(isItFood) {
    return fetch(url).then((r) => r.json()
      .then(({ meals }) => meals.map(({ strIngredient }) => strIngredient))
      .then((ingredients) => ingredients.filter((ing) => badSourcesFilter(ing) && ing)))
  }

  return fetch(url).then((r) => r.json()
    .then(({ drinks }) => drinks.map(({ strIngredient1 }) => strIngredient1))
    .then((ingredients) => ingredients.filter((ing) =>  badSourcesFilter(ing) && ing)))
};

export const fetchAlcoholic = (option) => {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list';
  return fetch(url).then((r) => r.json()
    .then(({ drinks }) => drinks.map(({ strAlcoholic }) => strAlcoholic)));
};

export const fetchGlasses = () => {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list';
  return fetch(url).then((r) => r.json()
    .then(({ drinks }) => drinks.map(({ strGlass }) => strGlass)));
};

export const getRecipesByArea = (area) => {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
  return fetch(url).then((r) => r.json().then(({ meals }) => meals));
};

export const getRecipesByIngredients = (isItFood, ingredient) => {
  const formattedString = stringFormatter(ingredient);
  const foods = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${formattedString}`;
  const drinks = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${formattedString}`;
  if(isItFood) {
    return fetch(foods).then((r) => r.json().then(({ meals }) => meals));
  }
  return fetch(drinks).then((r) => r.json().then(({ drinks }) => drinks));
};

export const getRecipesByAlcoholicOption = (option) => {
  const formattedString = stringFormatter(option);
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${formattedString}`;
  return fetch(url).then((r) => r.json().then(({ drinks }) => drinks));
};

export const getRandomRecipe = (isItFood) => {
  const food = 'https://www.themealdb.com/api/json/v1/1/random.php';
  const drink = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

  if(isItFood) {
    return fetch(food).then((r) => r.json().then(({ meals }) => meals[0]));
  }
  return fetch(drink).then((r) => r.json().then(({ drinks }) => drinks[0]));
}
