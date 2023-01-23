import React from "react";

import { Oval } from "react-loader-spinner";

const StandardSpinnerControl = React.forwardRef((props, ref) => {
  const { name, defaultValue, disabled } = props;
  return (
    <Oval
      name={name}
      defaultValue={defaultValue}
      disabled={disabled}
      ref={ref}
      height={80}
      width={80}
      color="#4fa94d"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#4fa94d"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );
});

export default StandardSpinnerControl;
