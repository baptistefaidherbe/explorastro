/* eslint-disable react/button-has-type */
import React from 'react';
import imgLogin from 'src/assets/img/logo-explorastro.png';
import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai';

export default function Login() {
  return (
    <div className="login">
      <div className="loginBox">
        <img src={imgLogin} alt="limgLogin" className="imgLogin" />
        <h2>Connectez-vous et partez à la découverte du ciel !</h2>
        <div className="inputContainer">
          <AiOutlineUser className="iconUser" />
          <input placeholder="Email" className="loginInput" />
          <AiOutlineLock className="iconPassword" />
          <input placeholder="Password" className="loginInput" />
        </div>
        <button className="loginButton">Se connecter</button>
        <span className="loginForgot">Mot de passe oublié</span>
        <span className="loginRegisterButton">Créer mon compte</span>
        <span className="copyright">©2021 - Explorastro</span>
      </div>
    </div>
  );
}
