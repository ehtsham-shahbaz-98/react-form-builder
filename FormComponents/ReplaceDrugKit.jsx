import React from "react";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ReplaceDrugKit = React.forwardRef((props, ref) => {
  const { name, defaultValue, disabled } = props;

  const [replaceDrug, setReplaceDrug] = React.useState(
    props?.data?.pageTitle?.split(",") || []
  );

  const [selectedReplaceKit, setSelectedReplaceKit] = React.useState("");

  const handleReplaceKitChange = (event) => {
    setSelectedReplaceKit(event.target.value);
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
              value={selectedReplaceKit}
              name={name}
              ref={ref}
              defaultValue={defaultValue}
              disabled={disabled}
              onChange={handleReplaceKitChange}
              placeholder="Replace Drug Kit"
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem disabled value="">
                <em>Replace Drug Kit</em>
              </MenuItem>
              {replaceDrug.map((value) => (
                <MenuItem value={value}>{value}</MenuItem>
              ))}
            </Select>
          </div>
        </Col>
      </Row>
    </>
  );
});

export default ReplaceDrugKit;
