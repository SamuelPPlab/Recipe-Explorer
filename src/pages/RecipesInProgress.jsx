import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { mapDetailsStateToProps } from "../services/mapDetailsStateToProps";
import { ingredientAndMeasures } from "../services/ingredientAndMeasureConcatenator";
import { getLocalStorageKey, saveCheckedItem, saveCookedDate } from "../services/localStorage";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { progressChecker } from "../services/progressChecker";
import { Navigate } from "react-router";
import { useLocation } from "react-router-dom";
import MainRecipeDetails from "../components/MainRecipeDetails";
import useLoadDetails from "../customHooks/useLoadDetails";
import Loading from "../components/Loading";
import Button from "../components/Button";
import ShareMenu from "../components/ShareMenu";
import CheckboxItem from "../components/CheckboxItem";

const RecipesInProgress = ({ loading, ingredients, measures, name, image }) => {

  const { pathname } = useLocation();
  useLoadDetails(pathname);

  const id = pathname.split('/')[2];
  const [lock, setLock] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const isFood = pathname.includes('foods');

  const handleChange = (value) => {
    saveCheckedItem(id, value, name, image, isFood);
    const inProgress = getLocalStorageKey('inProgressRecipes')[id].boughtIngredients;
    setLock(!progressChecker(ingredients, inProgress));
  };

  const localStorageData = getLocalStorageKey('inProgressRecipes');
  const inProgress = localStorageData[id] ? localStorageData[id].boughtIngredients : [];
  useEffect(() => {
    if(!loading) {
      setLock(!progressChecker(ingredients, inProgress));
    }
  }, [loading, id, ingredients]);

  if (loading) return <Loading />;

  const texts = ingredientAndMeasures(ingredients, measures);

  if (redirect) return <Navigate to="/done-recipes" />;

  const handleClick = () => {
    setRedirect(!redirect);
    saveCookedDate(id);
  };

  const finishRecipeProps = {
    id: "finish",
    disabled: lock,
    onClick: () => handleClick(),
    name: "Finish Recipe",
  };

  return(
    <div>
      <MainRecipeDetails pathname={pathname} >
        <ShareMenu id={id} pathname={pathname} />
        <List>
          {
            texts.map((text) => (
              <ListItem key={text}>
                <CheckboxItem text={text.toUpperCase()} startChecked={inProgress.includes(text)} onChange={() => handleChange(text)} />
              </ListItem>
            ))
          }
        </List>
      </MainRecipeDetails>
      <Button {...finishRecipeProps} />
    </div>
  );
};

export default connect(mapDetailsStateToProps)(RecipesInProgress);
