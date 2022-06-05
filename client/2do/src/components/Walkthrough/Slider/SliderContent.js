import React from "react";

const SliderContent = (props) => {
  const path = props.content[props.index];

  return (
    <>
      <div className="sliderContent">
        <img src={path.img1} alt="walkthrough" className="fluidImg SliderMainImg" />
        <div className="infoTxtBox">
          <p className="title">{path.title}</p>
          <span className="subTitle">{path.subTitle}</span>
        </div>
      </div>
      <img src={path.img2} alt="walkthrough" className="fluidImg bgLayer" />
    </>
  );
};

export default SliderContent;
