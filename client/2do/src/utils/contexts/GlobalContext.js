import React, { createContext, useReducer, useState } from "react";
import constants from "../../utils/constants";

const MSG = constants.message;

const GlobalContext = createContext();

const filterOptionsInitialState = {
  category: undefined,
  isCompleted: MSG.FITER_BY_ALL,
};

const filterOptionsReducer = (state, action) => {
  switch (action.type) {
    case "setState":
      return { ...state, category: action.category, isCompleted: action.isCompleted };
    case "resetState":
      return filterOptionsInitialState;
    default:
      return state;
  }
};

const GlobalProvider = (props) => {
  const isAccessToken = () => (localStorage.getItem("accessToken") ? true : false);
  const [headerTitle, setHeaderTitle] = useState("personal");
  const [filterOptions, filterOptionsDispatch] = useReducer(filterOptionsReducer, filterOptionsInitialState);
  const [filterOptionsModalOpen, setFilterOptionsModalOpen] = useState(false);
  const [authenticate, setAuthenticate] = useState(isAccessToken());

  const obj = {
    headerTitle: [headerTitle, setHeaderTitle],
    filterOptions: [filterOptions, filterOptionsDispatch],
    filterOptionsModalOpen: [filterOptionsModalOpen, setFilterOptionsModalOpen],
    authenticate: [authenticate, setAuthenticate],
  };

  return (
    <>
      <GlobalContext.Provider value={obj}>{props.children}</GlobalContext.Provider>
    </>
  );
};
// *************** THIS IS PART ONE => THE FIRST STEP ***************

export { GlobalContext, GlobalProvider };
