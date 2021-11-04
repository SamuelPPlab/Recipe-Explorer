export const stringFormatter = (string) => (
  string.replace(/\s+/g, '_').toLowerCase()
);

export const searchEngine = (filter, value, food) => {
  const formattedString = stringFormatter(value);
  const foodEndpoints = {
    'Ingredient': 'https://www.themealdb.com/api/json/v1/1/filter.php?i=',
    'First Letter': 'https://www.themealdb.com/api/json/v1/1/search.php?f=',
    'Name': 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
  };

  const drinksEndpoints = {
    'Ingredient': 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=',
    'First Letter': 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=',
    'Name': 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
  };

  if(food) {
    const url = `${foodEndpoints[filter]}${formattedString}`;
    return fetch(`${url}`).then((r) => r.json().then(({ meals }) => meals));
  }
  const url = `${drinksEndpoints[filter]}${formattedString}`;
  return fetch(url).then((r) => r.json().then(({ drinks }) => drinks));
};
