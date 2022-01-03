import React, { useState } from "react";
import { useDispatch, connect } from 'react-redux';
import { searching } from "../redux/actions/mainPage";
import { mainPageFetcher } from "../redux/actions/mainPage";
import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button, IconButton, InputAdornment, TextField } from "@material-ui/core";
import { ingredientFetcher, ingredientSearch } from "../redux/actions/explorePage";
import { Visibility, VisibilityOff } from "@material-ui/icons";

const SearchBar = ({ isItFood, isSearchResult }) => {
  const [searchIng, setSearchIng] = useState('');
  

  const dispatch = useDispatch();

  const searchIngredientsProps = {
    onChange: ({ target: { value } }) => setSearchIng(value),
    variant: 'outlined',
    margin: 'normal',
    InputProps: {
      endAdornment: <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={() => {
            dispatch(ingredientSearch(searchIng));
            setSearchIng('');
          }}
          edge="end"
        >
          <DeleteIcon color="primary" />
        </IconButton>
      </InputAdornment>
    },
    style: { width: '500px' },
    placeholder: 'Search for an ingredient'
  };

  const searchButtonProps = {
    id: 'Search Ingredient',
    onClick: () => {
      dispatch(ingredientSearch(searchIng));
      setSearchIng('');
    },
    style: {
      width: '55px',
      height: '55px',
      marginTop: '17px'
    },
    color: 'primary',
    variant: 'contained',
  };

  const clearSearchButtonProps = {
    label: 'Clear Search Results',
    id: 'Clear Search Results',
    onClick: () => {dispatch(ingredientFetcher())},
  };

  return(
    <div>
      <TextField {...searchIngredientsProps} />
      <Button {...searchButtonProps}><SearchIcon /></Button>
      <Button {...clearSearchButtonProps} />
    </div>
  );
};

const mapStateToProps = ({ mainPageReducer: { isItFood, isSearchResult } }) => ({
  isItFood,
  isSearchResult,
})

export default connect(mapStateToProps)(SearchBar);
