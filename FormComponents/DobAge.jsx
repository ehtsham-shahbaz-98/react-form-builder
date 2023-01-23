import React from "react";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const DobAge = React.forwardRef((props, ref) => {
  const { name, defaultValue, disabled } = props;

  const [dobArray, setDobArray] = React.useState([
    {
      name: "one",
      value: 1,
    },
    {
      name: "two",
      value: 2,
    },
    {
      name: "three",
      value: 3,
    },
    {
      name: "four",
      value: 4,
    },
    {
      name: "five",
      value: 5,
    },
    {
      name: "six",
      value: 6,
    },
    {
      name: "seven",
      value: 7,
    },
    {
      name: "eight",
      value: 8,
    },
    {
      name: "nine",
      value: 9,
    },
    {
      name: "ten",
      value: 10,
    },
    {
      name: "eleven",
      value: 11,
    },
    {
      name: "twelve",
      value: 12,
    },
    {
      name: "thirteen",
      value: 13,
    },
    {
      name: "fourteen",
      value: 14,
    },
    {
      name: "fifteen",
      value: 15,
    },
    {
      name: "sixteen",
      value: 16,
    },
    {
      name: "seventeen",
      value: 17,
    },
    {
      name: "eighteen",
      value: 18,
    },
    {
      name: "nineteen",
      value: 19,
    },
    {
      name: "twenty",
      value: 20,
    },

    {
      name: "twenty-one",
      value: 21,
    },
    {
      name: "twenty-two",
      value: 22,
    },
    {
      name: "twenty-three",
      value: 23,
    },
    {
      name: "twenty-four",
      value: 24,
    },
    {
      name: "twenty-five",
      value: 25,
    },
    {
      name: "twenty-six",
      value: 26,
    },
    {
      name: "twenty-seven",
      value: 27,
    },
    {
      name: "twenty-eight",
      value: 28,
    },
    {
      name: "twenty-nine",
      value: 29,
    },
    {
      name: "thirty",
      value: 30,
    },

    {
      name: "thirty-one",
      value: 31,
    },
    {
      name: "thirty-two",
      value: 32,
    },
    {
      name: "thirty-three",
      value: 33,
    },
    {
      name: "thirty-four",
      value: 34,
    },
    {
      name: "thirty-five",
      value: 35,
    },
    {
      name: "thirty-six",
      value: 36,
    },
    {
      name: "thirty-seven",
      value: 37,
    },
    {
      name: "thirty-eight",
      value: 38,
    },
    {
      name: "thirty-nine",
      value: 39,
    },
    {
      name: "fourty",
      value: 40,
    },

    {
      name: "fourty-one",
      value: 41,
    },
    {
      name: "fourty-two",
      value: 42,
    },
    {
      name: "fourty-three",
      value: 43,
    },
    {
      name: "fourty-four",
      value: 44,
    },
    {
      name: "fourty-five",
      value: 45,
    },
    {
      name: "fourty-six",
      value: 46,
    },
    {
      name: "fourty-seven",
      value: 47,
    },
    {
      name: "fourty-eight",
      value: 48,
    },
    {
      name: "fourty-nine",
      value: 49,
    },
    {
      name: "fifty",
      value: 50,
    },

    {
      name: "fifty-one",
      value: 51,
    },
    {
      name: "fifty-two",
      value: 52,
    },
    {
      name: "fifty-three",
      value: 53,
    },
    {
      name: "fifty-four",
      value: 54,
    },
    {
      name: "fifty-five",
      value: 55,
    },
    {
      name: "fifty-six",
      value: 56,
    },
    {
      name: "fifty-seven",
      value: 57,
    },
    {
      name: "fifty-eight",
      value: 58,
    },
    {
      name: "fifty-nine",
      value: 59,
    },
    {
      name: "sixty",
      value: 60,
    },

    {
      name: "sixty-one",
      value: 61,
    },
    {
      name: "sixty-two",
      value: 62,
    },
    {
      name: "sixty-three",
      value: 63,
    },
    {
      name: "sixty-four",
      value: 4,
    },
    {
      name: "sixty-five",
      value: 65,
    },
    {
      name: "sixty-six",
      value: 66,
    },
    {
      name: "sixty-seven",
      value: 67,
    },
    {
      name: "sixty-eight",
      value: 68,
    },
    {
      name: "sixty-nine",
      value: 69,
    },
    {
      name: "seventy",
      value: 70,
    },

    {
      name: "seventy-one",
      value: 71,
    },
    {
      name: "seventy-two",
      value: 72,
    },
    {
      name: "seventy-three",
      value: 73,
    },
    {
      name: "seventy-four",
      value: 74,
    },
    {
      name: "seventy-five",
      value: 75,
    },
    {
      name: "seventy-six",
      value: 76,
    },
    {
      name: "seventy-seven",
      value: 77,
    },
    {
      name: "seventy-eight",
      value: 78,
    },
    {
      name: "seventy-nine",
      value: 79,
    },
    {
      name: "eighty",
      value: 80,
    },

    {
      name: "eighty-one",
      value: 81,
    },
    {
      name: "eighty-two",
      value: 82,
    },
    {
      name: "eighty-three",
      value: 83,
    },
    {
      name: "eighty-four",
      value: 84,
    },
    {
      name: "eighty-five",
      value: 85,
    },
    {
      name: "eighty-six",
      value: 86,
    },
    {
      name: "eighty-seven",
      value: 87,
    },
    {
      name: "eighty-eight",
      value: 88,
    },
    {
      name: "eighty-nine",
      value: 89,
    },
    {
      name: "ninety",
      value: 90,
    },

    {
      name: "ninety-one",
      value: 91,
    },
    {
      name: "ninety-two",
      value: 92,
    },
    {
      name: "ninety-three",
      value: 93,
    },
    {
      name: "ninety-four",
      value: 94,
    },
    {
      name: "ninety-five",
      value: 95,
    },
    {
      name: "ninety-six",
      value: 96,
    },
    {
      name: "ninety-seven",
      value: 97,
    },
    {
      name: "ninety-eight",
      value: 98,
    },
    {
      name: "ninety-nine",
      value: 99,
    },
    {
      name: "ninety",
      value: 100,
    },
  ]);

  const [dobAge, setDobAge] = React.useState("");

  const handleChange = (event) => {
    setDobAge(event.target.value);
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
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={dobAge}
              name={name}
              ref={ref}
              defaultValue={defaultValue}
              disabled={disabled}
              onChange={handleChange}
              placeholder="DOB Age"
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem disabled value="">
                <em>DOB Age</em>
              </MenuItem>
              {dobArray.map((item) => (
                <MenuItem value={item.value}>{item.value}</MenuItem>
              ))}
            </Select>
          </div>
        </Col>
      </Row>
    </>
  );
});

export default DobAge;
