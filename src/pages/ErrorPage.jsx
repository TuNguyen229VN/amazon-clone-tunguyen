import React, { useEffect, useState } from "react";
import styles from "../styles/Error.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_RANDOM_DOG } from "../constant/constanst";
import { HOME_ROUTE } from "../constant/routesApp";
import { STATUS_SUCCESS } from "../constant/status";
import { Skeleton } from "@mui/material";
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
  return (
    <>
      <Skeleton variant="text" height={144} width={400} sx={{margin:"0px auto"}}/>
      <Skeleton variant="text" height={48} width={400} sx={{margin:"0px auto"}}/>
      <Skeleton variant="text" height={24} width={400} sx={{margin:"00px auto"}}/>
      <Skeleton variant="rectangular" height={400} width={400} sx={{margin:"20px auto"}}/>
    </>
  );
};
export default ErrorPage;
