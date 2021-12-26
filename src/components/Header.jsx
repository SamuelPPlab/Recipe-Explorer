import React from "react";
import { Button } from "@material-ui/core";
import SwitchMainPage from "./SwitchMainPage";
import PersonIcon from '@material-ui/icons/Person';

const Header = ({ isItFood, title }) => {
	const profileProps = {
		id: 'profile',
		variant: 'contained',
		color: 'primary',
		href: '/profile',
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
				<Button style={{ width: '50px', height: '50px' }} {...profileProps} >
					<PersonIcon fontSize="large" />
				</Button>
			</div>
		</div>
	);
}

export default Header;
