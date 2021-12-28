import React from 'react';
import { Route, Routes } from 'react-router-dom';
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
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core';
import './App.css';
import { orange, teal } from '@material-ui/core/colors';

const theme = createTheme({
  palette: {
    primary: orange,
    secondary: teal,
  }
});

function App() {
  return (
    <Provider store ={store}>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route exact path="/" element={ <Login /> } />
          <Route exact path="/main" element={ <MainPage /> } />
          <Route exact path="/foods/:id" element={ <RecipeDetails /> } />
          <Route exact path="/drinks/:id" element={  <RecipeDetails /> } />
          <Route exact path="/drinks/:id/in-progress" element={ <RecipesInProgress /> } />
          <Route exact path="/foods/:id/in-progress" element={ <RecipesInProgress /> } />
          <Route exact path="/done-recipes" element={ <DoneRecipes /> } />
          <Route exact path="/explore" element={ <ExplorePage /> } />
          <Route exact path="/preferences" element={ <Preferences /> } />
          <Route exact path="/suggestions" element={ <Suggestions /> } />
          <Route exact path="/signup" element={ <SignupPage /> } />
        </Routes>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
