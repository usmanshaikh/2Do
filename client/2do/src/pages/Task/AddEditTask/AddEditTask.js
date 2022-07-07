import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { TextField } from "@mui/material";
import { useModal } from "mui-modal-provider";
import ChooseColor from "../../../components/ChooseColor/ChooseColor";
import CustomButton from "../../../components/CustomButton/CustomButton";
import ChooseCategory from "../../../components/ChooseCategory/ChooseCategory";
import SetDateTime from "../../../components/SetDateTime/SetDateTime";
import GetAlert from "../../../components/GetAlert/GetAlert";
import * as Msg from "../../../utils/constants/message.constants";
import "./AddEditTask.scss";
import ConfirmationModal from "../../../components/Modals/ConfirmationModal/ConfirmationModal";

const validationSchema = yup.object({
  description: yup.string().required(Msg.DESCRIPTION_REQUIRED),
});

const AddEditTask = () => {
  const [cardColor, setCardColor] = useState();
  const [alertTask, setAlertTask] = useState();
  const [category, setCategory] = useState();
  const [setDateTime, setSetDateTime] = useState();
  const { showModal } = useModal();

  const formik = useFormik({
    initialValues: {
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const initialState = {
        title: "Create Task",
        message: "Create this Task?",
        onConfirm: (data) => submitFormHandler(data),
      };
      showModal(ConfirmationModal, initialState, { destroyOnClose: true });
    },
  });

  const submitFormHandler = (data) => {
    const payload = {
      cardColor: {
        ...cardColor,
      },
      category: {
        ...category,
      },
      ...formik.values,
      alertTask,
      taskDateTime: setDateTime,
    };
    console.log({ payload });
  };

  const onAddTaskHandler = () => {};

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
              <ChooseCategory onChooseCategory={(data) => setCategory(data)} />
              <SetDateTime onSetDateTime={(data) => setSetDateTime(data)} />
              <GetAlert onAlertTask={(data) => setAlertTask(data)} />
              <ChooseColor onChooseColor={(data) => setCardColor(data)} />
              <CustomButton name="Done" type="submit" onClick={onAddTaskHandler} />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEditTask;
