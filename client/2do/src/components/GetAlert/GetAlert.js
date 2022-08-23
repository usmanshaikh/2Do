import React, { useEffect, useState } from "react";
import Switch from "@mui/material/Switch";
import "./GetAlert.scss";

const GetAlert = (props) => {
  const { isEdit, alert, onAlertTask } = props;
  const [checked, setChecked] = useState(true);

  useEffect(() => {
    if (isEdit) setChecked(alert);
    else defaultCompValueIfNotEdit();
  }, [alert]);

  const handleChange = (event) => {
    const check = event.target.checked;
    const obj = { alert: check };
    onAlertTask(obj);
    setChecked(check);
  };

  const defaultCompValueIfNotEdit = () => {
    const obj = { alert: checked };
    onAlertTask(obj);
  };

  const label = { inputProps: { "aria-label": "Switch demo" } };

  return (
    <>
      <div className="getAlertComponentWrapper">
        <div className="flexContainer">
          <div>
            <span className="commonLabel">Get alert for this task</span>
          </div>
          <div>
            <Switch {...label} checked={checked} onChange={handleChange} />
          </div>
        </div>
      </div>
    </>
  );
};

export default GetAlert;

// import React, { useEffect, useState } from "react";
// import Switch from "@mui/material/Switch";
// import "./GetAlert.scss";

// const GetAlert = (props) => {
//   const [checked, setChecked] = useState(true);

//   const handleChange = (event) => {
//     setChecked(event.target.checked);
//   };

//   useEffect(() => {
//     props.onAlertTask(checked);
//   }, [checked]);

//   const label = { inputProps: { "aria-label": "Switch demo" } };

//   return (
//     <>
//       <div className="getAlertComponentWrapper">
//         <div className="flexContainer">
//           <div>
//             <span className="commonLabel">Get alert for this task</span>
//           </div>
//           <div>
//             <Switch {...label} checked={checked} onChange={handleChange} />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default GetAlert;
