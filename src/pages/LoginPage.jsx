import React, { useState } from "react";
import "../styles/Login.css";
import LogoBlack from "../assets/logo_black.png";
import { Link, useNavigate } from "react-router-dom";
import { ButtonPrimary } from "../components/button";
import { auth } from "../firebase/firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        navigate("/");
      })
      .catch((error) => alert(error.message));
  };

  const register = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        if (auth) {
          navigate("/");
        }
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <Link to={"/"}>
        <img src={LogoBlack} alt="logo" className="login__logo" />
      </Link>
      <div className="login__fluidContainer">
        <div className="login__container">
          <h1>Sign in</h1>
          <form>
            <h5>Email</h5>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <h5>Password</h5>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <ButtonPrimary
              className="login__signInButton"
              text="Sign in"
              type="submit"
              onClick={signIn}
            />
          </form>
          <p>
            By signing-in, you agree to Amazon&apos;s Conditions of Use and
            Privacy. Please see our Privacy Notice, our Cookies Notice and our
            Interest Based Ads Notice.
          </p>
        </div>
        <p className="login__textNew">New to Amazon?</p>
        <ButtonPrimary
          onClick={register}
          text="Create your Amazon account"
          className="login__regiterButton"
        />
      </div>
    </div>
  );
};

export default LoginPage;
