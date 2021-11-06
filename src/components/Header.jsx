import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SearchBar from "./SearchBar";
import Button from "./Button";
import profileIcon from "../images/profileIcon.svg";
import searchIcon from "../images/searchIcon.svg";
import { mainPageFetcher } from "../redux/actions/mainPage";

const Header = ({ isItFood, title, isSearchResult }) => {
	const [hideSearchBar, setHideSearchBar] = useState(false);
	const profileIconImg = <img src={ profileIcon } alt="profileIcon" style={{ width: '50px' }} />;
	const searchIconImg = <img src={ searchIcon } alt="searchIcon" style={{ width: '50px' }} />;

	const dispatch = useDispatch();

	const searchButtonProps = {
		name: searchIconImg,
		onClick: () => setHideSearchBar(!hideSearchBar),
		id: "lookingGlass",
	};

	const clearSearchResultsProps = {
		name: 'Clear Search Results',
		onClick: () => dispatch(mainPageFetcher(isItFood)),
		id: 'ClearSearch',
	};

  return (
		<div style={{ display: 'flex', justifyContent: 'space-between' }}>
			<div>
				<Button {...searchButtonProps} />
				{ isSearchResult && <Button {...clearSearchResultsProps} />}
			</div>
			{ !hideSearchBar && <h1>{title}</h1> }
			{ hideSearchBar && <SearchBar isItFood={isItFood} /> }
			<Link to="/profile">
				{ profileIconImg }
			</Link>
		</div>
	);
}

export default Header;
