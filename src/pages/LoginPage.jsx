import React, { useEffect, useState } from "react";
import styles from "../styles/Login.module.css";
import LogoBlack from "/assets/logo_black.png";
import { Link, useNavigate } from "react-router-dom";
import { ButtonPrimary } from "../components/button";
import { auth, db } from "../firebase/firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { HOME_ROUTE } from "../constant/routesApp";
import { showToast } from "../utils/showToast";
import { useTranslation } from "react-i18next";
const LoginPage = () => {
  const [t, i18n] = useTranslation("global");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.title = "Amazon Sign-In";
  }, []);

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        navigate(HOME_ROUTE);
      })
      .catch((error) => {
        if (error.message.includes("(auth/invalid-credential)")) {
          showToast(t("toast.Email or password not correct"));
        } else {
          showToast(t("toast.Invalid email or password"));
        }
      });
  };

  const register = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        if (auth) {
          navigate(HOME_ROUTE);
        }
      })
      .catch((error) => {
        if (error.message.includes("(auth/email-already-in-use)")) {
          showToast(t("toast.Email already in use"));
        } else if (error.message.includes("(auth/weak-password)")) {
          showToast(t("toast.Password so weak"));
        } else {
          showToast(t("toast.Invalid email or password to create"));
        }
      });
  };
  return (
    <div className={styles.login}>
      <Link to={HOME_ROUTE}>
        <img src={LogoBlack} alt="logo" className={styles.login__logo} />
      </Link>
      <div className={styles.login__fluidContainer}>
        <div className={styles.login__container}>
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
              className={styles.login__signInButton}
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
        <p className={styles.login__textNew}>New to Amazon?</p>
        <ButtonPrimary
          onClick={register}
          text="Create your Amazon account"
          className={styles.login__registerButton}
        />
      </div>
    </div>
  );
};

export default LoginPage;
