import React from "react";
import { Dimmer, Icon, Segment, Header, List } from "semantic-ui-react";
import axios from "axios";
import { getCookie } from "formula_one";
import style from "../styles.css";
import { SkillForm } from "./skillForm";
import { ComponentTransition } from "./transition";

const initial = {
  computerLanguages: "",
  softwarePackages: "",
  additionalCourses: "",
  minorCourses: "",
  languages: ""
};
export class Skill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: initial,
      person_data: "",
      active: false,
      createNew: true
    };
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData = e => {
    const self = this;
    let headers = {
      "X-CSRFToken": getCookie("csrftoken")
    };
    let url = "";
    if (this.props.handle != undefined) url = this.props.handle + "/handle/";
    axios
      .get("/api/student_profile/skill/" + url)
      .then(function(response) {
        if (response.data.length != 0) {
          self.setState({ data: response.data[0], createNew: false });
        } else {
          self.setState({ createNew: true });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  handleShow = e => {
    this.setState({
      active: true
    });
  };
  handleUpdate = (data, flag) => {
    this.setState({ active: false, data: data, createNew: flag });
  };
  handleHide = () => {
    this.setState({ active: false });
  };

  render() {
    const { theme } = this.props;
    const additionalCourses =
      this.state.data.additionalCourses != "" ? (
        <Segment>
          <List>
            <List.Item>
              <List.Icon name="stop" color="blue" />
              <List.Content>
                <h4>Additional Courses</h4>
                <p>{this.state.data.additionalCourses}</p>
              </List.Content>
            </List.Item>
          </List>
        </Segment>
      ) : null;
    const softwarePackages =
      this.state.data.softwarePackages != "" ? (
        <Segment>
          <List>
            <List.Item>
              <List.Icon name="stop" color="blue" />
              <List.Content>
                <h4>Software Packages</h4>
                <p>{this.state.data.softwarePackages}</p>
              </List.Content>
            </List.Item>
          </List>
        </Segment>
      ) : null;
    const computerLanguages =
      this.state.data.computerLanguages != "" ? (
        <Segment>
          <List>
            <List.Item>
              <List.Icon name="stop" color="blue" />
              <List.Content>
                <h4>Computer Languages</h4>
                <p>{this.state.data.computerLanguages}</p>
              </List.Content>
            </List.Item>
          </List>
        </Segment>
      ) : null;
    const minorCourses =
      this.state.data.minorCourses != "" ? (
        <Segment>
          <List>
            <List.Item>
              <List.Icon name="stop" color="blue" />
              <List.Content>
                <h4>Minor Courses</h4>
                <p>{this.state.data.minorCourses}</p>
              </List.Content>
            </List.Item>
          </List>
        </Segment>
      ) : null;
    const languages =
      this.state.data.languages != "" ? (
        <Segment>
          <List>
            <List.Item>
              <List.Icon name="stop" color="blue" />
              <List.Content>
                <h4>Languages</h4>
                <p>{this.state.data.languages}</p>
              </List.Content>
            </List.Item>
          </List>
        </Segment>
      ) : null;

    return (
      <ComponentTransition>
        <Segment padded color={theme}>
          <div styleName="style.flex-box">
            <h3 styleName="style.heading">
              <Icon name="star" color={theme} /> Skills
            </h3>
            <div>
              {this.props.handle != undefined ? null : (
                <div>
                  <Icon color="grey" name="add" onClick={this.handleShow} />
                </div>
              )}
            </div>
          </div>
          {this.state.data != initial ? (
            <Segment.Group>
              {additionalCourses}
              {minorCourses}
              {computerLanguages}
              {softwarePackages}
              {languages}
            </Segment.Group>
          ) : null}
          <Dimmer active={this.state.active} page>
            <SkillForm
              data={this.state.data}
              createNew={this.state.createNew}
              handleHide={this.handleHide}
              handleUpdate={this.handleUpdate}
            />
          </Dimmer>
        </Segment>
      </ComponentTransition>
    );
  }
}
