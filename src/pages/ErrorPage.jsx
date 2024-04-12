import React, { useEffect, useState } from "react";
import styles from "../styles/Error.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_RANDOM_DOG } from "../constant/constanst";
import { HOME_ROUTE } from "../constant/routesApp";
import { STATUS_SUCCESS } from "../constant/status";
const ErrorPage = () => {
  const [imageDog, setImageDog] = useState("");
  useEffect(() => {
    const getImageDog = async () => {
      try {
        const res = await axios.get(API_RANDOM_DOG);
        if (res.status === STATUS_SUCCESS) {
          setImageDog(res.data?.message);
        }
      } catch (error) {
        return;
      }
    };
    getImageDog();
  }, []);

  return (
    <div className={styles.errorPage}>
      <Link to={HOME_ROUTE} className={styles.errorPage__link}>
        <h2 className={styles.errorPage__title}>Sorry</h2>
        <p className={styles.errorPage__content}>
          we couldn&apos;t find that page
        </p>
        <p className={styles.errorPage__desc}>
          Try searching or go to{" "}
          <Link to={HOME_ROUTE}>Amazon&apos;s home page</Link>
        </p>
        {imageDog && (
          <img
            src={imageDog}
            alt="dog image"
            className={styles.errorPage__img}
          />
        )}
      </Link>
    </div>
  );
};

export default ErrorPage;
