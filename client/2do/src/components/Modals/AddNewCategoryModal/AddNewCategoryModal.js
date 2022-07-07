import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Dialog, TextField } from "@mui/material";
import CustomButton from "../../CustomButton/CustomButton";
import ChooseColor from "../../ChooseColor/ChooseColor";
import * as Msg from "../../../utils/constants/message.constants";
import { hideFooter, showFooter } from "../../../utils/Helpers/Helpers";
import "./AddNewCategoryModal.scss";

const validationSchema = yup.object({
  title: yup.string().required(Msg.TITLE_REQUIRED),
});

const AddNewCategoryModal = (props) => {
  const { onClose, selectedValue, open } = props;
  const [cardColor, setCardColor] = useState();

  const handleClose = () => {
    onClose(selectedValue);
  };

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
  };

  return (
    <>
      <Dialog className="addNewCategoryComponentWrapper" onClose={handleClose} open={open} fullWidth={true}>
        <form onSubmit={formik.handleSubmit}>
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
          <div className="actionBtnWrap">
            <CustomButton name="Create" type="submit" />
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default AddNewCategoryModal;
