import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SearchBar from "./SearchBar";
import Button from "./Button";
import profileIcon from "../images/profileIcon.svg";
import searchIcon from "../images/searchIcon.svg";
import x from "../images/x-icon.png";
import { mainPageFetcher } from "../redux/actions/mainPage";

const Header = ({ isItFood, title, isSearchResult }) => {
	const [hideSearchBar, setHideSearchBar] = useState(false);
	const profileIconImg = <img src={ profileIcon } alt="profileIcon" style={{ width: '50px', height: '50px' }} />;
	const searchIconImg = <img src={ searchIcon } alt="searchIcon" style={{ width: '50px', height: '50px' }} />;
	const XIconImg = <img src={ x } alt="X" style={{ width: '50px', height: '50px' }} />;

	const dispatch = useDispatch();

	const searchButtonProps = {
		name: searchIconImg,
		onClick: () => setHideSearchBar(!hideSearchBar),
		id: "lookingGlass",
	};

	const clearSearchResultsProps = {
		name: XIconImg,
		onClick: () => dispatch(mainPageFetcher(isItFood)),
		id: 'ClearSearch',
	};

	const profileButtonProps = {
		name: profileIconImg,
		onClick: () => null,
		id: 'Profile Button',
	}

  return (
		<div style={{ display: 'flex', justifyContent: 'space-between' }}>
			<div style={{ display: 'flex', height: '60px' }}>
				{ !hideSearchBar && <Button {...searchButtonProps} />}
				{ isSearchResult && <Button {...clearSearchResultsProps} />}
				{ hideSearchBar && <SearchBar isItFood={isItFood} /> }
			</div>
			<div>
				{ <h1>{title}</h1> }
			</div>
			<Link to="/profile">
				<Button {...profileButtonProps} />
			</Link>
		</div>
	);
}

export default Header;
