import React, { useState } from "react";
import { useDispatch, connect } from 'react-redux';
import { searching } from "../redux/actions/mainPage";
import Input from "./Input";
import Button from './Button';
import RadioButton from "./RadioButton";

const SearchBar = ({ isItFood }) => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Name');

  const searchOptions = ['Name', 'Ingredient', 'First Letter'];

  const dispatch = useDispatch();

  const searchOptionsProps = {
    options: searchOptions,
    selectedFilter,
    setSelectedFilter,
    name: 'Search Options',
  };

  const searchBarProps = {
    id: 'searchInput',
    name: 'Search',
    fieldValue: searchValue,
    setFieldValue: setSearchValue,
  };

  const searchButtonProps = {
    name: 'Search',
    id: 'pesquisar',
    onClick: () => dispatch(searching(selectedFilter, searchValue, isItFood)),
  };

  return(
    <div>
      <Input {...searchBarProps} />
      <RadioButton {...searchOptionsProps} />
      <Button {...searchButtonProps} />
    </div>
  );
};

const mapStateToProps = ({ mainPageReducer }) => ({
  isItFood: mainPageReducer.isItFood,
})

export default connect(mapStateToProps)(SearchBar);
