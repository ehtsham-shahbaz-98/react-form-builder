import React from "react";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FormControl } from "@mui/material";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const AssignedDrugKit = React.forwardRef((props, ref) => {
  const { name, defaultValue, disabled } = props;

  const [drugOptions, setDrugOptions] = React.useState(
    props?.data?.pageTitle?.split(",") || []
  );

  const [selectedDrugKit, setSelectedDrugKit] = React.useState("");

  const handleDrugChange = (event) => {
    setSelectedDrugKit(event.target.value);
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
            <FormControl className="nameField">
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={selectedDrugKit}
                name={name}
                ref={ref}
                defaultValue={defaultValue}
                disabled={disabled}
                onChange={handleDrugChange}
                placeholder="Assigned Drug Kit"
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem disabled value="">
                  <em>Assigned Drug Kit</em>
                </MenuItem>
                {drugOptions.map((value) => (
                  <MenuItem value={value}>{value}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </Col>
      </Row>
    </>
  );
});

export default AssignedDrugKit;
