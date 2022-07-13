import React, { createContext, useReducer, useState } from "react";
import * as Msg from "../../utils/constants/message.constants";

const GlobalContext = createContext();

const CFBY_initialState = {
  categoryBy: Msg.DEFAULT_CATEGORY_BY,
  filterBy: Msg.FITER_BY_ALL,
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
  const [headerTitle, setHeaderTitle] = useState("personal");
  const [CFBY_state, CFBY_dispatch] = useReducer(CFBY_reducer, CFBY_initialState);

  const obj = {
    headerTitle: [headerTitle, setHeaderTitle],
    CFBY_state: [CFBY_state, CFBY_dispatch],
  };

  return (
    <>
      <GlobalContext.Provider value={obj}>{props.children}</GlobalContext.Provider>
    </>
  );
};

export { GlobalContext, GlobalProvider };
