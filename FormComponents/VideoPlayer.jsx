import React from "react";

// import { makeStyles } from "@mui/styles";

// import { VideoCard } from "material-ui-player";

import { TextField } from "@mui/material";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const VideoPlayer = React.forwardRef((props, ref) => {
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
          <TextField
            className="muiTextInput"
            id="outlined-basic"
            type="text"
            ref={ref}
            name={name}
            placeholder="Video Link"
            variant="outlined"
            defaultValue={defaultValue}
            disabled={disabled}
          />
        </div>
        {/* <VideoCard
          ref={ref}
          name={name}
          defaultValue={defaultValue}
          disabled={disabled}
          src={
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          }
        /> */}
      </Col>
    </Row>
  );
});

export default VideoPlayer;
