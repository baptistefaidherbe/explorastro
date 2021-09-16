/* eslint-disable react/button-has-type */
import React from 'react';
import imgLogin from 'src/assets/img/logo-explorastro.png';

export default function Login() {
  return (
    <div className="register">
      <div className="leftBox">
        <img src={imgLogin} alt="imgRegister" className="imgRegister" />
        <span>
          Envie de découvrir le ciel tous en faisant des rencontres entre
          passionnés ? N'attendez plus et rejoignez l'aventure Explorastro !
        </span>
        <button className="backLogin">Se connecter</button>
      </div>
      <div className="registerBox">
        <div className="inputContainer">
          <label htmlFor="firsname" className="firsname">
            Prenom
            <input
              placeholder="Prenom"
              className="loginInput"
              name="firsname"
            />
          </label>
          <label htmlFor="lastname" className="lastname">
            Nom
            <input placeholder="Nom" className="loginInput" name="lastname" />
          </label>
          <label htmlFor="birth" className="birth">
            Date de naissance
            <input
              placeholder="Date de naissance"
              type="date"
              className="loginInput"
              name="birth"
            />
          </label>
          <label htmlFor="username" className="username">
            Pseudo
            <input
              placeholder="pseudo"
              className="loginInput"
              name="username"
            />
          </label>
          <label htmlFor="email" className="email">
            Email
            <input
              placeholder="Email"
              type="email"
              className="loginInput"
              name="email"
            />
          </label>
          <label htmlFor="password" className="password">
            Mot de passe
            <input
              placeholder="Mot de passe"
              type="password"
              className="loginInput"
              name="password"
            />
          </label>
          <label htmlFor="passwordConfirm" className="password">
            Confirmer mot de passe
            <input
              placeholder="Confirmer mot de passe"
              type="password"
              className="loginInput"
              name="passwordConfirm"
            />
          </label>
        </div>
        <button className="registerButton">S'inscrire</button>
        {/* <span className="copyright">©2021 - Explorastro</span> */}
      </div>
    </div>
  );
}
