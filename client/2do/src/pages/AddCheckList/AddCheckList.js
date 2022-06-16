import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { TextField, Checkbox, Icon, Button } from "@mui/material";
import ChooseColor from "../../components/ChooseColor/ChooseColor";
import CustomButton from "../../components/CustomButton/CustomButton";
import ChooseCategory from "../../components/ChooseCategory/ChooseCategory";
import SetDateTime from "../../components/SetDateTime/SetDateTime";
import * as Msg from "../../utils/constants/message.constants";
import GetAlert from "../../components/GetAlert/GetAlert";
import "./AddCheckList.scss";

const label = { inputProps: { "aria-label": "Checkbox" } };

const validationSchema = yup.object({
  title: yup.string().required(Msg.TITLE_REQUIRED),
});

const AddCheckList = () => {
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log({ values });
    },
  });

  const onAddCheckListHandler = () => {};

  const onRemoveItemHandler = () => {};

  const onAddItemHandler = () => {};

  return (
    <>
      <div className="addCheckListPageWrapper">
        <div className="cardWrapper">
          <div className="formWrapper">
            <form onSubmit={formik.handleSubmit}>
              <div className="commonInputWrap">
                <span className="commonLabel">Title</span>
                <TextField
                  fullWidth
                  multiline
                  id="title"
                  name="title"
                  autoComplete="off"
                  className="commonInputFormControl"
                  placeholder="Enter Title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                />
                <div className="checkboxListWrap">
                  <div className="listItemWrap">
                    <div className="flexContainer">
                      <div className="flexItemOne">
                        <Checkbox {...label} defaultChecked />
                      </div>
                      <div className="flexItemTwo">
                        <TextField fullWidth multiline defaultValue="Default Value" variant="standard" />
                      </div>
                      <div className="flexItemThree">
                        <Icon className="material-icons-round closeIcon" onClick={onRemoveItemHandler}>
                          close
                        </Icon>
                      </div>
                    </div>
                  </div>
                  <div className="listItemWrap">
                    <div className="flexContainer">
                      <div className="flexItemOne">
                        <Checkbox {...label} defaultChecked />
                      </div>
                      <div className="flexItemTwo">
                        <TextField
                          fullWidth
                          multiline
                          defaultValue="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi quaerat illo incidunt excepturi voluptatibus nesciunt sapiente aperiam."
                          variant="standard"
                        />
                      </div>
                      <div className="flexItemThree">
                        <Icon className="material-icons-round closeIcon" onClick={onRemoveItemHandler}>
                          close
                        </Icon>
                      </div>
                    </div>
                  </div>
                  <div className="addItemWrap">
                    <Button className="addItemBtn" onClick={onAddItemHandler}>
                      <Icon className="addIcon">add</Icon>
                      <span className="label">Add new item</span>
                    </Button>
                  </div>
                </div>
              </div>
              <ChooseCategory />
              <SetDateTime />
              <ChooseColor />
              <GetAlert />
              <CustomButton name="Done" type="submit" onClick={onAddCheckListHandler} />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCheckList;
