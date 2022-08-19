import React, { createContext, useReducer, useState } from "react";
import constants from "../../utils/constants";

const MSG = constants.message;

const GlobalContext = createContext();

const CFBY_initialState = {
  categoryBy: MSG.DEFAULT_CATEGORY_BY,
  filterBy: MSG.FITER_BY_ALL,
};

const CFBY_reducer = (state, action) => {
  switch (action.type) {
    case "setState":
      return { ...state, categoryBy: action.categoryBy, filterBy: action.filterBy };
    case "resetState":
      return CFBY_initialState;
    default:
      return state;
  }
};

const GlobalProvider = (props) => {
  const isAccessToken = () => (localStorage.getItem("accessToken") ? true : false);
  const [headerTitle, setHeaderTitle] = useState("personal");
  const [CFBY_state, CFBY_dispatch] = useReducer(CFBY_reducer, CFBY_initialState);
  const [authenticate, setAuthenticate] = useState(isAccessToken());

  const obj = {
    headerTitle: [headerTitle, setHeaderTitle],
    CFBY_state: [CFBY_state, CFBY_dispatch],
    authenticate: [authenticate, setAuthenticate],
  };

  return (
    <>
      <GlobalContext.Provider value={obj}>{props.children}</GlobalContext.Provider>
    </>
  );
};

export { GlobalContext, GlobalProvider };
