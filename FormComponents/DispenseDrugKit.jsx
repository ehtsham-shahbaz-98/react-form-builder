import React from "react";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const DispenseDrugKit = React.forwardRef((props, ref) => {
  const { name, defaultValue, disabled } = props;

  const [dispenseDrug, setDispenseDrug] = React.useState(
    props?.data?.pageTitle?.split(",") || []
  );

  const [selectedDispenseDrug, setSelectedDispenseDrug] = React.useState("");

  const handleDispenseChange = (event) => {
    setSelectedDispenseDrug(event.target.value);
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
              value={selectedDispenseDrug}
              name={name}
              ref={ref}
              defaultValue={defaultValue}
              disabled={disabled}
              onChange={handleDispenseChange}
              placeholder="Dispense Drug Kit"
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem disabled value="">
                <em>Dispense Drug Kit</em>
              </MenuItem>
              {dispenseDrug.map((value) => (
                <MenuItem value={value}>{value}</MenuItem>
              ))}
            </Select>
          </div>
        </Col>
      </Row>
    </>
  );
});

export default DispenseDrugKit;
