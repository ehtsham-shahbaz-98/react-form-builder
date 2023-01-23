import React from "react";

import NumPad from "react-numpad";

import { TextField } from "@mui/material";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const NumericPad = React.forwardRef((props, ref) => {
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
            <NumPad.Number
              onChange={(value) => {
                console.log("value", value);
              }}
            >
              <TextField
                className="muiTextInput"
                id="outlined-basic"
                type="number"
                ref={ref}
                name={name}
                placeholder="Numpad"
                variant="outlined"
                defaultValue={defaultValue}
                disabled={disabled}
              />
            </NumPad.Number>
          </div>
        </Col>
      </Row>
    </>
  );
});

export default NumericPad;
