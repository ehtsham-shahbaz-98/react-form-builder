import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { TextField } from "@mui/material";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const RadioButtonImage = React.forwardRef((props, ref) => {
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
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name={name}
              defaultValue={defaultValue}
              disabled={disabled}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </div>
        </Col>
      </Row>
    </>
  );
});

export default RadioButtonImage;
