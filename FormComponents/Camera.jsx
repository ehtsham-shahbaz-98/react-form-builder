import React from "react";
import { FaCamera, FaTimesCircle } from "react-icons/fa";

import { Button } from "@mui/material";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "../Questionnaire/Questionnaire.css";

const Camera = React.forwardRef((props, ref) => {
  const { name, defaultValue, disabled } = props;

  const [selectedFile, setSelectedFile] = React.useState(null);
  const [imgPreview, setImgPreview] = React.useState(null);

  const removeImage = () => {
    setImgPreview(null);
    setSelectedFile(null);
  };

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
          {imgPreview === null ? (
            <>
              <Button
                variant="outlined"
                component="label"
                className="questionnaire-btn"
              >
                <input
                  ref={ref}
                  name={name}
                  defaultValue={defaultValue}
                  disabled={disabled}
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={(event) => {
                    var file = event.target.files[0];
                    const reader = new FileReader();
                    var url = reader.readAsDataURL(file);
                    // setFieldValue("file", event.target.files[0]);
                    reader.onloadend = function (e) {
                      setImgPreview([reader.result]);
                    };
                    setSelectedFile(file);
                  }}
                />
                <FaCamera
                  size={"20px"}
                  style={{ width: "80px !important", textAlign: "center" }}
                />
              </Button>
            </>
          ) : (
            <>
              <div className="uploadAfterBody">
                <button
                  style={{
                    position: "absolute",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => removeImage()}
                >
                  <FaTimesCircle
                    style={{
                      fontSize: "20px",
                      color: "red !important",
                      marginLeft: "230px",
                      marginBottom: "250px",
                      color: "red"
                    }}
                  />
                </button>
                <img src={imgPreview} className="uploadImgAfter" />
              </div>
            </>
          )}
        </div>
      </Col>
    </Row>
  );
});

export default Camera;
