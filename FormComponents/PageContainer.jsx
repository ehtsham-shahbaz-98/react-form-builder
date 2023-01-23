import React from "react";

const PageContainer = React.forwardRef((props, ref) => {
  const { name, defaultValue, disabled } = props;

  return (
    <div
      style={{
        display: "flex",
        height: "500px",
        width: "100%",
        backgroundColor: "#eee",
        // flexDirection: "column",
      }}
    ></div>
  );
});

export default PageContainer;
