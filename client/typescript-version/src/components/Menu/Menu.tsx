import { Box, Button } from "@mui/material";
import { useModal } from "mui-modal-provider";
import { AddTaskModal } from "../Modals";
import MenuItem from "./MenuItem";
import { ROUTES } from "../../utils/constants";
import Images from "../../assets/img";
import "./Menu.scss";

const MENU_ITEM = [
  {
    icon: "check_circle",
    name: "My Task",
    url: ROUTES.TASK,
    position: 1,
  },
  {
    icon: "checklist",
    name: "Checklist",
    url: ROUTES.CHECKLIST,
    position: 2,
  },
  {
    icon: "",
    name: "Blank",
    url: "",
    position: 3,
  },
  {
    icon: "widgets",
    name: "Category",
    url: ROUTES.CATEGORY,
    position: 4,
  },
  {
    icon: "person",
    name: "Profile",
    url: ROUTES.PROFILE,
    position: 5,
  },
];
const Menu = () => {
  const { showModal } = useModal();

  const openAddTaskModalHandler = () => {
    showModal(AddTaskModal, undefined, { destroyOnClose: true });
  };

  return (
    <>
      <Box className="menuComponentWrapper">
        <Box className="flexContainer">
          {MENU_ITEM.map((item) => (
            <MenuItem key={item.position} icon={item.icon} name={item.name} url={item.url} />
          ))}
          <Button className="addTaskButtonWrap" onClick={openAddTaskModalHandler}>
            <img src={Images.LogoNameSVG} alt="2Do" className="logo" />
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Menu;
