import { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { hideFooter, showFooter } from "../../../utils/helpers";
import { MSG } from "../../../utils/constants";
import ColorPicker from "../../ColorPicker/ColorPicker";
import "./AddNewCategoryModal.scss";

export const REGEX_ONLY_LETTERS = /^[a-zA-Z\s]*$/;

const validationSchema = yup.object({
  title: yup
    .string()
    .matches(REGEX_ONLY_LETTERS, MSG.VALIDATION.TITLE.ONLY_LETTERS)
    .required(MSG.VALIDATION.TITLE.REQUIRED),
});

/**
 * @param {{ onSubmitForm: () }} props
 */
const AddNewCategoryModal = (props) => {
  const { onClose, open, onSubmitForm } = props;
  const [color, setColor] = useState<string>();

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
            <Box className="commonInputWrap">
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
              <ColorPicker onChooseColor={setColor} />
            </Box>
          </DialogContent>
          <DialogActions className="actionBtnFlexContainer">
            <Button onClick={onClose} type="button" className="cancelBtn actionBtn">
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
