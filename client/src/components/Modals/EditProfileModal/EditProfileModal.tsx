import * as yup from "yup";
import { useFormik } from "formik";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { hideFooter, showFooter } from "../../../utils/helpers";
import { MSG } from "../../../utils/constants";
import "./EditProfileModal.scss";

const validationSchema = yup.object({
  name: yup
    .string()
    .required(MSG.VALIDATION.NAME.REQUIRED)
    .matches(/^[aA-zZ\s]+$/, MSG.VALIDATION.NAME.ONLY_ALPHABETS),
});

const EditProfileModal = (props) => {
  const { onClose, open, name, onSubmitForm } = props;

  const formik = useFormik({
    initialValues: {
      name: name ? name : "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmitForm({ name: values.name });
      onClose();
    },
  });

  const onCancelHandler = () => {
    onClose();
  };

  return (
    <Dialog className="editProfileModalComponentWrapper commonModalWrapper" onClose={onClose} open={open} fullWidth={true}>
      <DialogTitle className="modalTitle">Edit Profile</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent className="divider modalContentWrap">
          <Box className="formWrapper">
            <Box className="commonInputWrap">
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
                // helperText={formik.touched.name && formik.errors.name}
              />
            </Box>
          </Box>
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
  );
};

export default EditProfileModal;
