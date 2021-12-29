import React from "react";
import { Button, Tooltip } from "@material-ui/core";
import PersonIcon from '@material-ui/icons/Person';

const ProfileButton = () => {
	const profileProps = {
		id: 'profile',
		variant: 'contained',
		color: 'primary',
		href: '/profile',
	};

  return (
		<Tooltip title="See profile" placement="left">
			<Button style={{ width: '50px', height: '50px' }} {...profileProps} >
				<PersonIcon fontSize="large" />
			</Button>
		</Tooltip>
	);
}

export default ProfileButton;
