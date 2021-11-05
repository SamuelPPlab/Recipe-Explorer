import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Redirect } from "react-router";
import Button from "../components/Button";
import Input from "../components/Input";
import RadioButton from "../components/RadioButton";
import BackToMain from "../components/BackToMain";
import { areaFetcher } from "../redux/actions/explorePage";
import { ageValidator, nameValidator } from "../services/formValidation";
import { getLocalStorageKey } from "../services/localStorage";
import Checkbox from "../components/Checkbox";

const Preferences = ({ countries }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(areaFetcher());
  }, [dispatch]);

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [drinker, setDrinker] = useState(`No, I don't`);
  const [lactoseIntolerance, setLactoseIntolerance] = useState(`No, I'm not`);
  const [vegan, setVegan] = useState(`No, I'm neither`);
  const [favoriteMeat, setFavoriteMeat] = useState('None');
  const [checkedCountries, setCheckedCountries] = useState([]);
  const [validInfo, setValidInfo] = useState(false);
  const [goToMain, setGoToMain] = useState(false);

  const drinkerOptions = [`Yes, I drink`, `No, I don't`];
  const lactoseOptions = ['Yes, I am', `No, I'm not`];
  const veganOptions = [`Yes, I'm a proud vegan`, `Yes, I'm a vegetarian`, `No, I'm neither`];
  const meatOptions = ['Beef', 'Chicken', 'Goat', 'Lamb', 'Pork', 'None'];

  useEffect(() => {
    const isNameValid = nameValidator(name);
    const isAgeValid = ageValidator(age);
    if (isNameValid && isAgeValid) return setValidInfo(true);
    setValidInfo(false);
  }, [name, age]);

  const handleSave = () => {
    let preferences = getLocalStorageKey('preferences');
    preferences = {
      name,
      age,
      drinker: drinker.includes('Yes'),
      lactoseIntolerant: lactoseIntolerance.includes('Yes'),
      vegan: vegan.includes('Yes'),
      favoriteMeat: (vegan.includes('No') && !favoriteMeat === 'None') && favoriteMeat,
      checkedCountries,
    };
    localStorage.setItem('preferences', JSON.stringify(preferences));
    setGoToMain(!goToMain);
  };

  const nameProps = {
    id: "preferences name",
    name: "How do you want to be called?",
    fieldValue: name,
    setFieldValue: setName,
  };

  const ageProps = {
    id: "Age",
    name: "What's your age?",
    fieldValue: age,
    setFieldValue: setAge,
  };

  const drinkerProps = {
    name: "Do you drink alcohol?",
    id: "Do you Drink",
    options: drinkerOptions,
    selectedFilter: drinker,
    setSelectedFilter: setDrinker,
  };

  const lactoseProps = {
    id: "lactose",
    options: lactoseOptions,
    selectedFilter: lactoseIntolerance,
    setSelectedFilter: setLactoseIntolerance,
    name: "Are you lactose intolerant?",
  };

  const veganProps = {
    id: "Vegan",
    options: veganOptions,
    selectedFilter: vegan,
    setSelectedFilter: setVegan,
    name: "Are you a vegetarian or vegan?",
  };
  
  const favoriteMeatProps = {
    id: "Favorite Meat",
    options: meatOptions,
    selectedFilter: favoriteMeat,
    setSelectedFilter: setFavoriteMeat,
    name: "What kind of meat you prefer?",
  };

  const saveButtonProps = {
    id: "Done",
    name: "Save Preferences",
    disabled: !validInfo,
    onClick: handleSave,
  };

  const handleCheckboxClick = (country) => {
    if(checkedCountries.includes(country)) {
      return setCheckedCountries(checkedCountries.filter((item) => item !== country));
    }
    setCheckedCountries([...checkedCountries, country]);
  };

  if (goToMain) return <Redirect to='/main' />;

  const checkboxProps = {};

  const countryList = countries && countries.map((country) => {
    checkboxProps.text = country;
    checkboxProps.onChange = () => handleCheckboxClick(country);
    checkboxProps.crossOut = true;
    checkboxProps.checked = checkedCountries.includes(country);
    return (
      <div key={country}>
        <Checkbox {...checkboxProps} />
      </div>
    );
  });

  return (
    <div>
      <BackToMain />
      <form>
        <Input {...nameProps} />
        <Input {...ageProps} />
        { parseInt(age) > 18 && <RadioButton {...drinkerProps} /> }
        <RadioButton {...lactoseProps} />
        <RadioButton {...veganProps} />
        { vegan.includes('No') && <RadioButton {...favoriteMeatProps} />}
        <div>
          Do you have a preference for food of any of these coutries?
          {countryList}
        </div>
        <Button {...saveButtonProps} />
      </form>
    </div>
  );
};

const mapStateToProps = ({ exploreReducer: { areas } }) => ({
  countries: areas && areas.filter((country) => country !== 'Unknown'),
});

export default connect (mapStateToProps) (Preferences);
