import React, { useEffect, useState } from "react";
import { useStateValue } from "../../hooks/useStateValue";
import styles from "./styles/Payment.module.css";
import { AddressFormPopup } from "../../components/popup";
import { getUserProfile } from "../../utils/getUserProfile";
import { useTranslation } from "react-i18next";

const PaymentDeliveryAddress = () => {
  const [t, i18n] = useTranslation("global");
  const [{ basket, user }, dispatch] = useStateValue();
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState(user?.userProfile?.userAddress);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getUserProfile(user.auth, dispatch);
  }, []);

  useEffect(() => {
    setAddress(user?.userProfile?.userAddress);
  }, [user?.userProfile?.userAddress]);

  return (
    <>
      <div className={styles.payment__title}>
        <h3>{t("order.Delivery Address")}</h3>
      </div>
      <div className={styles.payment__address}>
        <p>{user?.auth?.email}</p>

        {user?.userProfile?.userAddress && (
          <p>
            {address?.houseNumber}, {address?.ward.ward_name},{" "}
            {address?.district.district_name}, {address?.city.province_name}
          </p>
        )}
        <button onClick={handleOpen} className={styles.payment__openPopup}>
          {!user?.userProfile?.userAddress ? t("order.Add new address") : t("order.Edit address")}
        </button>
      </div>
      <AddressFormPopup isOpen={open} onClose={handleClose} />
    </>
  );
};

export default PaymentDeliveryAddress;
