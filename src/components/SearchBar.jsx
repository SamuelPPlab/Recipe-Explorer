import React, { useState } from "react";
import { useDispatch, connect } from 'react-redux';
import { searching } from "../redux/actions/mainPage";
import { mainPageFetcher } from "../redux/actions/mainPage";
import searchIcon from "../images/searchIcon.svg";
import x from "../images/x-icon.png";
import Input from "./Input";
import Button from './Button';
import RadioButton from "./RadioButton";

const SearchBar = ({ isItFood, isSearchResult }) => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Name');
  const searchIconImg = <img src={ searchIcon } alt="searchIcon" style={{ width: '50px', height: '50px' }} />;
	const XIconImg = <img src={ x } alt="X" style={{ width: '50px', height: '50px' }} />;

  const searchOptions = ['Name', 'Ingredient'];

  const dispatch = useDispatch();

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

	const clearSearchResultsProps = {
		name: XIconImg,
		onClick: () => dispatch(mainPageFetcher(isItFood)),
		id: 'ClearSearch',
	};


  const searchButtonProps = {
    name: searchIconImg,
    id: 'pesquisar',
    onClick: () => dispatch(searching(selectedFilter, searchValue, isItFood)),
  };

  return(
    <div style={{ display: 'flex', flexWrap: 'wrap', height: '50px' }}>
      <Button {...searchButtonProps} />
      <RadioButton {...searchOptionsProps} />
      <Input {...searchBarProps} />
    </div>
  );
};

const mapStateToProps = ({ mainPageReducer: { isItFood, isSearchResult } }) => ({
  isItFood,
  isSearchResult,
})

export default connect(mapStateToProps)(SearchBar);
