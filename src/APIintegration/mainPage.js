const mainData = (food) => {
  const foods = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const drinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  if(food) {
    return fetch(foods).then((response) => response.json().then(({ meals }) => meals));
  }
  return fetch(drinks).then((response) => response.json().then(({ drinks }) => drinks));
};

export default mainData;
