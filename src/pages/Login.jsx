import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import { InputAdornment, TextField } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import { emailValidator, passwordLengthValidator } from '../services/validators';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function Login() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const [isDisabled, setIsDisabled] = useState(true);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const isEmailValid = emailValidator(email);
    setEmailError(!isEmailValid && email !== '');

    const isPasswordValid = passwordLengthValidator(passwordInput);
    setPasswordError(!isPasswordValid && passwordInput !== '');

    if (isEmailValid && isPasswordValid) {
      return setIsDisabled(false);
    }
    return setIsDisabled(true);
  }, [email, passwordInput]);

  if (redirect) return <Navigate to="/main" />;

  const emailInputProps = {
    label: "Email",
    margin: "normal",
    id: "explorer-email",
    onChange: ({ target: { value } }) => setEmail(value),
    type: "email",
    variant: "filled",
    InputProps: {
      endAdornment: <InputAdornment position="end"><EmailIcon color={emailError ? "error" : "primary"} /></InputAdornment>,
    },
    fullWidth: true,
    error: emailError,
    placeholder: 'user@host.com.br',
    required: true,
  };

  const passwordInputProps = {
    id: "password",
    margin: "normal",
    label: "Password",
    onChange: ({ target: { value } }) => setPasswordInput(value),
    type: "password",
    variant: "filled",
    InputProps: {
      endAdornment: <InputAdornment position="end"><VpnKeyIcon color={passwordError ? "error" : "primary"} /></InputAdornment>,
    },
    fullWidth: true,
    error: passwordError,
    required: true,
    helperText: passwordError && 'Password must be 8 characters long',
  };

  const loginButtonProps = {
    id: "submitLogin",
    onClick: () => setRedirect(true),
    disabled:  isDisabled,
    color: 'primary',
    variant: 'contained',
    size: 'large',
    fullWidth: true,
  };

  return (
    <div style={{ height: '100vh', width: '100vw', marginLeft: '-8px', marginTop: '-8px', position: 'fixed', background: 'radial-gradient(circle, rgba(237,237,237,1) 53%, rgba(162,162,162,1) 100%)' }}>
      <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ width: '80%', height: '50%', marginLeft: '10%', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <div style={{ width: '30vw', justifyContent: 'center' }}>
            <h1 style={{ fontWeight: "bold", fontSize: "3em", textAlign: "center", textShadow: '0 0 5px #3f51b5' }}>
              Seja bem-vindo!
            </h1>
            <TextField {...emailInputProps} />
            <TextField {...passwordInputProps} />
            <div style={{ width: '80%', marginTop: '4%', marginLeft: '10%', display: 'flex', justifyContent: 'center' }}>
              <Button {...loginButtonProps}>
                Entrar
              </Button>
            </div>
            <div style={{ display: 'flex', marginTop: '2%', justifyContent: 'center' }}>
              <p>Ainda não possui cadastro?</p>
                <Button variant='text' color='primary' size="small" href="/signup" disableRipple disableFocusRipple>
                  Cadastre-se!
                </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default Login;
