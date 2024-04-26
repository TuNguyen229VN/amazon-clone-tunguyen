import React, { useEffect, useState } from "react";
import styles from "../styles/Error.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_RANDOM_DOG } from "../constant/constanst";
import { HOME_ROUTE } from "../constant/routesApp";
import { STATUS_SUCCESS } from "../constant/status";
import { Skeleton, useMediaQuery } from "@mui/material";
const ErrorPage = () => {
  const [imageDog, setImageDog] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const getImageDog = async () => {
      try {
        const res = await axios.get(API_RANDOM_DOG);
        if (res.status === STATUS_SUCCESS) {
          setImageDog(res.data?.message);
        }
      } catch (error) {
        return;
      } finally {
        setLoading(false);
      }
    };

    getImageDog();
  }, []);

  return (
    <div className={styles.errorPage}>
      {!loading ? (
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
      ) : (
        <ErrorPageSkeleton />
      )}
    </div>
  );
};

const ErrorPageSkeleton = () => {
  const is1024Screen = useMediaQuery("(max-width: 1024px)");
  const is768Screen = useMediaQuery("(max-width: 768px)");
  const is480Screen = useMediaQuery("(max-width: 480px)");
  return (
    <>
      <Skeleton
        variant="text"
        height={
          is480Screen
            ? "72px"
            : is768Screen
            ? "95px"
            : is1024Screen
            ? "120px"
            : "144px"
        }
        width={
          is480Screen
            ? "280px"
            : is768Screen
            ? "300px"
            : is1024Screen
            ? "380xp"
            : "400px"
        }
        sx={{ margin: "0px auto" }}
      />
      <Skeleton
        variant="text"
        height={
          is480Screen
            ? "29px"
            : is768Screen
            ? "35px"
            : is1024Screen
            ? "42px"
            : "48px"
        }
        width={
          is480Screen
            ? "280px"
            : is768Screen
            ? "300px"
            : is1024Screen
            ? "380xp"
            : "400px"
        }
        sx={{ margin: "0px auto" }}
      />
      <Skeleton
        variant="text"
        height={
          is480Screen
            ? "17px"
            : is768Screen
            ? "18px"
            : is1024Screen
            ? "21px"
            : "24px"
        }
        width={
          is480Screen
            ? "280px"
            : is768Screen
            ? "300px"
            : is1024Screen
            ? "380xp"
            : "400px"
        }
        sx={{ margin: "0px auto" }}
      />
      <Skeleton
        variant="rectangular"
        height={
          is480Screen
            ? "280px"
            : is768Screen
            ? "300px"
            : is1024Screen
            ? "380xp"
            : "400px"
        }
        width={
          is480Screen
            ? "280px"
            : is768Screen
            ? "300px"
            : is1024Screen
            ? "380xp"
            : "400px"
        }
        sx={{ margin: "20px auto" }}
      />
    </>
  );
};
export default ErrorPage;
