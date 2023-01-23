import React from "react";

import { TextField } from "@mui/material";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import dayjs from "dayjs";
// import Stack from "@mui/material/Stack";
// import TextField from "@mui/material/TextField";
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

const VisitDatePicker = React.forwardRef((props, ref) => {
  const { name, defaultValue, disabled } = props;

  // const [value, setValue] = React.useState(dayjs("2014-08-18T21:11:54"));

  // const handleChange = (newValue) => {
  //   setValue(newValue);
  // };

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
              placeholder="Visit Date Picker"
              variant="outlined"
              defaultValue={defaultValue}
              disabled={disabled}
            />
          </div>
        </Col>
      </Row>
    </>
    // <LocalizationProvider dateAdapter={AdapterDayjs}>
    //   <Stack spacing={3}>
    //     <DesktopDatePicker
    //       name={name}
    //       disabled={disabled}
    //       label="Date desktop"
    //       inputFormat="MM/DD/YYYY"
    //       // value={value}
    //       defaultValue={defaultValue}
    //       onChange={handleChange}
    //       renderInput={(params) => <TextField {...params} />}
    //     />
    //   </Stack>
    // </LocalizationProvider>
  );
});

export default VisitDatePicker;
