// import React, { useEffect, useState } from "react";
// /* eslint-disable react/jsx-curly-brace-presence */

// // import ReactDOM from 'react-dom';
// import { ReactFormBuilder, ElementStore, Registry } from "react-form-builder2";
// import axios from "axios";
// import "react-form-builder2/dist/app.css";
// // import { Input } from 'antd';
// import DemoBar from "./demobar";
// // import configurations from "./config.json";

// // import { Oval } from "react-loader-spinner";

// import * as variables from "./variables";

// import FormElementsEdit from "./form-element-edit";

// // const TestComponent = () => <h2>Hello</h2>;

// const Forms = () => {
//   const [formData, setFromData] = useState([]);
//   const [load, setLoad] = useState(false);
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     setItems([
//       // {
//       //   key: 'TestComponent',
//       //   element: 'CustomElement',
//       //   component: TestComponent,
//       //   type: 'custom',
//       //   field_name: 'TestComponent',
//       //   name: 'Something You Want',
//       //   icon: 'fa fa-cog',
//       //   static: true,
//       //   props: { test: 'test_comp' },
//       //   label: 'Label Test',
//       // },
//       {
//         key: "Header",
//       },
//       {
//         key: "TextInput",
//       },
//     ]);
//     setLoad(true);
//     // const RegistryList = Registry.list();
//     // const registerComponent = (name, component) => {
//     //   if (!RegistryList.includes(name)) {
//     //     Registry.register(name, component);
//     //   }
//     // };
//     // registerComponent("TestComponent", TestComponent);
//   }, []);

//   const [formId, setFormId] = useState(1);

//   const onLoad = () => {
//     // const url = getUrl(formId);
//     // console.log('onLoad', url);
//     // return get(url);
//     console.log(formData);
//     return new Promise((resolve) => {
//       console.log("onLoad", formData);
//       // post(saveUrl, data);
//       resolve(formData);
//     });
//   };

//   function arraymove(arr, fromIndex, toIndex) {
//     console.log("moving from ", fromIndex, toIndex);
//     const element = arr[fromIndex];
//     arr.splice(fromIndex, 1);
//     arr.splice(toIndex, 0, element);
//   }

//   const align = () => {
//     console.log(formData);
//     formData.forEach((element, i) => {
//       console.log(element);
//       if (element.parentId) {
//         arraymove(formData.task_data, i, element.parentIndex + element.col + 1);
//       }
//     });
//     return formData.task_data;
//   };

//   const onSubmit = () => {
//     const config = {
//       method: "post",
//       //   url: `${process.env.REACT_APP_API_URL}/FormBuilder/`,
//       url: "https://localhost:7154/FormBuilder/",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       data: align(),
//     };

//     axios(config)
//       .then(() => {
//         console.log("DATA SUBMITTED SUCCESSFULLY");
//         console.log("FORM DATA SUBMISSION ==> ", formData);
//         console.log("FORM DATA TYPE ==> ", typeof formData);
//         // navigate('/sor/view-sor', {
//         //   state: {
//         //     oID: currentDetails.organizationID,
//         //     orgName: currentDetails.organization,
//         //     pID: currentDetails.projectID,
//         //     projName: currentDetails.project,
//         //   },
//         // });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const onPost = (data) => {
//     // const saveUrl = getUrl(formId);
//     console.log(data);
//     setFromData(data.task_data);
//   };

//   return (
//     <>
//       {load ? (
//         <div className=" App mt-3">
//           <div>
//             <ReactFormBuilder
//               onLoad={onLoad}
//               onPost={onPost}
//               toolbarItems={items}
//               renderEditForm={(props) => (
//                 <FormElementsEdit formId={formId} {...props} />
//               )}
//             />
//           </div>
//           <div className="col-8">
//             <p style={{ marginBottom: 0 }}>Enter form Name</p>
//             <input type="text" size="large" placeholder="Inspection form" />

//             <button
//               type={"submit"}
//               style={{ textAlign: "center", align: "center", float: "right" }}
//               onClick={onSubmit}
//             >
//               SAVE
//             </button>

//             <DemoBar variables={variables} />
//           </div>
//         </div>
//       ) : null}
//     </>
//   );
// };

// export default Forms;
