import React from "react";

import axios from "axios";

const GetQuestionnaire = () => {
  const [formData, setFormData] = React.useState([]);
  const [load, setLoad] = React.useState(false);

  const fetchFormData = () => {
    const config = {
      method: "get",
      url: "${process.env.REACT_APP_FORM_API}/Form/",
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then((res) => {
        console.log("GET RESSS => ", res);
        setFormData(res.data);
        //   notify();
      })
      .catch((error) => {
        //   requestFailed();
        console.log("Form Submission Error ===> ", error);
      });
  };

  React.useEffect(() => {
    fetchFormData();
  }, []);

  return (
    <>
      <div>Get Questionnaire Data</div>
      <div style={{ width: "100%", height: "auto", color: "black" }}>
        {formData.map((form, key) => (
          <div key={key}>
            <div>Form ID: {form.formId}</div>
            <br />
            <div>Created At: {form.createdAt}</div>
            <br />
            <div>Form JSON: {form.formJson}</div>
            <br />
          </div>
        ))}
      </div>
    </>
  );
};

export default GetQuestionnaire;
