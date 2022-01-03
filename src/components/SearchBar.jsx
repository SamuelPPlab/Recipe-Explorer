import React, { useState } from "react";
import { useDispatch, connect } from 'react-redux';
import { searching } from "../redux/actions/mainPage";
import { mainPageFetcher } from "../redux/actions/mainPage";
import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button, IconButton, InputAdornment, TextField, ButtonGroup } from "@material-ui/core";
import { ingredientFetcher, ingredientSearch } from "../redux/actions/explorePage";
import Tooltip from '@mui/material/Tooltip';
import { Visibility, VisibilityOff } from "@material-ui/icons";

const SearchBar = ({ isItFood, isSearchResult }) => {
  const [searchIng, setSearchIng] = useState('');
  const [listIsResult, setListIsResult] = useState(false);
  

  const dispatch = useDispatch();

  const searchIngredientsProps = {
    onChange: ({ target: { value } }) => setSearchIng(value),
    variant: 'outlined',
    margin: 'normal',
    style: { width: '500px' },
    placeholder: 'Search for an ingredient'
  };

  const searchButtonProps = {
    id: 'Search Ingredient',
    value: searchIng,
    onClick: () => {
      dispatch(ingredientSearch(searchIng));
      setSearchIng('');
      setListIsResult(!listIsResult);
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
    disabled: !listIsResult,
    style: {
      width: '55px',
      height: '55px',
      marginTop: '17px'
    },
    color: 'primary',
    variant: 'contained',
    id: 'Clear Search Results',
    onClick: () => {
      dispatch(ingredientFetcher());
      setListIsResult(!listIsResult);
      setSearchIng('');
    },
  };

  return(
    <div>
      <TextField {...searchIngredientsProps} />
      <ButtonGroup>
        <Tooltip title="Clear Search" placement="top">
          <Button {...clearSearchButtonProps}><DeleteIcon /></Button>
        </Tooltip>
        <Tooltip title="Search" placement="top" >
          <Button {...searchButtonProps}><SearchIcon /></Button>
        </Tooltip>
      </ButtonGroup>
    </div>
  );
};

const mapStateToProps = ({ mainPageReducer: { isItFood, isSearchResult } }) => ({
  isItFood,
  isSearchResult,
})

export default connect(mapStateToProps)(SearchBar);
