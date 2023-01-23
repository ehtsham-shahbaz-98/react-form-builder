import React from "react";
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

const MultiSelectCheckBox = React.forwardRef((props, ref) => {
  const { name, defaultValue, disabled } = props;

  const [multiCheckOptions, setMultiCheckOptions] = React.useState(
    props?.data?.pageTitle?.split(",") || []
  );

  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
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
              multiple
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput placeholder="Select Check Box" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
              ref={ref}
              name={name}
              defaultValue={defaultValue}
              disabled={disabled}
              placeholder="Select Check Box"
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem disabled value="">
                <em>Multi Select CheckBox</em>
              </MenuItem>
              {multiCheckOptions.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={personName.indexOf(name) > -1} />
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

export default MultiSelectCheckBox;
