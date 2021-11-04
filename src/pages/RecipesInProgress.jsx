import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { mapDetailsStateToProps } from "../services/mapDetailsStateToProps";
import { ingredientAndMeasures } from "../services/ingredientAndMeasureConcatenator";
import { getLocalStorageKey, saveCheckedItem, saveCookedDate } from "../services/localStorage";
import { isItemChecked } from "../services/isItemChecked";
import { progressChecker } from "../services/progressChecker";
import { Redirect } from "react-router";
import MainRecipeDetails from "../components/MainRecipeDetails";
import useLoadDetails from "../customHooks/useLoadDetails";
import Checkbox from "../components/Checkbox";
import Loading from "../components/Loading";
import Button from "../components/Button";
import ShareMenu from "../components/ShareMenu";

const RecipesInProgress = ({ location: { pathname }, loading, ingredients, measures, name, image }) => {

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

  useEffect(() => {
    const localStorageData = getLocalStorageKey('inProgressRecipes');
    const inProgress = localStorageData[id] ? localStorageData[id].boughtIngredients : [];
    if(!loading) {
      setLock(!progressChecker(ingredients, inProgress));
    }
  }, [loading, id, ingredients]);

  if (loading) return <Loading />;

  const texts = ingredientAndMeasures(ingredients, measures);

  if (redirect) return <Redirect to="/done-recipes" />;

  const handleClick = () => {
    setRedirect(!redirect);
    saveCookedDate(id);
  };

  const checkboxProps = {
    onChange: (value) => handleChange(value),
    disable: true,
    crossOut: true,
  };

  const ingredientList = texts.map((text, index) => {
    checkboxProps.startChecked = isItemChecked(text, id);
    checkboxProps.text = text;
    return (
      <div key={`${index}${index}`}>
        <Checkbox {...checkboxProps} />
      </div>
    );
  });

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
        {ingredientList}
      </MainRecipeDetails>
      <Button {...finishRecipeProps} />
    </div>
  );
};

export default connect(mapDetailsStateToProps)(RecipesInProgress);
