import { createContext, useContext } from "react";
import { StateContext } from "../utils/StateProvider";

//Pull information from the data layer
export const useStateValue = () => useContext(StateContext);
