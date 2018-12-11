import React from "react";
import "./../index.css";
import { Button, Icon, List, Segment } from "semantic-ui-react";
import style from "../stylesheets/previousEducation.css";
const graduationOptions = {
  mat: "Matriculate",
  int: "Intermediate",
  ass: "Associate",
  gra: "Graduate",
  pos: "Postgraduate",
  doc: "Doctorate",
  pdo: "Postdoctorate"
};
export function PreviousEducation(props) {
  return (
    <Segment>
      <div styleName="style.flex-box">
        <div>
          {props.data.degree} - {graduationOptions[props.data.graduation]} in{" "}
          {props.data.fieldOfStudy}
          <p>
            {props.data.institute}-{props.data.year}
          </p>
          <p>CGPA: {props.data.cgpa}</p>
        </div>

        <div>
          <Icon
            name="edit"
            color="grey"
            onClick={() => props.manageData(props.data.id)}
          />
        </div>
      </div>
    </Segment>
  );
}
