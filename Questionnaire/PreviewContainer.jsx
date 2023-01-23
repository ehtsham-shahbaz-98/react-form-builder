import React from "react";
import { ReactFormGenerator } from "react-form-builder2";
import "react-form-builder2/dist/app.css";

const PreviewContainer = ({ newJsonForm, showPreviousForm, state }) => {
  return (
    <div style={{ height: "400px", width: "100%" }}>
      {" "}
      {/* <ReactFormGenerator
        className="previewGenerator"
        data={newJsonForm[showPreviousForm[state.page]]}
      /> */}
      {newJsonForm[showPreviousForm[state.page]]}
    </div>
  );
};

export default PreviewContainer;
