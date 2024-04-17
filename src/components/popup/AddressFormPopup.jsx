import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import styles from "./styles/AddressFormPopup.module.css";
import PropTypes from "prop-types";
import axios from "axios";
import { API_PROVINCE } from "../../constant/constanst";
import { STATUS_SUCCESS } from "../../constant/status";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import { useStateValue } from "../../hooks/useStateValue";
import { getUserProfile } from "../../utils/getUserProfile";

const AddressFormPopup = ({ isOpen, onClose }) => {
  const [{ user, basket }, dispatch] = useStateValue();
  const [address, setAddress] = useState({
    houseNumber: "",
    ward: "",
    district: "",
    city: "",
  });

  const [addressError, setAddressError] = useState({
    houseNumber: "",
    ward: "",
    district: "",
    city: "",
  });

  useEffect(() => {
    if (user?.userProfile?.userAddress) {
      let userProfile = user?.userProfile?.userAddress;
      setAddress({
        ...address,
        houseNumber: userProfile.houseNumber,
        ward: userProfile.ward,
        district: userProfile.district,
        city: userProfile.city,
      });
    }
  }, [onClose]);

  const [wardList, setWardList] = useState([]);
  const [districtsList, setDistrictsList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);

  useEffect(() => {
    const getCitiesList = async () => {
      try {
        const res = await axios.get(API_PROVINCE);
        if (res.status === STATUS_SUCCESS) {
          setCitiesList(res.data?.results);
        }
      } catch (error) {
        return;
      }
    };

    const getDistrictsList = async () => {
      try {
        const res = await axios.get(
          `${API_PROVINCE}/district/${address.city?.province_id}`
        );
        if (res.status === STATUS_SUCCESS) {
          setDistrictsList(res.data?.results);
        }
      } catch (error) {
        return;
      }
    };

    const getWardList = async () => {
      try {
        const res = await axios.get(
          `${API_PROVINCE}/ward/${address.district?.district_id}`
        );
        if (res.status === STATUS_SUCCESS) {
          setWardList(res.data?.results);
        }
      } catch (error) {
        return;
      }
    };
    if (address.city) {
      getDistrictsList();
    }

    if (address.city && address.district) {
      getWardList();
    }

    getCitiesList();
  }, [address]);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    let newAddressError = {};
    if (!address.houseNumber)
      newAddressError.houseNumber = "Please fill house number";
    if (!address.city) newAddressError.city = "Please fill city";
    if (!address.district) newAddressError.district = "Please fill district";
    if (!address.ward) newAddressError.ward = "Please fill ward";
    setAddressError(newAddressError);
    if (Object.keys(newAddressError).length > 0) {
      return;
    } else {
      // Do something with the address data, like sending it to a server
      await saveUserAddress();
      getUserProfile(user.auth, dispatch);
      onClose();
    }
  };

  const saveUserAddress = async () => {
    if (!user?.auth?.uid) {
      alert("User ID is missing.");
      return;
    }
    const userDocRef = doc(db, "users", user?.auth?.uid);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      // Nếu tài liệu user đã tồn tại, cập nhật địa chỉ
      setDoc(userDocRef, {
        userAddress: address,
      });
    } else {
      // Nếu tài liệu user không tồn tại, thêm mới với địa chỉ
      setDoc(userDocRef, {
        userAddress: address,
      });
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>Enter Address</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please fill out the address form below:
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          name="houseNumber"
          label="House Number"
          type="text"
          fullWidth
          value={address.houseNumber}
          onChange={handleChange}
          sx={{ marginBlock: "20px" }}
          error={Boolean(addressError.houseNumber)}
          helperText={addressError.houseNumber || ""}
        />
        <Autocomplete
          margin="dense"
          name="city"
          options={citiesList}
          getOptionLabel={(option) => option?.province_name || ""}
          renderInput={(params) => (
            <TextField
              {...params}
              label="City/ Province"
              error={Boolean(addressError.city)}
              helperText={addressError.city || ""}
            />
          )}
          value={
            citiesList.find(
              (cities) => cities?.province_id === address.city?.province_id
            ) || null
          }
          onChange={(event, newValue) => {
            setAddress({ ...address, district: "", ward: "" });
            setDistrictsList([]);
            setWardList([]);
            setAddress({ ...address, city: newValue, district: "", ward: "" });
          }}
          sx={{ marginBlock: "20px" }}
        />
        <Autocomplete
          margin="dense"
          name="district"
          options={districtsList}
          getOptionLabel={(option) => option?.district_name || ""}
          renderInput={(params) => (
            <TextField
              {...params}
              label="District"
              error={Boolean(addressError.district)}
              helperText={addressError.district || ""}
            />
          )}
          value={
            districtsList.find(
              (dis) => dis?.district_id === address.district?.district_id
            ) || null
          }
          onChange={(event, newValue) => {
            setAddress({ ...address, ward: "" });
            setWardList([]);
            setAddress({ ...address, district: newValue, ward: "" });
          }}
          sx={{ marginBlock: "20px" }}
        />
        <Autocomplete
          margin="dense"
          name="ward"
          options={wardList}
          getOptionLabel={(option) => option?.ward_name || ""}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Ward"
              error={Boolean(addressError.ward)}
              helperText={addressError.ward || ""}
            />
          )}
          value={
            wardList.find((ward) => ward?.ward_id === address.ward?.ward_id) ||
            null
          }
          onChange={(event, newValue) => {
            setAddress({ ...address, ward: newValue });
          }}
          sx={{ marginBlock: "10px" }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AddressFormPopup.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
export default AddressFormPopup;
