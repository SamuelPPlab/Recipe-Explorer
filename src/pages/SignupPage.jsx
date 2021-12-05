import React, { useEffect, useState } from "react";
import Input from '../components/Input';
import Button from '../components/Button';
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import {
  emailValidator,
  passwordLengthValidator,
  passwordMatcher, validateUserName
} from "../services/validators";


const SignUp = () => {

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [goToMain, setGoToMain] = useState(false);
  const [disableSignUp, setDisableSignUp] = useState(true);

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

  const inputBoxTextStyle = {
    width: '51px',
    height: '27px',
    fontSize: '18px',
    lineHeight: '150%',
    letterSpacing: '0.007em',
    color: '#1C2025',
    paddingTop: '30px',
    paddingLeft: '25px',
    paddingBottom: '50px'
  };

  const nameProps = {
    id: 'nomeCompleto',
    name: 'Nome Completo',
    fieldValue: fullName,
    setFieldValue: setFullName,
    style: inputBoxTextStyle,
    className: 'inputBox',
  };

  const emailProps = {
    id: "email",
    name: "Email",
    fieldValue: email,
    setFieldValue: setEmail,
    type: "email",
    style: inputBoxTextStyle,
    className: 'inputBox',
  };

  const passwordInputProps = {
    id: "Senha",
    name: "Senha",
    fieldValue: passwordInput,
    setFieldValue: setPasswordInput,
    type: "password",
    style: inputBoxTextStyle,
    className: 'inputBox',
  };

  const confirmPasswordProps = {
    id: "ConfirmarSenha",
    name: "Confirmar Senha",
    fieldValue: confirmPassword,
    setFieldValue: setConfirmPassword,
    type: "password",
    style: inputBoxTextStyle,
    className: 'inputBox',
  };

  const signUpButtonProps = {
    id: "Cadastrar",
    name: "Cadastrar",
    onClick: () => {
      setGoToMain(true);
    },
    disabled: disableSignUp,
    className: disableSignUp ? 'submitLoginDisabled' : 'submitLoginEnabled',
  };

  const alreadySingnedUp = <pre className="noAccount">
    Já possui um cadastro? <Link to="/">Login</Link>
  </pre>;

  const nameWarning = <div className="warningText warningPadding">
      O nome deve conter apenas letras!
    </div>;
  const emailWarning = <div className="warningText warningPadding">
      O email deve ter o formato correto.
    </div>;
  const passwordLengthWarning = <div className="warningText warningPadding">
      A senha deve ter pelo menos oito caracteres.
    </div>;
  const differentPasswordsWarning = <div className="warningText warningPadding">
      As senhas devem ser iguais.
    </div>;

  if(goToMain) return <Redirect to="/main" />;

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '50%', display: 'flex', justifyContent: 'center', paddingTop: '80px' }}>
        <div id="signupFormContainer">
          <h1 className="welcomeText">Cadastre-se</h1>
          <Input {...nameProps} />
          {(!validateUserName(fullName) && fullName !== '') && nameWarning}
          <Input {...emailProps} />
          {(!emailValidator(email) && email !== '') && emailWarning}
          <Input {...passwordInputProps} />
          {(!passwordLengthValidator(passwordInput) && passwordInput !== '') && passwordLengthWarning}
          <Input {...confirmPasswordProps} />
          {!passwordMatcher(passwordInput, confirmPassword) && differentPasswordsWarning}
          <div>{alreadySingnedUp}</div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button {...signUpButtonProps} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;