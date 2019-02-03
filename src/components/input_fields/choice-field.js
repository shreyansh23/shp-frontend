import React from "react";
import { Dropdown, Form } from "semantic-ui-react";



export default class ChoiceField extends React.PureComponent {
  render() {
    const { name, value, options, placeholder,  handleChange, required, label} = this.props;
    return (
      <Form.Field required = {required}>
              <label>{label}</label>
              <Dropdown
                onChange={(e,{name, value} ) => handleChange(name, value)}
                name={name}
                options={options}
                placeholder={placeholder}
                selection
                value={value}
              />
            </Form.Field>
    );
  }
}
