const fetchDetails = (food, id) => {
  const foodDetails = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const drinkDetails = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

  if(food){
    return fetch(foodDetails).then((r) => (r.json().then(({ meals }) => meals[0])));
  }
  return fetch(drinkDetails).then((r) => (r.json().then(({ drinks }) => drinks[0])));
};

export default fetchDetails;
