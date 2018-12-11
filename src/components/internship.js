import React from "react";
import "./../index.css";
import { Button, Icon, List, Segment } from "semantic-ui-react";
import style from "../stylesheets/internship.css";

export function Internship(props) {
  return (
    <Segment>
      <div styleName="style.flex-box">
        <div>
          {props.data.position} - <b>{props.data.organisation}</b>
          <p>
            {props.data.startDate} - {props.data.endDate}
          </p>
          <p>{props.data.description}</p>
        </div>
        <div>
          {!props.rearrange ? (
            <Icon
              name="edit"
              color="grey"
              onClick={() => props.manageData(props.data.id)}
            />
          ) : null}
        </div>
      </div>
    </Segment>
  );
}
