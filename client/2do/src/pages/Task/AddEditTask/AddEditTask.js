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
import constants from "../../../utils/constants";
import { ConfirmationModal } from "../../../components/Modals";
import { hideFooter, showFooter } from "../../../utils/Helpers";
import "./AddEditTask.scss";

const MSG = constants.message;

const validationSchema = yup.object({
  description: yup.string().required(MSG.DESCRIPTION_REQUIRED),
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
        message: MSG.CREATE_TASK,
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

  const onDeleteHandler = (data) => {
    const initialState = {
      message: MSG.CONFIRMATION_DELETE,
      onConfirm: () => confirmDeleteTaskHandler(),
      type: "danger",
    };
    showModal(ConfirmationModal, initialState, { destroyOnClose: true });
  };

  const confirmDeleteTaskHandler = () => {
    console.log("confirmDeleteTaskHandler");
  };

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
                  onFocus={hideFooter}
                  onBlur={showFooter}
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  helperText={formik.touched.description && formik.errors.description}
                />
              </div>
              <ChooseCategory onChooseCategory={(data) => setCategory(data)} />
              <SetDateTime onSetDateTime={(data) => setSetDateTime(data)} />
              <GetAlert onAlertTask={(data) => setAlertTask(data)} />
              <ChooseColor onChooseColor={(data) => setCardColor(data)} />
              <CustomButton name="Delete" color="danger" onClick={onDeleteHandler} />
              <CustomButton name="Done" color="blue" type="submit" onClick={onAddTaskHandler} />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEditTask;
