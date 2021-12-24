import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Navigate } from "react-router";
import BackToMain from "../components/BackToMain";
import { Button, FormControl, FormControlLabel, FormLabel, InputAdornment, Radio, RadioGroup, TextField } from "@material-ui/core";
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
      drinker,
      lactoseIntolerance,
      vegan,
      favoriteMeat: favoriteMeat,
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

  const saveButtonProps = {
    id: "Done",
    disabled: !validInfo,
    onClick: handleSave,
    variant: 'contained',
    size: 'large',
    color: 'primary'
  };

  const handleCheckboxClick = (country) => {
    if(checkedCountries.includes(country)) {
      return setCheckedCountries(checkedCountries.filter((item) => item !== country));
    }
    setCheckedCountries([...checkedCountries, country]);
  };

  if (goToMain) return <Navigate to='/main' />;

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
        {
          !vegan && <FormControl>
            <FormLabel>What is your favorite meat?</FormLabel>
            <RadioGroup value={favoriteMeat} onChange={({ target: { value } }) => setFavoriteMeat(value)}>
              {
                meatOptions.map((meat) => (
                  <FormControlLabel key={meat} control={<Radio color="primary" />} label={meat} value={meat} />
                ))
              }
            </RadioGroup>
          </FormControl>
        }
        {
          !vegan && <FormControl>
            <FormLabel>Do you have a preference for food from any of these countries?</FormLabel>
            {
              countries && countries.map((country) => (
                <FormControlLabel
                  label={country}
                  control={
                    <Checkbox
                      checked={checkedCountries.includes(country)}
                      onChange={() => handleCheckboxClick(country)}
                    />
                  }
                />
              ))
            }
          </FormControl>
        }
        <Button {...saveButtonProps}>
          Save preferences
        </Button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ exploreReducer: { areas } }) => ({
  countries: areas && areas.filter((country) => country !== 'Unknown'),
});

export default connect (mapStateToProps) (Preferences);
