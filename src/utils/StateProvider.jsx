import { createContext, useReducer } from "react";
import PropTypes from "prop-types";

// Prepares the dataLayer
export const StateContext = createContext();

// Wrap our app nad provide the Data layer
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

StateProvider.propTypes = {
  reducer: PropTypes.func.isRequired, // reducer is func
  initialState: PropTypes.object.isRequired, // initialState obj
  children: PropTypes.node.isRequired, // children is node
};
