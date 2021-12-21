import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import checkLogin from '../services/loginValidator';
import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import { Link } from 'react-router-dom';
import { FormControl, InputAdornment, InputLabel, TextField } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

function Login() {
  const [email, setEmail] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    setIsDisabled(checkLogin(email, passwordInput));
  }, [email, passwordInput]);

  if (redirect) return <Navigate to="/main" />;

  const emailInputProps = {
    label: "Email",
    id: "explorer-email",
    fieldValue: email,
    setFieldValue: setEmail,
    type: "email",
    variant: "filled",
    InputProps: {
      endAdornment: <InputAdornment><EmailIcon color="primary" /></InputAdornment>,
    },
  };

  const passwordInputProps = {
    id: "password",
    label: "Password",
    fieldValue: passwordInput,
    setFieldValue: setPasswordInput,
    type: "password",
    variant: "filled",
    InputProps: {
      endAdornment: <InputAdornment><VpnKeyIcon color="primary" /></InputAdornment>,
    },
  };

  const loginButtonProps = {
    id: "submitLogin",
    onClick: () => setRedirect(true),
    disabled:  isDisabled,
    variant: 'contained'
  };

  const noAccount = <pre className="noAccount">Ainda não possui cadastro? <Link to="/signup">Cadastre-se</Link></pre>;

  return (
    <div>
      <TextField {...emailInputProps} />
      <TextField {...passwordInputProps} />
    </div>
  );
}

export default Login;
