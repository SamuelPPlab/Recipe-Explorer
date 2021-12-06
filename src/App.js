import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import Login from './pages/Login';
import MainPage from './pages/MainPage';
import RecipeDetails from './pages/RecipeDetails';
import RecipesInProgress from './pages/RecipesInProgress';
import DoneRecipes from './pages/DoneRecipes';
import ExplorePage from './pages/ExplorePage';
import Preferences from './pages/Preferences';
import Suggestions from './pages/Suggestions';
import SignupPage from './pages/SignupPage';
import './App.css';

function App() {
  return (
    <Provider store ={ store }>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/main" component={ MainPage } />
          <Route exact path="/foods/:id" component={ RecipeDetails } />
          <Route exact path="/drinks/:id" component={ RecipeDetails } />
          <Route exact path="/drinks/:id/in-progress" component={ RecipesInProgress } />
          <Route exact path="/foods/:id/in-progress" component={ RecipesInProgress } />
          <Route exact path="/done-recipes" component={ DoneRecipes } />
          <Route exact path="/explore" component={ ExplorePage } />
          <Route exact path="/preferences" component={ Preferences } />
          <Route exact path="/suggestions" component={ Suggestions } />
          <Route exact path="/signup" component={ SignupPage } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
