// import React from "react";
// import { ReactFormBuilder, ElementStore, Registry } from "react-form-builder2";
// import "react-form-builder2/dist/app.css";

// const TestComponent = () => <h2>Hello</h2>;

// const MyInput = React.forwardRef((props, ref) => {
//   const { name, defaultValue, disabled } = props;
//   return (
//     <input
//       ref={ref}
//       name={name}
//       defaultValue={defaultValue}
//       disabled={disabled}
//     />
//   );
// });

// Registry.register("MyInput", MyInput);
// Registry.register("TestComponent", TestComponent);

// function ReactComponent() {
//   const items = [
//     {
//       key: "TestComponent",
//       element: "CustomElement",
//       component: TestComponent,
//       type: "custom",
//       field_name: "test_component",
//       name: "Something You Want",
//       icon: "fa fa-cog",
//       static: true,
//       props: { test: "test_comp" },
//       label: "Label Test",
//     },
//     {
//       key: "MyInput",
//       element: "CustomElement",
//       component: MyInput,
//       type: "custom",
//       forwardRef: true,
//       field_name: "my_input_",
//       name: "My Input",
//       icon: "fa fa-cog",
//       props: { test: "test_input" },
//       label: "Label Input",
//     },
//     // Additional standard components, you don't need full definition if no modification is required.
//     {
//       key: "Header",
//     },
//     {
//       key: "TextInput",
//     },
//     {
//       key: "TextArea",
//     },
//     {
//       key: "RadioButtons",
//     },
//     {
//       key: "Checkboxes",
//     },
//     {
//       key: "Image",
//     },
//   ];

//   return <ReactFormBuilder toolbarItems={items} />;
// }

// export default ReactComponent;
