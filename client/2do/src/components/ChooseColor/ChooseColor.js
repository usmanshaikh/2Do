import React, { useContext, useEffect, useState } from "react";
import { Icon } from "@mui/material";
import { GlobalSnackbarAlertContext } from "../../utils/contexts";
import { CardColorAPI } from "../../api";
import "./ChooseColor.scss";

const ChooseColor = (props) => {
  const { cardColor, isEdit, onChooseColor } = props;
  const [allColors, setAllColors] = useState();
  const snackbarAlert = useContext(GlobalSnackbarAlertContext);
  const [color, setColor] = useState(); // this obj will save in backend. So save whole obj

  useEffect(() => {
    getAllCardColors();
  }, []);

  useEffect(() => {
    if (isEdit && cardColor) setColor(cardColor);
    else getAllCardColors();
  }, [cardColor]);

  const getAllCardColors = () => {
    CardColorAPI.cardColors()
      .then((res) => {
        setAllColors(res);
        if (!isEdit) {
          setColor(res[0]);
          defaultCompValueIfNotEdit(res[0]);
        }
      })
      .catch((err) => snackbarAlert.showSnackbarAlert({ msg: err.message, type: "error" }));
  };

  const chooseColorHandler = (item) => {
    const obj = { cardColor: item.id };
    onChooseColor(obj);
    setColor(item);
  };

  const defaultCompValueIfNotEdit = (data) => {
    const obj = { cardColor: data.id };
    onChooseColor(obj);
  };

  return (
    <>
      {allColors && (
        <div className="chooseColorComponentWrapper">
          <span className="commonLabel">Choose Color</span>
          <div className="flexContainer">
            {allColors.map((item) => {
              return (
                <div
                  key={item.id}
                  className="flexItem"
                  style={{ backgroundColor: item.color }}
                  onClick={() => chooseColorHandler(item)}>
                  <span className="colorBox">
                    {color.id === item.id && <Icon className="material-icons-round checkIcon">done</Icon>}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default ChooseColor;
