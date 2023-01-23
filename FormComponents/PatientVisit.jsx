import React from "react";

import { TextField } from "@mui/material";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const PatientVisit = React.forwardRef((props, ref) => {
  const { name, defaultValue, disabled } = props;
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
            <TextField
              className="muiTextInput"
              id="outlined-basic"
              type="text"
              ref={ref}
              name={name}
              placeholder="Patient Visit"
              variant="outlined"
              defaultValue={defaultValue}
              disabled={disabled}
            />
          </div>
        </Col>
      </Row>
    </>
  );
});

export default PatientVisit;
