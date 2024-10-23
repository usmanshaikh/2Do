import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
// prettier-ignore
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Icon, IconButton, Input, TextField } from "@mui/material";
import { hideFooter, showFooter } from "../../../utils/helpers";
import constants from "../../../utils/constants";
import "./EditProfileModal.scss";

const MSG = constants.message;

const validationSchema = yup.object({
  name: yup
    .string()
    .required(MSG.NAME_REQUIRED)
    .matches(/^[aA-zZ\s]+$/, MSG.NAME_ONLY_ALPHABETS),
});

/**
 * @param {{ onSubmitForm: () }} props
 */
const EditProfileModal = (props) => {
  const { onClose, open, name, onSubmitForm } = props;
  const [imgFile, setImgFile] = useState();
  const [preview, setPreview] = useState();

  const formik = useFormik({
    initialValues: {
      name: name ? name : "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("image", imgFile);
      formData.append("name", values.name);
      onSubmitForm(formData);
      onClose();
    },
  });

  const onCancelHandler = () => {
    onClose();
  };

  const handleChange = (e) => {
    const fileData = e.target.files[0];
    setPreview(URL.createObjectURL(fileData));
    setImgFile(fileData);
  };

  const removePhotoHandler = () => {
    setPreview(null);
    setImgFile(null);
  };

  return (
    <>
      <Dialog
        className="editProfileModalComponentWrapper commonModalWrapper"
        onClose={onClose}
        open={open}
        fullWidth={true}>
        <DialogTitle className="modalTitle">Edit Profile</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent className="divider modalContentWrap">
            <div className="formWrapper">
              <div className="commonInputWrap">
                <TextField
                  fullWidth
                  variant="standard"
                  id="name"
                  name="name"
                  label="Name*"
                  autoComplete="off"
                  className="commonInputFormControl"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onFocus={hideFooter}
                  onBlur={showFooter}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </div>
              <div>
                <div className="previewImgWrap">
                  {preview && (
                    <>
                      <IconButton
                        aria-label="remove"
                        className="removePhotoBtn"
                        size="small"
                        onClick={removePhotoHandler}>
                        <Icon className="closeIcon">close</Icon>
                      </IconButton>
                      <img src={preview} alt="portrait" className="previewImg fluidImg" />
                    </>
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
            </div>
          </DialogContent>
          <DialogActions className="actionBtnFlexContainer">
            <Button onClick={onCancelHandler} className="cancelBtn actionBtn">
              Cancel
            </Button>
            <Button variant="contained" type="submit" className="saveBtn actionBtn successBtn">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default EditProfileModal;
