import React from "react";

import Checkbox from "@mui/material/Checkbox";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const CheckBox = React.forwardRef((props, ref) => {
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
            <Checkbox
              {...label}
              type="checkbox"
              ref={ref}
              name={name}
              defaultValue={defaultValue}
              disabled={disabled}
            />
          </div>
        </Col>
      </Row>
    </>
  );
});

export default CheckBox;
