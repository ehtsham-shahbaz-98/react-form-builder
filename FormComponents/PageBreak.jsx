import React from "react";

import "../Questionnaire/Questionnaire.css";

const PageBreak = () => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    var element = document.getElementById(`childBreaker${count}`);
    element.parentNode.classList.add("active");

    Object.keys(element).map(() => {
      setCount(count + 1);
      element.parentNode.classList.add("active");
    });
  }, []);

  return (
    <div className="pageBreakContainer" id={`childBreaker${count}`}>
      <h5>Page Break</h5>
    </div>
  );
};

export default PageBreak;
