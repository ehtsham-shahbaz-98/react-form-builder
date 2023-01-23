import React from "react";

import { TextField } from "@mui/material";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const TextArea = React.forwardRef((props, ref) => {
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
              placeholder="Text Area"
              variant="outlined"
              defaultValue={defaultValue}
              disabled={disabled}
              multiline
              rows={5}
              maxRows={15}
            />
          </div>
        </Col>
      </Row>
    </>
  );
});

export default TextArea;
