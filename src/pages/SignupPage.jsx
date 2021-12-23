import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  emailValidator,
  passwordLengthValidator,
  passwordMatcher, validateUserName
} from "../services/validators";
import Checkbox from "../components/Checkbox";
import { saveProfileData } from "../services/localStorage";
import { Navigate } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import { InputAdornment, TextField } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const SignUp = () => {

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
    onChange: ({ target: { value } }) => setFullName(value),
  };

  const emailProps = {
    id: "email",
    label: "Email",
    margin: 'normal',
    variant: 'filled',
    fullWidth: true,
    required: true,
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
    type: "password",
  };

  const confirmPasswordProps = {
    id: "ConfirmarSenha",
    label: "Confirm password",
    margin: 'normal',
    variant: 'filled',
    fullWidth: true,
    required: true,
    onChange: ({ target: { value } }) => setConfirmPassword(value),
    type: "password",
  };

  const signUpButtonProps = {
    id: "Cadastrar",
    name: "Cadastrar",
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

  const alreadySingnedUp = <pre className="noAccount">
    Já possui um cadastro? <Link to="/">Login</Link>
  </pre>;

  const nameWarning = <div>
      O nome deve conter apenas letras!
    </div>;
  const emailWarning = <div>
      O email deve ter o formato correto.
    </div>;
  const passwordLengthWarning = <div>
      A senha deve ter pelo menos oito caracteres.
    </div>;
  const differentPasswordsWarning = <div>
      As senhas devem ser iguais.
    </div>;

  if(configurePreferences && allowRedirect) return <Navigate to="/preferences" />;

  if(allowRedirect) return <Navigate to="/main" />;

  return (
    <div>
      <h1>Cadastre-se</h1>
      <TextField {...nameProps} />
      {(!validateUserName(fullName) && fullName !== '') && nameWarning}
      <TextField {...emailProps} />
      {(!emailValidator(email) && email !== '') && emailWarning}
      <TextField {...passwordInputProps} />
      {(!passwordLengthValidator(passwordInput) && passwordInput !== '') && passwordLengthWarning}
      <TextField {...confirmPasswordProps} />
      {!passwordMatcher(passwordInput, confirmPassword) && differentPasswordsWarning}
      <Checkbox {...checkboxProps} />
      <div>{alreadySingnedUp}</div>
      <Button {...signUpButtonProps} />
    </div>
  );
};

export default SignUp;