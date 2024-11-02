import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Box } from "@mui/material";
import "./ColorPicker.scss";

interface Props {
  isEdit?: boolean;
  cardColor?: string;
  onChooseColor: (color: string) => void;
}

const ColorPicker = ({ cardColor, isEdit, onChooseColor }: Props) => {
  const [selectedColor, setSelectedColor] = useState<string>("#f96060");

  useEffect(() => {
    if (isEdit && cardColor) {
      setSelectedColor(cardColor);
    }
  }, [cardColor, isEdit]);

  useEffect(() => {
    console.log({ selectedColor });
    setTimeout(() => {
      onChooseColor(selectedColor);
    }, 100);
  }, [selectedColor]);

  return (
    <Box className="colorPickerComponentWrapper">
      <span className="commonLabel">Choose Color</span>
      <Box className="colorPickerBox">
        <HexColorPicker color={selectedColor} onChange={setSelectedColor} />
      </Box>
    </Box>
  );
};

export default ColorPicker;
