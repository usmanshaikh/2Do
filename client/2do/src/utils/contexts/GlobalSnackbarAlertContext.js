import React, { createContext, useRef, useState } from "react";
import SnackbarAlert from "../../components/SnackbarAlert/SnackbarAlert";

const GlobalSnackbarAlertContext = createContext({
  /**
   *
   * @param {{ msg: string, type?: ('success'|'error'), duration?: number }} param
   */
  showSnackbarAlert: (param) => {},
});

const GlobalSnackbarAlertProvider = (props) => {
  const callChildFn = useRef(null);
  const [snackbarAlertConfig, setSnackbarAlertConfig] = useState({ msg: "", type: "success", duration: 4000 });

  const showSnackbarAlertHandler = (config) => {
    callChildFn.current();
    setSnackbarAlertConfig(config);
  };

  return (
    <>
      <GlobalSnackbarAlertContext.Provider value={{ showSnackbarAlert: showSnackbarAlertHandler }}>
        <SnackbarAlert childFn={callChildFn} config={snackbarAlertConfig} />
        {props.children}
      </GlobalSnackbarAlertContext.Provider>
    </>
  );
};

export { GlobalSnackbarAlertContext, GlobalSnackbarAlertProvider };
