const badSources = [
  'Sweet Potatoes', 'Bread Rolls', 'Potatoe Buns', 'Yukon Gold Potatoes',
  'Yellow Onion', 'Beef Stock Concentrate', 'Chicken Sotock Concentrate', 'Persian Cucumber',
  'Sriracha', 'Gherkin Relish', 'Lemon vodka', 'Watermelon', 'Mango', 'Cantaloupe', 'Berries',
  'Grapes', 'Peach Vodka', 'Ouzo', 'Grape juice', 'Firewater', 'Chocolate liqueur'
];

export const badSourcesFilter = (source) => (!badSources.includes(source));
