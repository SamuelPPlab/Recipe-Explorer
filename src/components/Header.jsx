import React, { useState } from "react";
import { Link } from 'react-router-dom';
import SearchBar from "./SearchBar";
import Button from "./Button";
import profileIcon from "../images/profileIcon.svg";
import searchIcon from "../images/searchIcon.svg";

const Header = ({ isItFood }) => {
	const [hideSearchBar, setHideSearchBar] = useState(false);
	const profileIconImg = <img src={ profileIcon } alt="profileIcon" style={{ width: '50px' }} />;
	const searchIconImg = <img src={ searchIcon } alt="searchIcon" style={{ width: '50px' }} />;

	const searchButtonProps = {
		name: searchIconImg,
		onClick: () => setHideSearchBar(!hideSearchBar),
		id: "lookingGlass",
	};

  return (
		<div style={{ display: 'flex', justifyContent: 'space-between' }}>
			<div>
				<Button {...searchButtonProps} />
			</div>
			{ hideSearchBar && <SearchBar isItFood={isItFood} /> }
			<Link to="/profile">
				{ profileIconImg }
			</Link>
		</div>
	);
}

export default Header;
