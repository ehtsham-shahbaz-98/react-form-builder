import React from "react";

import { TextField } from "@mui/material";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const AgeRangeYear = React.forwardRef((props, ref) => {
  const { name, defaultValue, disabled } = props;
  return (
    <>
      <Row>
        <Col md={12}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "left",
            }}
          >
            <TextField
              className="muiTextInput"
              id="outlined-basic"
              type="number"
              ref={ref}
              name={name}
              placeholder="Age Year"
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

export default AgeRangeYear;
