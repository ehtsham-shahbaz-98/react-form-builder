import React from "react";
import { TextField } from "@mui/material";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "../Questionnaire/Questionnaire.css";

const AgeRange = React.forwardRef((props, ref) => {
  // console.log("PROPS ==> ", props);
  const { name, defaultValue, disabled } = props;  

  return (
    <>
      <Row>
        <Col md={12}>
          <div className="ageRangeInputBody">
            <div>
              <TextField
                className="muiTextInput"
                id="outlined-basic"
                type="date"
                ref={ref}
                name={name}
                placeholder="From"
                variant="outlined"
                defaultValue={defaultValue}
                disabled={disabled}
              />
            </div>
            <div>
              <TextField
                className="muiTextInput"
                id="outlined-basic"
                type="date"
                ref={ref}
                name={name}
                placeholder="To"
                variant="outlined"
                defaultValue={defaultValue}
                disabled={disabled}
              />
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
});

export default AgeRange;
