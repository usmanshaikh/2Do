import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { hideFooter, showFooter } from "../../../utils/Helpers";
import constants from "../../../utils/constants";
import ChooseColor from "../../ChooseColor/ChooseColor";
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
  const [color, setColor] = useState();

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      const payload = {
        categoryName: formik.values.title,
        cardColor: color,
      };
      onSubmitForm(payload);
      onClose();
    },
  });

  const handleClose = (event, reason) => {
    if (reason && reason === "backdropClick") return;
    onClose();
  };

  return (
    <>
      <Dialog
        className="addNewCategoryComponentWrapper commonModalWrapper"
        onClose={handleClose}
        open={open}
        fullWidth={true}>
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
              <ChooseColor onChooseColor={(data) => setColor(data.cardColor)} />
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
      </Dialog>
    </>
  );
};

export default AddNewCategoryModal;
