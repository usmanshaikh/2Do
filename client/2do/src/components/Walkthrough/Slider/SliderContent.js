import React from "react";

const SliderContent = (props) => {
  const path = props.content[props.index];

  return (
    <>
      <div className="sliderContent">
        <div className="infoBox">
          <div className="content">
            <img src={path.img1} alt="walkthrough" className="fluidImg sliderMainImg" />
            <div className="infoTxtBox">
              <p className="title">{path.title}</p>
              <span className="subTitle">{path.subTitle}</span>
            </div>
          </div>
        </div>
        <div className="bgLayerBox">
          <img src={path.img2} alt="walkthrough" className="fluidImg bgLayer" />
        </div>
      </div>
    </>
  );
};

export default SliderContent;
