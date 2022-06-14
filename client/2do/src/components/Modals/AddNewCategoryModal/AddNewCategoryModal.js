import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Dialog, TextField } from "@mui/material";
import CustomButton from "../../CustomButton/CustomButton";
import ChooseColor from "../../ChooseColor/ChooseColor";
import * as Msg from "../../../utils/constants/message.constants";
import "./AddNewCategoryModal.scss";

const validationSchema = yup.object({
  title: yup.string().required(Msg.TITLE_REQUIRED),
});

const AddNewCategoryModal = (props) => {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log({ values });
    },
  });

  const onCreateCategoryHandler = () => {};

  return (
    <>
      <Dialog className="addNewCategoryComponentWrapper" onClose={handleClose} open={open} fullWidth={true}>
        <form onSubmit={formik.handleSubmit}>
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
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <ChooseColor />
          </div>
          <div className="actionBtnWrap">
            <CustomButton name="Create" type="submit" onClick={onCreateCategoryHandler} />
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default AddNewCategoryModal;
