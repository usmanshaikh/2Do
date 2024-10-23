import React, { createContext, useState } from "react";

const GlobalContext = createContext();

const GlobalProvider = (props) => {
  const isAccessToken = () => (localStorage.getItem("accessToken") ? true : false);
  const [showLoader, setShowLoader] = useState(false);
  const [authenticate, setAuthenticate] = useState(isAccessToken());

  const obj = {
    showLoader: [showLoader, setShowLoader],
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
