import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { TextField } from "@mui/material";
import ChooseColor from "../../components/ChooseColor/ChooseColor";
import CustomButton from "../../components/CustomButton/CustomButton";
import * as Msg from "../../utils/constants/message.constants";

import "./AddQuickNote.scss";

const validationSchema = yup.object({
  description: yup.string().required(Msg.DESCRIPTION_REQUIRED),
});

const AddQuickNote = () => {
  const formik = useFormik({
    initialValues: {
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log({ values });
    },
  });

  const onAddQuickNoteHandler = () => {};

  return (
    <>
      <div className="addQuickNotePageWrapper">
        <div className="cardWrapper">
          <div className="formWrapper">
            <form onSubmit={formik.handleSubmit}>
              <div className="commonInputWrap">
                <TextField
                  fullWidth
                  multiline
                  id="description"
                  name="description"
                  label="Description"
                  autoComplete="off"
                  className="commonInputFormControl"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  helperText={formik.touched.description && formik.errors.description}
                />
              </div>
              <ChooseColor />
              <CustomButton name="Done" type="submit" onClick={onAddQuickNoteHandler} />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddQuickNote;
