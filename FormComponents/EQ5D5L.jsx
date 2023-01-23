import React from "react";

import { TextField } from "@mui/material";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const EQ5D5L = React.forwardRef((props, ref) => {
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
              type="date"
              ref={ref}
              name={name}
              placeholder="EQ5D5L"
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

export default EQ5D5L;
