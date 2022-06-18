import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Input, TextField } from "@mui/material";
import * as Msg from "../../../utils/constants/message.constants";
import "./EditProfileModal.scss";

const validationSchema = yup.object({
  name: yup
    .string()
    .required(Msg.NAME_REQUIRED)
    .matches(/^[aA-zZ\s]+$/, Msg.NAME_ONLY_ALPHABETS),
});

const EditProfileModal = (props) => {
  const { onClose, open } = props;
  const [file, setFile] = useState();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log({ values });
    },
  });

  const onCancelHandler = () => {
    onClose();
  };
  const handleChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <>
      <Dialog
        className="editProfileModalComponentWrapper"
        onClose={onCancelHandler}
        open={open}
        fullWidth={true}
        onBackdropClick="false">
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogContent dividers>
            <div className="formWrapper">
              <div className="commonInputWrap">
                <TextField
                  fullWidth
                  variant="standard"
                  id="name"
                  name="name"
                  label="Name"
                  autoComplete="off"
                  className="commonInputFormControl"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </div>
              <div>
                {file && (
                  <div className="previewImgWrap">
                    <img src={file} alt="portrait" className="previewImg fluidImg" />
                  </div>
                )}
                <div className="uploadFileWrap">
                  <label htmlFor="contained-button-file">
                    <Input
                      accept="image/*"
                      id="contained-button-file"
                      type="file"
                      className="uploadFileInputWrap"
                      onChange={handleChange}
                    />
                    <Button variant="contained" component="span">
                      Upload
                    </Button>
                  </label>
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={onCancelHandler}>
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default EditProfileModal;
