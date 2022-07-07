import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import CustomButton from "../../CustomButton/CustomButton";
import ChooseColor from "../../ChooseColor/ChooseColor";
import * as Msg from "../../../utils/constants/message.constants";
import { hideFooter, showFooter } from "../../../utils/Helpers/Helpers";
import "./AddNewCategoryModal.scss";

const validationSchema = yup.object({
  title: yup.string().required(Msg.TITLE_REQUIRED),
});

const AddNewCategoryModal = (props) => {
  const { onClose, open } = props;
  const [cardColor, setCardColor] = useState();

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      onCreateCategoryHandler();
    },
  });

  const onCreateCategoryHandler = () => {
    const payload = {
      ...formik.values,
      cardColor: {
        ...cardColor,
      },
    };
    console.log({ payload });
    onClose();
  };

  const onCancelHandler = () => {
    onClose();
  };

  return (
    <>
      <Dialog
        className="addNewCategoryComponentWrapper commonModalWrapper"
        onClose={onClose}
        open={open}
        fullWidth={true}>
        <DialogTitle className="modalTitle">Add Category</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent className="divider modalContentWrap">
            <div className="commonInputWrap">
              <span className="commonLabel">Title</span>
              <TextField
                fullWidth
                variant="standard"
                id="title"
                name="title"
                autoComplete="off"
                className="commonInputFormControl"
                value={formik.values.title}
                onChange={formik.handleChange}
                onFocus={hideFooter}
                onBlur={showFooter}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
              <ChooseColor onChooseColor={(data) => setCardColor(data)} />
            </div>
          </DialogContent>
          <DialogActions className="actionBtnFlexContainer">
            <Button onClick={onCancelHandler} type="button" className="cancelBtn actionBtn">
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
