import React, { useState } from "react";
import { useDispatch, connect } from 'react-redux';
import { searching } from "../redux/actions/mainPage";
import { mainPageFetcher } from "../redux/actions/mainPage";
import searchIcon from "../images/searchIcon.svg";
import SearchIcon from '@material-ui/icons/Search';
import { Button, TextField } from "@material-ui/core";
import { ingredientFetcher, ingredientSearch } from "../redux/actions/explorePage";

const SearchBar = ({ isItFood, isSearchResult }) => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Name');
  const [searchIng, setSearchIng] = useState('');
  const searchOptions = ['Name', 'Ingredient'];

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
    onClick: () => {dispatch(ingredientFetcher(showFood))},
  };

  const searchOptionsProps = {
    options: searchOptions,
    selectedFilter,
    setSelectedFilter,
    name: 'Search Options',
  };

  const searchBarProps = {
    id: 'searchInput',
    name: '',
    fieldValue: searchValue,
    setFieldValue: setSearchValue,
    onKeyUp: ({ keyCode, target: { value } }) => {
      if (keyCode === 13) {
        dispatch(searching(selectedFilter, value, isItFood));
      }
    },
  };

  return(
    <div style={{ background: 'gray' }}>
      <TextField {...searchIngredientsProps} />
      <Button {...searchButtonProps} ><SearchIcon /></Button>
      <Button {...clearSearchButtonProps} />
    </div>
  );
};

const mapStateToProps = ({ mainPageReducer: { isItFood, isSearchResult } }) => ({
  isItFood,
  isSearchResult,
})

export default connect(mapStateToProps)(SearchBar);
