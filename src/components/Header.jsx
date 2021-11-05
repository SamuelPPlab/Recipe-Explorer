import React, { useState } from "react";
import { Link } from 'react-router-dom';
import SearchBar from "./SearchBar";
import Button from "./Button";
import profileIcon from "../images/profileIcon.svg";
import searchIcon from "../images/searchIcon.svg"

const Header = ({ loadFood }) => {
	const [hideSearchBar, setHideSearchBar] = useState(false);
	const profileIconImg = <img src={ profileIcon } alt="profileIcon" />;
	const searchIconImg = <img src={ searchIcon } alt="searchIcon" />;

	const searchButtonProps = {
		name: searchIconImg,
		onClick: () => setHideSearchBar(!hideSearchBar),
		id: "lookingGlass",
	};

  return (
		<div>
			<Link to="/profile">
				{ profileIconImg }
			</Link>
			Titulo
			<Button {...searchButtonProps} />
			{ hideSearchBar && <SearchBar loadFood={loadFood} /> }
		</div>
	);
}

export default Header;
