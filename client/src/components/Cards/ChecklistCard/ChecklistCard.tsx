import { Fragment } from "react";
import { Icon, CardActionArea, Card, Box } from "@mui/material";
import { truncateString } from "../../../utils/helpers";
import { ChecklistResponse } from "../../../api/types";
import "./ChecklistCard.scss";
import { DateTimeDisplay } from "../../index";

interface Props {
  checklists: ChecklistResponse[];
  onEditChecklist: (checklist: ChecklistResponse) => void;
}

const ChecklistCard = ({ checklists, onEditChecklist }: Props) => {
  return (
    <>
      {checklists.map((checklist) => (
        <Fragment key={checklist._id}>
          <Card className="checklistCardComponentWrapper" onClick={() => onEditChecklist(checklist)}>
            <CardActionArea>
              <Box className="cardWrap">
                <span className="bgLine" style={{ backgroundColor: checklist.cardColor }}></span>
                <span className="heading">{truncateString(checklist.title, 80)}</span>
                <ul className="listItemWrap">
                  {checklist.checklistItems.slice(0, 3).map((item) => (
                    <li key={item._id} className={`item searchDiv ${item.isChecked ? "complete" : null}`}>
                      <Icon className={`checkboxIcon ${item.isChecked ? "checked" : "unChecked"}`}>
                        {item.isChecked ? "check_box" : "check_box_outline_blank"}
                      </Icon>
                      <span className="description">{truncateString(item.text)}</span>
                    </li>
                  ))}
                </ul>
                {checklist.checklistItems.length > 3 && (
                  <Box className="seeMoreWrap">
                    <span className="seeMoreTxt">+{checklist.checklistItems.length - 3} more</span>
                    <Icon className="arrowRightIcon">keyboard_double_arrow_right</Icon>
                  </Box>
                )}
                <Box className="dateTimeWrap">
                  <DateTimeDisplay dateAndTime={checklist.dateAndTime} alert={checklist.alert} />
                </Box>
              </Box>
            </CardActionArea>
          </Card>
        </Fragment>
      ))}
    </>
  );
};

export default ChecklistCard;
