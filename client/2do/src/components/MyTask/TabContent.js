import React from "react";
import { Box, Typography } from "@mui/material";

const TabContent = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabcontent"
      hidden={value !== index}
      id={`full-width-tabcontent-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

export default TabContent;
