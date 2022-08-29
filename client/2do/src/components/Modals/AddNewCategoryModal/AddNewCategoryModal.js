import React, { useContext, useEffect, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Icon } from "@mui/material";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { hideFooter, showFooter } from "../../../utils/Helpers";
import { GlobalSnackbarAlertContext } from "../../../utils/contexts";
import constants from "../../../utils/constants";
import Images from "../../../assets/img/Images";
import CardColorAPI from "../../../api/CardColorAPI";
import "./AddNewCategoryModal.scss";

const MSG = constants.message;
const RGX = constants.regex;

const validationSchema = yup.object({
  title: yup.string().matches(RGX.ONLY_LETTERS, MSG.TITLE_ONLY_LETTERS).required(MSG.TITLE_REQUIRED),
});

/**
 * @param {{ onSubmitForm: () }} props
 */
const AddNewCategoryModal = (props) => {
  const { onClose, open, onSubmitForm } = props;
  const snackbarAlert = useContext(GlobalSnackbarAlertContext);
  const [allColors, setAllColors] = useState();
  const [colorId, setColorId] = useState();
  const [loading, setLoading] = useState(true);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      const payload = {
        categoryName: formik.values.title,
        cardColor: colorId,
      };
      onSubmitForm(payload);
      onClose();
    },
  });

  useEffect(() => {
    allCardColors();
  }, []);

  const allCardColors = () => {
    CardColorAPI.cardColorsForModal()
      .then((res) => {
        const defaultColor = res[0].id;
        setAllColors(res);
        setColorId(defaultColor);
        setLoading(false);
      })
      .catch((err) => {
        handleClose();
        snackbarAlert.showSnackbarAlert({ msg: err.message, type: "error" });
      });
  };

  const handleClose = (event, reason) => {
    if (reason && reason === "backdropClick") return;
    onClose();
  };

  const loadingImgContent = (
    <div className="loadingWrap">
      <img src={Images.Loading} alt="Loading" className="loadingImg" />
    </div>
  );

  const modalContent = (
    <>
      <DialogTitle className="modalTitle">Add Category</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent className="divider modalContentWrap">
          <div className="commonInputWrap">
            <TextField
              fullWidth
              variant="standard"
              id="title"
              name="title"
              label="Title"
              autoComplete="off"
              className="commonInputFormControl"
              value={formik.values.title}
              onChange={formik.handleChange}
              onFocus={hideFooter}
              onBlur={showFooter}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <div className="chooseColorComponentWrapper">
              <span className="commonLabel">Choose Color</span>
              {allColors && (
                <div className="flexContainer">
                  {allColors.map((item) => {
                    return (
                      <div
                        key={item.id}
                        className="flexItem"
                        style={{ backgroundColor: item.color }}
                        onClick={() => setColorId(item.id)}>
                        <span className="colorBox">
                          {colorId === item.id && <Icon className="material-icons-round checkIcon">done</Icon>}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </DialogContent>
        <DialogActions className="actionBtnFlexContainer">
          <Button onClick={handleClose} type="button" className="cancelBtn actionBtn">
            Cancel
          </Button>
          <Button variant="contained" type="submit" className="saveBtn actionBtn successBtn">
            Create
          </Button>
        </DialogActions>
      </form>
    </>
  );

  return (
    <>
      <Dialog
        className="addNewCategoryComponentWrapper commonModalWrapper"
        onClose={handleClose}
        open={open}
        fullWidth={true}>
        {loading ? loadingImgContent : modalContent}
      </Dialog>
    </>
  );
};

export default AddNewCategoryModal;
