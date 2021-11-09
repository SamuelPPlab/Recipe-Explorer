import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { mainPageFetcher } from "../redux/actions/mainPage";
import SwitchMainPage from "./SwitchMainPage";
import Button from "./Button";
import profileIcon from "../images/profileIcon.svg";
import searchIcon from "../images/searchIcon.svg";
import x from "../images/x-icon.png";

const Header = ({ isItFood, title, isSearchResult }) => {
	const profileIconImg = <img src={ profileIcon } alt="profileIcon" style={{ width: '50px', height: '50px' }} />;
	const searchIconImg = <img src={ searchIcon } alt="searchIcon" style={{ width: '50px', height: '50px' }} />;
	const XIconImg = <img src={ x } alt="X" style={{ width: '50px', height: '50px' }} />;

	const dispatch = useDispatch();

	const clearSearchResultsProps = {
		name: XIconImg,
		onClick: () => dispatch(mainPageFetcher(isItFood)),
		id: 'ClearSearch',
	};

	const profileButtonProps = {
		name: profileIconImg,
		onClick: () => null,
		id: 'Profile Button',
	};

  return (
		<div>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<div>
					<SwitchMainPage isItFood={isItFood} />
				</div>
				<div>
					{ <h1>{title}</h1> }
				</div>
				<Link to="/profile">
					<Button {...profileButtonProps} />
				</Link>
			</div>
		</div>
	);
}

export default Header;
