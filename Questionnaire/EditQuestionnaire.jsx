import React, { useEffect, useState, useRef } from "react";
import { ReactFormBuilder, Registry } from "react-form-builder2";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import history from "../../hooks/history";
import DemoBar from "../FormBuilder/demobar";
import * as variables from "../FormBuilder/variables";
import FormElementsEdit from "../FormBuilder/form-element-edit";
import "react-form-builder2/dist/app.css";
import { toast } from "react-toastify";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import "./Questionnaire.css";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import BeatLoader from "react-spinners/BeatLoader";
import { getFormById, changeFormStatus } from "../../services/form-builder";
import AgeRange from "../FormComponents/AgeRange";
import AgeRangeYear from "../FormComponents/AgeRangeYear";
import AssignedDrugKit from "../FormComponents/AssignedDrugKit";
import Camera from "../FormComponents/Camera";
import CheckBox from "../FormComponents/CheckBox";
import Date from "../FormComponents/Date";
import Time from "../FormComponents/Time";
import DispenseDrugKit from "../FormComponents/DispenseDrugKit";
import DobAge from "../FormComponents/DobAge";
import DropDown from "../FormComponents/DropDown";
import DurationSpinner from "../FormComponents/DurationSpinner";
import EQ5D5L from "../FormComponents/EQ5D5L";
import HotSpot from "../FormComponents/HotSpot";
import ListView from "../FormComponents/ListView";
import MultiSelectCheckBox from "../FormComponents/MultiSelectCheckBox";
import None from "../FormComponents/None";
import NRS from "../FormComponents/NRS";
import NumberSpinnerNumericPad from "../FormComponents/NumberSpinnerNumericPad";
import NumberSpinner from "../FormComponents/NumberSpinner";
import NumericPad from "../FormComponents/NumericPad";
import PatientVisit from "../FormComponents/PatientVisit";
import PriorityList from "../FormComponents/PriorityList";
import RadioButton from "../FormComponents/RadioButton";
import RadioButtonGroup from "../FormComponents/RadioButtonGroup";
import RadioButtonImage from "../FormComponents/RadioButtonImage";
import ReplaceDrugKit from "../FormComponents/ReplaceDrugKit";
import SingleSelectCheckbox from "../FormComponents/SingleSelectCheckbox";
import StandardSpinnerControl from "../FormComponents/StandardSpinnerControl";
import TextArea from "../FormComponents/TextArea";
import TimeTwo from "../FormComponents/TimeTwo";
import VAS from "../FormComponents/VAS";
import VideoPlayer from "../FormComponents/VideoPlayer";
import VisitDatePicker from "../FormComponents/VisitDatePicker";
import SubmitQuestionnaire from "./SubmitQuestionnaire";
import PageBreak from "../FormComponents/PageBreak";
import DialogBox from "../../components/DialogBox";
import { useCallbackPrompt } from "../../hooks/useCallbackPrompt";

const label = { inputProps: { "aria-label": "Switch demo" } };

const EditQuestionnaire = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * TODO:
   * Fix this formIsActive state that is causing the component to trigger
   * handleFormIsActive state function.
   */

  var id = location.state.id;
  var formEditName = location.state.name;
  var formStatus = location.state.status;

  const [formData, setFromData] = React.useState([]);
  const [formName, setFormName] = React.useState("");
  const [formId, setFormId] = React.useState(1);
  const [items, setItems] = React.useState([]);
  const [load, setLoad] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [formIsActive, setFormIsActive] = useState(formStatus);
  const isInitialMount = useRef(true);

  const [formJson, setFormJson] = useState("");

  const [showDialog, setShowDialog] = React.useState(false);
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(showDialog);

  const fetchFormData = async (id) => {
    try {
      const res = await getFormById(id);
      console.log("Resss ===> ", res);
      setFormJson(JSON.parse(res.data.formJson));
      setFormName(res.data.formName);
      setLoad(false);
    } catch (err) {
      console.log("Error: ", err.message);
      setLoad(false);
    }
  };

  React.useEffect(() => {
    formJson === null || "" ? setShowDialog(false) : setShowDialog(true);
  }, [formJson]);

  useEffect(() => {
    setItems([
      {
        key: "PageBreak",
        element: "CustomElement",
        component: PageBreak,
        type: "custom",
        forwardRef: true,
        field_name: "visit_date_picker",
        name: "Page Break",
        icon: "fas fa-divide",
        props: { test: "page_break", customPageBreak: true },
        label: "Page Break",
      },
      {
        key: "AgeRange",
        element: "CustomElement",
        component: AgeRange,
        type: "custom",
        forwardRef: true,
        field_name: "age_date_range",
        name: "Age Date Range Picker",
        icon: "fa fa-calendar",
        props: { test: "age_date_range" },
        label: "Age Date Range",
      },
      {
        key: "AgeRangeYear",
        element: "CustomElement",
        component: AgeRangeYear,
        type: "custom",
        forwardRef: true,
        field_name: "age_date_range_year",
        name: "Age Select For Year Only",
        icon: "fas fa-calendar-alt",
        props: { test: "age_date_range_year" },
        label: "Age Range Year",
      },
      {
        key: "AssignedDrugKit",
        element: "CustomElement",
        component: AssignedDrugKit,
        type: "custom",
        forwardRef: true,
        field_name: "assigned_drug_kit",
        name: "Assigned Drug Kit Selector",
        icon: "fa fa-medkit",
        props: {
          test: "assigned_drug_kit",
          hasDropDown: true,
          hasPageTitle: true,
          pageTitle: "",
        },
        label: "Assigned Drug Kit Selector",
      },
      {
        key: "Camera",
        element: "CustomElement",
        component: Camera,
        type: "custom",
        forwardRef: true,
        field_name: "camera",
        name: "Camera",
        icon: "fas fa-camera",
        props: { test: "camera" },
        label: "Upload Image",
      },
      {
        key: "CheckBox",
        element: "CustomElement",
        component: CheckBox,
        type: "custom",
        forwardRef: true,
        field_name: "checkbox",
        name: "CheckBox",
        icon: "fas fa-check-square",
        props: { test: "checkbox" },
        label: "Check Box",
      },
      {
        key: "Date",
        element: "CustomElement",
        component: Date,
        type: "custom",
        forwardRef: true,
        field_name: "date",
        name: "date",
        icon: "far fa-calendar-alt",
        props: { test: "date" },
        label: "Select Date",
      },
      {
        key: "Time",
        element: "CustomElement",
        component: Time,
        type: "custom",
        forwardRef: true,
        field_name: "time",
        name: "Time",
        icon: "fas fa-clock",
        props: { test: "time" },
        label: "Select Time",
      },
      {
        key: "DispenseDrugKit",
        element: "CustomElement",
        component: DispenseDrugKit,
        type: "custom",
        forwardRef: true,
        field_name: "dispenseDrugKit",
        name: "Dispense Drug Kit Selector",
        icon: "fa fa-medkit",
        props: {
          test: "dispense_drug_kit",
          hasDropDown: true,
          hasPageTitle: true,
          pageTitle: "",
        },
        label: "Dispense Drug Input",
      },
      {
        key: "DobAge",
        element: "CustomElement",
        component: DobAge,
        type: "custom",
        forwardRef: true,
        field_name: "dob_age_selector",
        name: "Dob Age Selector",
        icon: "far fa-calendar-check",
        props: { test: "dob_age_selector" },
        label: "DOB Age",
      },
      {
        key: "DropDown",
        element: "CustomElement",
        component: DropDown,
        type: "custom",
        forwardRef: true,
        field_name: "drop_down",
        name: "Dropdown",
        icon: "fas fa-caret-square-down",
        props: {
          test: "drop_down",
          hasDropDown: true,
          hasPageTitle: true,
          pageTitle: "",
        },
        label: "Drop Down",
      },
      {
        key: "DurationSpinner",
        element: "CustomElement",
        component: DurationSpinner,
        type: "custom",
        forwardRef: true,
        field_name: "duration-spinner",
        name: "Duration Spinner",
        icon: "fas fa-circle-notch",
        props: { test: "duration-spinner" },
        label: "Duration Spinner",
      },
      {
        key: "EQ5D5L",
        element: "CustomElement",
        component: EQ5D5L,
        type: "custom",
        forwardRef: true,
        field_name: "eq-5d-5l",
        name: "EQ-5D-5L",
        icon: "fas fa-plus",
        props: { test: "eq-5d-5l" },
        label: "EQ5D5L",
      },
      {
        key: "HotSpot",
        element: "CustomElement",
        component: HotSpot,
        type: "custom",
        forwardRef: true,
        field_name: "hot-spot",
        name: "Hot Spot Multiple Select HotSpot Single Select",
        icon: "fas fa-rss",
        props: { test: "hot-spot" },
        label: "Hot Spot",
      },
      {
        key: "ListView",
        element: "CustomElement",
        component: ListView,
        type: "custom",
        forwardRef: true,
        field_name: "list-view",
        name: "ListView",
        icon: "fas fa-list-ul",
        props: { test: "list-view" },
        label: "List View",
      },
      {
        key: "MultiSelectCheckBox",
        element: "CustomElement",
        component: MultiSelectCheckBox,
        type: "custom",
        forwardRef: true,
        field_name: "multi-select-check-box",
        name: "MultiSelect CheckBox Conrol",
        icon: "fas fa-check-circle",
        props: {
          test: "multi-select-check-box",
          hasDropDown: true,
          hasPageTitle: true,
          pageTitle: "",
        },
        label: "Multi Select Checkbox",
      },
      {
        key: "None",
        element: "CustomElement",
        component: None,
        type: "custom",
        forwardRef: true,
        field_name: "none",
        name: "None",
        icon: "fa fa-ban",
        props: { test: "none" },
        label: "None",
      },
      {
        key: "NRS",
        element: "CustomElement",
        component: NRS,
        type: "custom",
        forwardRef: true,
        field_name: "nrs",
        name: "NRS",
        icon: "fas fa-plus",
        props: { test: "nrs" },
        label: "NRS",
      },
      {
        key: "NumberSpinnerNumericPad",
        element: "CustomElement",
        component: NumberSpinnerNumericPad,
        type: "custom",
        forwardRef: true,
        field_name: "number_spinner_numeric_pad",
        name: "NumberSpinner NumericPad",
        icon: "fas fa-plus",
        props: { test: "number_spinner_numeric_pad" },
        label: "Number Spinner Numeric Pad",
      },
      {
        key: "NumberSpinner",
        element: "CustomElement",
        component: NumberSpinner,
        type: "custom",
        forwardRef: true,
        field_name: "number_spinner",
        name: "NumberSpinner",
        icon: "fas fa-spinner",
        props: { test: "number_spinner" },
        label: "Number Spinner",
      },
      {
        key: "NumericPad",
        element: "CustomElement",
        component: NumericPad,
        type: "custom",
        forwardRef: true,
        field_name: "numeric_pad",
        name: "Numeric Pad",
        icon: "fa fa-list-ol",
        props: { test: "numeric_pad" },
        label: "Numeric Pad",
      },
      {
        key: "PatientVisit",
        element: "CustomElement",
        component: PatientVisit,
        type: "custom",
        forwardRef: true,
        field_name: "patient_visit",
        name: "Patient Visit Drug Kit Status Selector",
        icon: "far fa-hospital",
        props: { test: "patient_visit" },
        label: "Patient Visit",
      },
      {
        key: "PriorityList",
        element: "CustomElement",
        component: PriorityList,
        type: "custom",
        forwardRef: true,
        field_name: "priority_list",
        name: "Priority List",
        icon: "fas fa-tasks",
        props: { test: "priority_list" },
        label: "Priority List",
      },
      {
        key: "RadioButton",
        element: "CustomElement",
        component: RadioButton,
        type: "custom",
        forwardRef: true,
        field_name: "radio_button",
        name: "RadioButton",
        icon: "far fa-dot-circle",
        props: { test: "radio_button" },
        label: "Radio Button",
      },
      {
        key: "RadioButtonGroup",
        element: "CustomElement",
        component: RadioButtonGroup,
        type: "custom",
        forwardRef: true,
        field_name: "radio-button-group",
        name: "Radio Button Group Header",
        icon: "fas fa-list-ul",
        props: { test: "radio-button-group" },
        label: "Radio Button Group",
      },
      {
        key: "RadioButtonImage",
        element: "CustomElement",
        component: RadioButtonImage,
        type: "custom",
        forwardRef: true,
        field_name: "radio-button-image",
        name: "Radio Button Image",
        icon: "fas fa-file-image",
        props: { test: "radio-button-image" },
        label: "Radio Button Image",
      },
      {
        key: "ReplaceDrugKit",
        element: "CustomElement",
        component: ReplaceDrugKit,
        type: "custom",
        forwardRef: true,
        field_name: "replace-drug-kit",
        name: "Replace Drug Kit Selector",
        icon: "fas fa-tablets",
        props: {
          test: "replace-drug-kit",
          hasDropDown: true,
          hasPageTitle: true,
          pageTitle: "",
        },
        label: "Replace Drug Kit",
      },
      {
        key: "SingleSelectCheckbox",
        element: "CustomElement",
        component: SingleSelectCheckbox,
        type: "custom",
        forwardRef: true,
        field_name: "single-select-checkbox",
        name: "Single Select Checkbox Spirobank",
        icon: "far fa-check-circle",
        props: {
          test: "single-select-checkbox",
          hasDropDown: true,
          hasPageTitle: true,
          pageTitle: "",
        },
        label: "Single Select Checkbox",
      },
      {
        key: "StandardSpinnerControl",
        element: "CustomElement",
        component: StandardSpinnerControl,
        type: "custom",
        forwardRef: true,
        field_name: "standard-spinner-control",
        name: "Standard Spinner Control Temperature Spinner",
        icon: "fas fa-sync",
        props: { test: "standard-spinner-control" },
        label: "Standard Spinner Control",
      },
      {
        key: "TextArea",
        element: "CustomElement",
        component: TextArea,
        type: "custom",
        forwardRef: true,
        field_name: "text-area",
        name: "TextArea",
        icon: "fa fa-font",
        props: { test: "text-area" },
        label: "Text Area",
      },
      {
        key: "TimeTwo",
        element: "CustomElement",
        component: TimeTwo,
        type: "custom",
        forwardRef: true,
        field_name: "time-two",
        name: "TimeTwo",
        icon: "fas fa-clock",
        props: { test: "time-two" },
        label: "Time Input",
      },
      {
        key: "VAS",
        element: "CustomElement",
        component: VAS,
        type: "custom",
        forwardRef: true,
        field_name: "vas",
        name: "VAS",
        icon: "fas fa-plus",
        props: { test: "vas" },
        label: "VAS",
      },
      {
        key: "VideoPlayer",
        element: "CustomElement",
        component: VideoPlayer,
        type: "custom",
        forwardRef: true,
        field_name: "video_player",
        name: "Video Player",
        icon: "fa fa-play-circle",
        props: { test: "video_player" },
        label: "Video Player",
      },
      {
        key: "VisitDatePicker",
        element: "CustomElement",
        component: VisitDatePicker,
        type: "custom",
        forwardRef: true,
        field_name: "visit_date_picker",
        name: "Visit Date Picker",
        icon: "fas fa-calendar-check",
        props: { test: "visit_date_picker" },
        label: "Visit Date Picker",
      },
    ]);
    setLoad(true);
    fetchFormData(id);
    setMounted(true);
    setShowDialog(true);
  }, []);

  function arraymove(arr, fromIndex, toIndex) {
    const element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
  }

  const align = () => {
    formData.forEach((element, i) => {
      if (element.parentId) {
        arraymove(formData, i, element.parentIndex + element.col + 1);
      }
    });
    return formData;
  };

  const notify = () =>
    toast.success("Form Creation Successful", {
      theme: "colored",
      toastId: "form-creation",
    });

  const notifyStatus = () =>
    toast.success("Status Changed Successfully", {
      theme: "colored",
      toastId: "status-changed",
    });

  const formEmpty = () =>
    toast.warn("Form Data Is Emtpy", {
      theme: "colored",
      toastId: "form-creation",
    });

  const requestFailed = () =>
    toast.error("Something went wrong", {
      theme: "colored",
      toastId: "requestFailed",
    });

  const onSubmit = () => {
    const formSubmission = align();
    setShowDialog(false);
    if (formSubmission.length === 0 || !formSubmission) {
      formEmpty();
    } else {
      const config = {
        method: "patch",
        url: `${process.env.REACT_APP_FORM_API}/Form/design-form?id=${id}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          formJson: [align()],
        },
      };

      axios(config)
        .then(() => {
          notify();
          navigate("/");
        })
        .catch((error) => {
          requestFailed();
          console.log("Form Submission Error ===> ", error);
        });
    }
  };

  const onLoad = () => {
    return new Promise((resolve) => {
      resolve(formData);
    });
  };

  const onPost = (data) => {
    setShowDialog(true);
    setFromData(data.task_data);
  };

  const handleFormStatus = (e) => {
    e.preventDefault();
    setFormIsActive(!formIsActive);
  };

  const formStatusChange = async (id, formIsActive) => {
    try {
      setLoad(true);
      const res = await changeFormStatus(id, formIsActive);

      if (res.status === 200) {
        setLoad(false);
        notifyStatus();
      }
    } catch (err) {
      setLoad(false);
      requestFailed();
      console.log("Error: ", err);
    }
  };

  //FIXME: Fix this formIsActive Dependency
  React.useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      formStatusChange(id, formIsActive);
    }
  }, [formIsActive]);

  const emptyFormBack = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const formHandleBack = (e) => {
    e.preventDefault();
    history.push("/");
  };

  return (
    <>
      {load ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "70vh",
            }}
          >
            <BeatLoader color="#3661eb" />
          </div>
        </>
      ) : (
        <>
          {formJson ? (
            <>
              <div>
                <DialogBox
                  showDialog={showPrompt}
                  confirmNavigation={confirmNavigation}
                  cancelNavigation={cancelNavigation}
                />
              </div>
              <Row>
                <Col md={3}>
                  <div
                    style={{
                      height: "100px",
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "Roboto",
                      fontWeight: "500",
                    }}
                  >
                    <p style={{ fontSize: "24px" }}>
                      <i
                        onClick={(e) => {
                          formHandleBack(e);
                        }}
                        class="fas fa-arrow-left"
                        style={{
                          fontSize: "25px",
                          marginRight: "10px",
                          cursor: "pointer",
                        }}
                      ></i>{" "}
                      Form Elements
                    </p>
                  </div>
                </Col>
                <Col md={3} style={{ marginTop: "15px" }}>
                  {/* <DemoBar variables={variables} /> */}
                  <SubmitQuestionnaire
                    variables={variables}
                    formId={id}
                    formData={formData}
                    formName={formEditName}
                  />
                </Col>
                <Col
                  md={3}
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      height: "50px",
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formIsActive}
                          onChange={(e) => {
                            handleFormStatus(e);
                          }}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      }
                      label="Status"
                      sx={{
                        ".MuiFormControlLabel-label": {
                          fontSize: "1.5rem !important",
                        },
                      }}
                    />
                  </div>
                </Col>
                <Col md={3} style={{ marginTop: "15px" }}>
                  <button
                    type={"submit"}
                    className="customBlueFormSaveBtn float-right"
                    onClick={onSubmit}
                  >
                    Save
                  </button>
                </Col>
              </Row>

              <div className="App mt-3">
                <div>
                  <h4>{formEditName}</h4>
                </div>
                <div>
                  <ReactFormBuilder
                    edit
                    data={formJson[0]}
                    onLoad={onLoad}
                    onPost={onPost}
                    toolbarItems={items}
                    renderEditForm={(props) => (
                      <FormElementsEdit formId={formId} {...props} />
                    )}
                  />
                </div>
              </div>
            </>
          ) : (
            <div
              style={{
                width: "100%",
                height: "50vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <h3>Form Data is Emtpy</h3>
              <div style={{ marginTop: "1%" }}>
                <button
                  className="backButton"
                  onClick={(e) => emptyFormBack(e)}
                >
                  Back
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default EditQuestionnaire;
