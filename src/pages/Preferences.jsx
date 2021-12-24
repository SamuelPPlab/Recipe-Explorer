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

  const alcoholProps = {
    label: "Do you drink alcohol?",
    control: <Checkbox
      checked={drinker}
      onChange={() => setDrinker(!drinker)}
      color="primary"
    />,
  };

  const lactoseProps = {
    label: "Are you lactose intolerant?",
    control: <Checkbox
      checked={lactoseIntolerance}
      onChange={() => setLactoseIntolerance(!lactoseIntolerance)}
      color="primary"
    />,
  };

  const veganProps = {
    label: "Are you a vegan or vegetarian?",
    control: <Checkbox
      checked={vegan}
      onChange={() => setVegan(!vegan)}
      color="primary"
    />,
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
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '50vw', padding: '40px', background: 'rgba(237,237,237,1)', border: '3px solid gray', boxShadow: '0 4px 8px 0 grey, 0 6px 20px 0 rgba(0, 0, 0, 0.19)', borderRadius: '20px' }}>
        <div style={{ width: '100%', display: 'flex' }}>
          <BackToMain />
          <h1 style={{ marginLeft: '25%' }}>What do you like? </h1>
        </div>
        <form>
          <div style={{ width: '100%' }}><TextField {...ageProps} /></div>
          <div style={{ width: '100%', margin: '10px' }}>{age > 18 && <FormControlLabel {...alcoholProps} />}</div>
          <div style={{ width: '100%', margin: '10px' }}><FormControlLabel {...lactoseProps} /></div>
          <div style={{ width: '100%', margin: '10px' }}><FormControlLabel {...veganProps} /></div>
          <div style={{ width: '100%' }}>
            {
              !vegan && <FormControl>
                <h3 style={{ fontFamily: 'Roboto', marginLeft: '10px', fontSize: '1.3em' }}>What is your favorite meat?</h3>
                <div>
                  <RadioGroup value={favoriteMeat} onChange={({ target: { value } }) => setFavoriteMeat(value)}>
                    {
                      meatOptions.map((meat) => (
                        <FormControlLabel
                          key={meat}
                          control={<Radio color="primary" />}
                          label={meat}
                          value={meat}
                        />
                      ))
                    }
                  </RadioGroup>
                </div>
              </FormControl>
            }
          </div>
          <div style={{ width: '100%' }}>
            {
              !vegan && <FormControl>
                <h3 style={{ fontFamily: 'Roboto', marginLeft: '10px', fontSize: '1.3em' }}>Do you have a preference for food from any of these countries?</h3>
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
          </div>
          <div style={{ width: '100%', marginTop: '40px', display: 'flex', justifyContent: 'center' }}>
            <Button {...saveButtonProps}>
              Save preferences
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = ({ exploreReducer: { areas } }) => ({
  countries: areas && areas.filter((country) => country !== 'Unknown'),
});

export default connect (mapStateToProps) (Preferences);
