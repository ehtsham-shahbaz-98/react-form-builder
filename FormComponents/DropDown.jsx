import React from "react";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const DropDown = React.forwardRef((props, ref) => {
  const { name, defaultValue, disabled } = props;

  const [dropDown, setDropDown] = React.useState(
    props?.data?.pageTitle?.split(",") || []
  );

  const [selectedOption, setSelectedOption] = React.useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <Row>
        <Col md={12}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={selectedOption}
              name={name}
              ref={ref}
              defaultValue={defaultValue}
              disabled={disabled}
              onChange={handleChange}
              placeholder="Drop Down"
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem disabled value="">
                <em>Drop Down</em>
              </MenuItem>
              {dropDown.map((value) => (
                <MenuItem value={value}>{value}</MenuItem>
              ))}
            </Select>
          </div>
        </Col>
      </Row>
    </>
  );
});

export default DropDown;
