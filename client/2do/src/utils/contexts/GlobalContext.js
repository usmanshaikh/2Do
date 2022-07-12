import React, { createContext, useState } from "react";

const GlobalContext = createContext();

const GlobalProvider = (props) => {
  const [headerTitle, setHeaderTitle] = useState("personal");
  const [headerBtn, setHeaderBtn] = useState(); // For Learning Purpose. Used in Task.js File

  return (
    <>
      <GlobalContext.Provider
        value={{ headerTitle: [headerTitle, setHeaderTitle], headerBtn: [headerBtn, setHeaderBtn] }}>
        {props.children}
      </GlobalContext.Provider>
    </>
  );
};

console.log({ GlobalContext });
console.log({ GlobalProvider });
export { GlobalContext, GlobalProvider };
