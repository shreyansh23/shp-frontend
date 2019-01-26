import React from "react";
import { Form, Message, Button, Icon, Dropdown, Segment } from "semantic-ui-react";
import { getCookie } from "formula_one";
import axios from "axios";

import { Resume } from "./resume";
import style from "../styles.css";
import { ComponentTransition } from "./transition";
import { ErrorTransition } from "./transition";

const themeOptions = [
  { text: "Luscious Red", key: "red", value: "red" },
  { text: "Maverick Orange", key: "orange", value: "orange" },
  { text: "Sunkissed Yellow", key: "yellow", value: "yellow" },
  { text: "Disgusting Olive", key: "olive", value: "olive" },
  { text: "Earthly Green", key: "green", value: "green" },
  { text: "Aqua Teal", key: "teal", value: "teal" },
  { text: "Default Blue", key: "blue", value: "blue" },
  { text: "Rich Lavender", key: "violet", value: "violet" },
  { text: "Lightning Purple", key: "purple", value: "purple" },
  { text: "Proud Pink", key: "pink", value: "pink" },
  { text: "Wicked Black", key: "black", value: "black" },
  { text: "No color", key: "zero", value: "zero" }
];

import { ProfileImagePreview } from "./profileImagePreview";
const initial = {
  data: {
    handle: "",
    student: "",
    description: "",
    theme: "",
    customWebsite: false,
    resume: null
  }
};
//default handle must be there
export class ProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      createNew: props.createNew,
      resumeLink: props.data.resume,
      resume: null,
      theme: this.props.theme,
      list: null,
      errors: [],
      image: props.person_data.displayPicture,
      img_file: "",
      initial_handle: props.data.handle
    };
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleEscape, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleEscape, false);
  }
  handleEscape = e => {
    if (e.keyCode === 27) {
      this.props.handleHide();
    }
    if (e.keyCode === 13) {
      this.handleErrors();
    }
  };
  handleChange = (event, { name = undefined, value }) => {
    event.persist();
    if (this.state.data.hasOwnProperty(name)) {
      this.setState({ data: { ...this.state.data, [name]: value } });
    }
  };
  handleSubmit = e => {
    let data = new FormData();
    data.append("handle", this.state.data.handle);
    data.append("theme", this.state.data.theme);
    data.append("description", this.state.data.description);
    if (this.state.resumeLink != null && this.state.resume != null) {
      data.append("resume", this.state.resume);
    } else if (this.state.resume == null && this.state.resumeLink != null) {
    } else if (this.state.resume == null && this.state.resumeLink == null) {
      data.append("resume", "");
    }
    if (this.state.image != "" && this.state.img_file != "") {
      data.append("image", this.state.img_file);
    } else if (this.state.img_file == "" && this.state.image != "") {
    } else if (this.state.img_file == "" && this.state.image == "") {
      data.append("image", null);
    }
    let headers = {
      "X-CSRFToken": getCookie("csrftoken"),
      "Content-type": "multipart/form-data"
    };
    let request_type = "patch";
    if (this.state.createNew) request_type = "post";
    if (this.state.createNew) {
      axios({
        method: request_type,
        url: "/api/student_profile/profile/",
        data: data,
        headers: headers
      }).then(response => {
        let data = response.data;
        let displayPicture = data.displayPicture;
        if (displayPicture != null) {
          displayPicture = displayPicture;
        }

        this.props.handleUpdate(data, false, displayPicture);
      });
    } else {
      axios({
        method: request_type,
        url: "/api/student_profile/profile/" + this.state.data.id + "/",
        data: data,
        headers: headers
      }).then(response => {
        let data = response.data;
        let displayPicture = data.displayPicture;
        if (displayPicture != null) {
          displayPicture = displayPicture;
        }
        this.props.handleUpdate(data, false, displayPicture);
      });
    }
  };
  handleUpdateDelete = () => {
    let headers = {
      "X-CSRFToken": getCookie("csrftoken")
    };
    if (!this.state.createNew) {
      axios({
        method: "delete",
        url: "/api/student_profile/profile/" + this.state.data.id + "/",
        headers: headers
      }).then(response => {
        this.setState({
          data: response.data,
          resumeLink: response.data.resume
        });
      });
    }
  };
  handleFile = event => {
    this.setState({
      resume: event.target.files[0],
      resumeLink: event.target.value
    });
    event.target.value = null;
  };
  handleDelete = () => {
    this.setState({
      resume: null,
      resumeLink: null
    });
  };
  handleErrors = () => {
    let errors = [];
    const { handle, description, theme, student } = this.state.data;
    const { createNew } = this.state;

    let headers = {
      "X-CSRFToken": getCookie("csrftoken"),
      "Content-type": "multipart/form-data"
    };
    if (handle == "") {
      errors.push("Handle must be filled");
    } else if (/^[a-zA-Z](-*_*[a-zA-Z0-9])*$/.test(handle) == false) {
      errors.push("Enter valid handle (avoid spaces and special characters)");
    }
    if (description == "") {
      errors.push("Description must be filled");
    }
    axios({
      method: "get",
      url: "/api/student_profile/profile/" + handle + "/handle/",
      headers: headers
    })
      .then(response => {
        if (createNew == true || response.data.student != student) {
          errors.push("Handle is already taken");
        }
        if (errors.length > 0) {
          this.setState({ errors: errors });
        } else {
          this.setState({ errors: [] }, () => {
            this.props.changeTheme(theme);
            if (this.state.update == false) this.handleSubmit();
            else this.handleSubmit();
          });
        }
      })
      .catch(error => {
        if (errors.length > 0) {
          this.setState({ errors: errors });
        } else {
          this.setState({ errors: [] }, () => {
            this.props.changeTheme(theme);
            if (this.state.update == false) this.handleSubmit();
            else this.handleSubmit();
          });
        }
      });
  };
  handleImageChange = e => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      const image = reader.result;
      this.setState({
        img_file: file,
        image: image
      });
    };

    reader.readAsDataURL(file);
  };
  removeImage = () => {
    this.setState({ image: "", img_file: "" });
  };
  render() {
    let res = (
      <Form.Field>
        <input type="file" onChange={this.handleFile} styleName="style.inputfile" id="embedpollfileinput1" />
        <div styleName="style.inputLabel">
          <label htmlFor="embedpollfileinput1" className="ui blue button">
            <i className="ui upload icon" />
            Upload Resume
          </label>
        </div>
      </Form.Field>
    );
    let imagePreview = (
      <div>
        <input type="file" onChange={this.handleImageChange} styleName="style.inputfile" id="embedpollfileinput" />
        <div styleName="style.inputLabel">
          <label htmlFor="embedpollfileinput" className="ui blue button">
            <i className="ui upload icon" />
            Upload profile image
          </label>
        </div>
      </div>
    );
    if (this.state.image) {
      imagePreview = (
        <ProfileImagePreview
          imagePreviewUrl={this.state.image.replace("http://localhost:3003/", "http://192.168.121.228:60025/")}
          removeImage={this.removeImage}
        />
      );
    }

    if (this.state.resumeLink) {
      res = (
        <Form.Field>
          <Resume resume={this.state.resumeLink} handleDelete={this.handleDelete} />
        </Form.Field>
      );
    }
    return (
      <ComponentTransition>
        <div style={{ minWidth: "350px" }}>
          <Segment attached="top" styleName="style.headingBox">
            <h3 styleName="style.heading">Profile</h3>
            <Icon color="grey" name="delete" onClick={this.props.handleHide} />
          </Segment>
          <Segment attached styleName="style.formStyle">
            <ErrorTransition errors={this.state.errors} />
            <Form autoComplete="off">
              <Form.Field>{imagePreview}</Form.Field>
              <Form.Field>
                <Form.Input
                  required
                  label="Handle"
                  onChange={this.handleChange}
                  value={this.state.data.handle}
                  name="handle"
                  placeholder="Change your handle"
                />
              </Form.Field>
              <Form.Field required styleName="style.themeField">
                <label>Theme</label>
                <Dropdown
                  onChange={this.handleChange}
                  name="theme"
                  options={themeOptions}
                  placeholder="Choose theme options"
                  selection
                  value={this.state.data.theme}
                />
              </Form.Field>
              <Form.Field>
                <Form.TextArea
                  label="Description"
                  onChange={this.handleChange}
                  value={this.state.data.description}
                  name="description"
                  placeholder="Describe yourself"
                />
              </Form.Field>

              {res}
            </Form>
          </Segment>

          <Segment attached="bottom" styleName="style.buttonBox">
            <Button onClick={this.handleErrors} color="blue" type="submit">
              Submit
            </Button>
          </Segment>
        </div>
      </ComponentTransition>
    );
  }
}
