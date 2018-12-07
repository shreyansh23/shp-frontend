import React, { Component } from "react";
import { Segment, Header } from "semantic-ui-react";

import { AppHeader, AppFooter, AppMain } from "formula_one";
import app from "./stylesheets/app.css";
import { InterestList } from "./components/interestList";
import { InternshipList } from "./components/internshipList";
import { LinkDisplay } from "./components/linkDisplay";
import { LinkForm } from "./components/linkForm";
import { Profile } from "./components/profile";
const creators = [
  {
    name: "Mahip Jain",
    role: "Mentor"
  },
  {
    name: "Dhruv Bhanushali",
    role: "Backend Mentor"
  },

  {
    name: "Gaurav Kumar",
    role: "Frontend Mentor"
  },
  {
    name: "Praduman Goyal",
    role: "Frontend Mentor"
  },
  {
    name: "Ajay Neethi Kannan",
    role: "Developer"
  },
  {
    name: "Shreyansh Jain",
    role: "Developer"
  }
];
class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div styleName="app.wrapper">
        <AppHeader
          appName="student_profile"
          appLogo={false}
          appLink={`http://${window.location.host}`}
          userDropdown
        />
        <AppMain>
          <div styleName="app.app-content">
            <Segment attached="top">
              <Segment basic>
                <Header as="h2">About me</Header>
                Electrical Engineering undergraduate, exploring Web Development
                and having an interest in Mathematics.
              </Segment>
            </Segment>
            <InterestList />
            <InternshipList />
           
            <Profile/>
          </div>
        </AppMain>
        
      </div>
    );
  }
}

export default App;
