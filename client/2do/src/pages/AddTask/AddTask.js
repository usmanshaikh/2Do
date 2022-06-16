import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { TextField } from "@mui/material";
import ChooseColor from "../../components/ChooseColor/ChooseColor";
import CustomButton from "../../components/CustomButton/CustomButton";
import ChooseCategory from "../../components/ChooseCategory/ChooseCategory";
import SetDateTime from "../../components/SetDateTime/SetDateTime";
import GetAlert from "../../components/GetAlert/GetAlert";
import * as Msg from "../../utils/constants/message.constants";
import "./AddTask.scss";

const validationSchema = yup.object({
  description: yup.string().required(Msg.DESCRIPTION_REQUIRED),
});

const AddTask = () => {
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
      <div className="addTaskPageWrapper">
        <div className="cardWrapper">
          <div className="formWrapper">
            <form onSubmit={formik.handleSubmit}>
              <div className="commonInputWrap">
                <span className="commonLabel">description</span>
                <TextField
                  fullWidth
                  multiline
                  id="description"
                  name="description"
                  autoComplete="off"
                  className="commonInputFormControl"
                  placeholder="Enter Description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  helperText={formik.touched.description && formik.errors.description}
                />
              </div>
              <ChooseCategory />
              <SetDateTime />
              <GetAlert />
              <ChooseColor />
              <CustomButton name="Done" type="submit" onClick={onAddQuickNoteHandler} />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTask;
