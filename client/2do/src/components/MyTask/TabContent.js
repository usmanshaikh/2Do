import React from "react";

const TabContent = (props) => {
  const { children, value, index } = props;

  return (
    <div role="tabcontent" hidden={value !== index} id={`full-width-tabcontent-${index}`}>
      {value === index && <div>{children}</div>}
    </div>
  );
};

export default TabContent;
