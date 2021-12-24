import React, { useEffect, useState } from "react";
import {
  emailValidator,
  passwordLengthValidator,
  passwordMatcher, validateUserName
} from "../services/validators";
import Checkbox from "../components/Checkbox";
import { saveProfileData } from "../services/localStorage";
import { Navigate } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import { IconButton, InputAdornment, TextField } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Visibility, VisibilityOff } from "@material-ui/icons";

const SignUp = () => {

  const [fullName, setFullName] = useState('');

  const [email, setEmail] = useState('');

  const [passwordInput, setPasswordInput] = useState('');
  const [passwordHidden, setPasswordHidden] = useState(true);

  const [confirmPassword, setConfirmPassword] = useState('');
  const [hideConfirm, setHideConfirm] = useState(false);

  const [allowRedirect, setAllowRedirect] = useState(false);
  const [disableSignUp, setDisableSignUp] = useState(true);
  const [configurePreferences, setConfigurePreferences] = useState(true);

  useEffect(() => {
    const isUsernameValid = validateUserName(fullName);
    const isEmailValid = emailValidator(email);
    const isPasswordValid = passwordLengthValidator(passwordInput);
    const doPasswordsMatch = passwordMatcher(passwordInput, confirmPassword);
    if(isEmailValid && isUsernameValid && isPasswordValid && doPasswordsMatch) {
      return setDisableSignUp(false);
    }
    setDisableSignUp(true);
  }, [fullName, email, passwordInput, confirmPassword]);

  const nameProps = {
    id: 'nomeCompleto',
    margin: 'normal',
    variant: 'filled',
    fullWidth: true,
    required: true,
    label: 'Name',
    InputProps: {
      endAdornment: <InputAdornment position="end"><AccountBoxIcon color="primary" /></InputAdornment>
    },
    onChange: ({ target: { value } }) => setFullName(value),
  };

  const emailProps = {
    id: "email",
    label: "Email",
    margin: 'normal',
    variant: 'filled',
    fullWidth: true,
    required: true,
    InputProps: {
      endAdornment: <InputAdornment position="end"><EmailIcon color="primary" /></InputAdornment>
    },
    onChange: ({ target: { value } }) => setEmail(value),
    type: "email",
  };

  const passwordInputProps = {
    id: "Senha",
    label: "Password",
    margin: 'normal',
    variant: 'filled',
    fullWidth: true,
    required: true,
    onChange: ({ target: { value } }) => setPasswordInput(value),
    type: passwordHidden ? "password" : "text",
    InputProps: {
      endAdornment: <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={() => setPasswordHidden(!passwordHidden)}
          edge="end"
        >
          { passwordHidden ? <VisibilityOff color="primary" /> : <Visibility color="primary" />}
        </IconButton>
      </InputAdornment>
    },
  };

  const confirmPasswordProps = {
    id: "ConfirmarSenha",
    label: "Confirm password",
    margin: 'normal',
    variant: 'filled',
    fullWidth: true,
    required: true,
    onChange: ({ target: { value } }) => setConfirmPassword(value),
    type: passwordHidden ? "password" : "text",
    InputProps: {
      endAdornment: <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={() => setHideConfirm(!hideConfirm)}
          edge="end"
        >
          { hideConfirm ? <VisibilityOff color="primary" /> : <Visibility color="primary" />}
        </IconButton>
      </InputAdornment>
    },
  };

  const signUpButtonProps = {
    id: "Cadastrar",
    name: "Cadastrar",
    color: 'primary',
    variant: 'contained',
    size: 'large',
    fullWidth: true,
    onClick: () => {
      saveProfileData(fullName, email, passwordInput);
      setAllowRedirect(true);
    },
    disabled: disableSignUp,
  };

  const checkboxProps = {
    text: 'Configurar preferências depois do cadastro?',
    onChange: () => {
      setConfigurePreferences(true);
    },
    startChecked: true,
  };

  if(configurePreferences && allowRedirect) return <Navigate to="/preferences" />;

  if(allowRedirect) return <Navigate to="/main" />;

  return (
    <div>
      <h1>Cadastre-se</h1>
      <TextField {...nameProps} />
      <TextField {...emailProps} />
      <TextField {...passwordInputProps} />
      <TextField {...confirmPasswordProps} />
      <Checkbox {...checkboxProps} />
      <Button {...signUpButtonProps}>
        Signup
      </Button>
      <div style={{ display: 'flex' }}>
        <p>Already have an account?</p>
        <Button variant='text' color='primary' size="small" href="/" disableRipple disableFocusRipple>
          Login
        </Button>
      </div>
    </div>
  );
};

export default SignUp;