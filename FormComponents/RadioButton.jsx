import React from "react";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const RadioButton = React.forwardRef((props, ref) => {
  const { name, defaultValue, disabled } = props;
  return (
    <Row>
      <Col md={12}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FormControlLabel
            value="male"
            control={<Radio />}
            label="Male"
            name={name}
            defaultValue={defaultValue}
            disabled={disabled}
          />
        </div>
      </Col>
    </Row>
  );
});

export default RadioButton;
