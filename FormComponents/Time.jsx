import React from "react";

import { TextField } from "@mui/material";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Time = React.forwardRef((props, ref) => {
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
              type="time"
              ref={ref}
              name={name}
              placeholder="Date"
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

export default Time;
