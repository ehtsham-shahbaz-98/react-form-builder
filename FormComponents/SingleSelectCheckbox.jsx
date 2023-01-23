import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

const SingleSelectCheckbox = React.forwardRef((props, ref) => {
  const { name, defaultValue, disabled } = props;

  const [singleCheckOption, setSingleCheckOption] = React.useState(
    props?.data?.pageTitle?.split(",") || []
  );

  const [personName, setPersonName] = React.useState("");

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

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
            <Select
              sx={{ width: "100%" }}
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput placeholder="Single Check Box" />}
              renderValue={(selected) => selected}
              MenuProps={MenuProps}
              ref={ref}
              name={name}
              defaultValue={defaultValue}
              disabled={disabled}
              placeholder="Single Check Box"
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem disabled value="">
                <em>Single Select Checkbox</em>
              </MenuItem>
              {singleCheckOption.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={personName === name} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </div>
        </Col>
      </Row>
    </>
  );
});

export default SingleSelectCheckbox;
