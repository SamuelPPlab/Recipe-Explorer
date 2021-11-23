import React from "react";
import { Link } from 'react-router-dom';
import SwitchMainPage from "./SwitchMainPage";
import Button from "./Button";
import profileIcon from "../images/profileIcon.svg";

const Header = ({ isItFood, title }) => {
	const profileIconImg = <img src={ profileIcon } alt="profileIcon" style={{ width: '50px', height: '50px' }} />;

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
