/* eslint-disable react/button-has-type */
import React from 'react';
import imgLogin from 'src/assets/img/logo-explorastro.png';
import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai';
import PropTypes from 'prop-types';

export default function Login({
  changeField,
  email,
  password,
  handleLogin,
  loginError,
}) {
  let topMessage;
  const handleChange = (event) => {
    changeField(event.target.value, event.target.name);
  };
  const handleForm = (e) => {
    e.preventDefault();

    handleLogin();
  };

  if (loginError?.message?.includes('the login or password is incorrect')) {
    topMessage = 'Le login ou le mot de passe est incorrect';
  }
  else if (loginError?.message?.includes('All input is required')) {
    topMessage = 'Veuillez remplir tous les champs';
  }
  else if (
    loginError?.error?.includes('"password" is not allowed to be empty')
  ) {
    topMessage = 'Veuillez remplir le champ password';
  }
  else if (
    loginError?.error?.includes('"email" is not allowed to be empty')
  ) {
    topMessage = 'Veuillez remplir le champ email';
  }

  return (
    <div className="login">
      <div className="loginBox">
        <img src={imgLogin} alt="imgLogin" className="imgLogin" />
        <h2>Connectez-vous et partez à la découverte du ciel !</h2>

        <form onSubmit={handleForm} className="loginForm">
          {loginError && <div className="loginError">{topMessage}</div>}
          <div className="inputContainer">
            <AiOutlineUser className="iconUser" />
            <input
              placeholder="Email"
              value={email}
              name="email"
              className="loginInput"
              onChange={handleChange}
              type="email"
            />
            <AiOutlineLock className="iconPassword" />
            <input
              placeholder="Password"
              className="loginInput"
              value={password}
              name="password"
              onChange={handleChange}
            />
          </div>
          <button className="loginButton">Se connecter</button>
        </form>
        <span className="loginForgot">Mot de passe oublié</span>
        <span className="loginRegisterButton">Créer mon compte</span>
        <span className="copyright">©2021 - Explorastro</span>
      </div>
    </div>
  );
}

Login.propTypes = {
  loginError: PropTypes.string.isRequired,
  handleLogin: PropTypes.func.isRequired,
  changeField: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};
