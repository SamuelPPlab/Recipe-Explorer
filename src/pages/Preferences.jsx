import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Navigate } from "react-router";
import Button from "../components/Button";
import Input from "../components/Input";
import RadioButton from "../components/RadioButton";
import BackToMain from "../components/BackToMain";
import { FormControl, FormControlLabel, InputAdornment, TextField } from "@material-ui/core";
import { areaFetcher } from "../redux/actions/explorePage";
import { ageValidator } from "../services/formValidation";
import * as CakeRoundedIcon from '@material-ui/icons';
import Cake from '@material-ui/icons/Cake';
import { getLocalStorageKey } from "../services/localStorage";
import Checkbox from "../components/Checkbox";

console.log(CakeRoundedIcon)
const Preferences = ({ countries }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(areaFetcher());
  }, [dispatch]);

  const [age, setAge] = useState('');

  const [drinker, setDrinker] = useState(false);

  const [lactoseIntolerance, setLactoseIntolerance] = useState(false);

  const [vegan, setVegan] = useState(false);

  const [favoriteMeat, setFavoriteMeat] = useState('None');
  const [checkedCountries, setCheckedCountries] = useState([]);
  const [validInfo, setValidInfo] = useState(false);
  const [goToMain, setGoToMain] = useState(false);

  const meatOptions = ['Beef', 'Chicken', 'Goat', 'Lamb', 'Pork', 'None'];

  useEffect(() => {
    const isAgeValid = ageValidator(age);
    if (isAgeValid) return setValidInfo(true);
    setValidInfo(false);
  }, [age]);

  const handleSave = () => {
    let preferences = getLocalStorageKey('preferences');
    preferences = {
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

  const ageProps = {
    id: "Age",
    label: "What's your age?",
    InputProps: {
      endAdornment: <InputAdornment position="end"><Cake color="primary" /></InputAdornment>
    },
    onChange: ({ target: { value } }) => setAge(value),
    margin: 'normal',
    variant: 'filled',
    fullWidth: true,
    required: true,
    type: 'number',
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

  if (goToMain) return <Navigate to='/main' />;

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
        <TextField {...ageProps} />
        {age > 18 && <FormControlLabel
          label="Do you drink alcohol?"
          control={
            <Checkbox
              checked={drinker}
              onChange={() => setDrinker(!drinker)}
              color="primary"
            />
          }
        />}
        <FormControlLabel
          label="Are you lactose intolerant?"
          control={
            <Checkbox
              checked={lactoseIntolerance}
              onChange={() => setLactoseIntolerance(!lactoseIntolerance)}
              color="primary"
            />
          }
        />
        <FormControlLabel
          label="Are you a vegan or vegetarian?"
          control={
            <Checkbox
              checked={vegan}
              onChange={() => setVegan(!vegan)}
              color="primary"
            />
          }
        />
        { !vegan && <RadioButton {...favoriteMeatProps} />}
        {
          !vegan && <div>
            Do you have a preference for food of any of these coutries?
            {countryList}
          </div>
        }
        <Button {...saveButtonProps} />
      </form>
    </div>
  );
};

const mapStateToProps = ({ exploreReducer: { areas } }) => ({
  countries: areas && areas.filter((country) => country !== 'Unknown'),
});

export default connect (mapStateToProps) (Preferences);
