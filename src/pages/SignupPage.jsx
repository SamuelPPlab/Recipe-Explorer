import React, { useEffect, useState } from "react";
import {
  emailValidator,
  passwordLengthValidator,
  passwordMatcher, validateUserName
} from "../services/validators";
import Checkbox from '@material-ui/core/Checkbox';
import { saveProfileData } from "../services/localStorage";
import { Navigate } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import { FormControlLabel, IconButton, InputAdornment, TextField } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Visibility, VisibilityOff } from "@material-ui/icons";

const SignUp = () => {

  const [fullName, setFullName] = useState('');
  const [nameError, setNameError] = useState(false);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const [passwordInput, setPasswordInput] = useState('');
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [passwordError, setPasswordError] = useState(false)

  const [confirmPassword, setConfirmPassword] = useState('');
  const [hideConfirm, setHideConfirm] = useState(false);
  const [confirmError, setConfirmError] = useState(false);

  const [configurePreferences, setConfigurePreferences] = useState(true);

  const [allowRedirect, setAllowRedirect] = useState(false);
  const [disableSignUp, setDisableSignUp] = useState(true);

  useEffect(() => {
    const isUsernameValid = validateUserName(fullName);
    setNameError(!isUsernameValid && fullName !== '');

    const isEmailValid = emailValidator(email);
    setEmailError(!isEmailValid && email !== '');

    const isPasswordValid = passwordLengthValidator(passwordInput);
    setPasswordError(!isPasswordValid && passwordInput !== '');

    const doPasswordsMatch = passwordMatcher(passwordInput, confirmPassword);
    setConfirmError(!doPasswordsMatch && confirmPassword !== '');

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
      endAdornment: <InputAdornment position="end"><AccountBoxIcon color={nameError ? "secondary" : "primary"} /></InputAdornment>
    },
    onChange: ({ target: { value } }) => setFullName(value),
    error: nameError,
    helperText: nameError && 'No special characters or numbers allowed.'
  };

  const emailProps = {
    id: "email",
    label: "Email",
    margin: 'normal',
    variant: 'filled',
    fullWidth: true,
    required: true,
    InputProps: {
      endAdornment: <InputAdornment position="end"><EmailIcon color={emailError ? "secondary" : "primary"} /></InputAdornment>
    },
    onChange: ({ target: { value } }) => setEmail(value),
    type: "email",
    error: emailError,
    helperText: emailError && 'Email must have the correct format.'
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
          { passwordHidden ? <VisibilityOff color={passwordError ? "secondary" : "primary"} /> : <Visibility color="primary" />}
        </IconButton>
      </InputAdornment>
    },
    error: passwordError,
    helperText: passwordError && 'Password must have at least 8 characters.'
  };

  const confirmPasswordProps = {
    id: "ConfirmarSenha",
    label: "Confirm password",
    margin: 'normal',
    variant: 'filled',
    fullWidth: true,
    required: true,
    onChange: ({ target: { value } }) => setConfirmPassword(value),
    type: hideConfirm ? "password" : "text",
    InputProps: {
      endAdornment: <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={() => setHideConfirm(!hideConfirm)}
          edge="end"
        >
          { hideConfirm ? <VisibilityOff color={confirmError ? "secondary" : "primary"} /> : <Visibility color={confirmError ? "secondary" : "primary"} />}
        </IconButton>
      </InputAdornment>
    },
    error: confirmError,
    helperText: confirmError && 'Passwords must match.'
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

  if(configurePreferences && allowRedirect) return <Navigate to="/preferences" />;

  if(allowRedirect) return <Navigate to="/main" />;

  return (
    <div style={{ width: '40%' }}>
      <h1>Cadastre-se</h1>
      <TextField {...nameProps} />
      <TextField {...emailProps} />
      <TextField {...passwordInputProps} />
      <TextField {...confirmPasswordProps} />
      <FormControlLabel
        label="Configure preferences next?"
        control={
          <Checkbox
            checked={configurePreferences}
            onChange={() => setConfigurePreferences(!configurePreferences)}
            color="primary"
          />
        }
      />
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