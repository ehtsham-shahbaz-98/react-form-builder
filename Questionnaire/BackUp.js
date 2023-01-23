import React from "react";
import { useMethods } from "react-use";
import { useNavigate } from "react-router-dom";
import { ReactFormGenerator, ElementStore } from "react-form-builder2";
import "react-form-builder2/dist/app.css";
import { getFormById } from "../../services/form-builder";
import Modal from "react-modal";
import { toast } from "react-toastify";
import axios from "axios";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import TabletAndroidIcon from "@mui/icons-material/TabletAndroid";

import "./Questionnaire.css";
import PreviewContainer from "./PreviewContainer";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    border: "none",
    height: "auto",
    marginTop: "10px",
    // padding: "5%"
  },
};

Modal.setAppElement("#root");

const SubmitQuestionnaire = (props) => {
  const reducer = (state) => {
    return {
      init(initState) {
        state = initState;
        return state;
      },
      update(property, value) {
        const tempState = state;
        tempState[property] = value;
        return { ...tempState };
      },
      bulkUpdate(data) {
        return { ...state, ...data };
      },
    };
  };

  const initState = {
    totalPages: 0,
    json: [],
    submitFlag: true,
    btnName: "Save & Next",
    page: 0,
  };

  const navigate = useNavigate();

  const [desktopSize, setDesktopSize] = React.useState(true);
  const [tabletSize, setTabletSize] = React.useState(false);

  const [originalForm, setOriginalForm] = React.useState([]);
  const [formId, setFormId] = React.useState("");

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [nextBtnVisible, setNextBtnVisible] = React.useState(true);
  const [newJsonForm, setNewJsonForm] = React.useState([]);
  const [state, stateActions] = useMethods(reducer, initState);
  const [formName, setFormName] = React.useState("");

  const [fieldDisabled, setFieldDisabled] = React.useState([]);
  const [fieldEnabled, setFieldEnabled] = React.useState([]);

  const [finalPreview, setFinalPreview] = React.useState([]);
  const [showFinalPreview, setShowFinalPreview] = React.useState(false);

  const [stateData, setStateData] = React.useState([]);

  const [incrementDisable, setIncrementDisable] = React.useState(0);
  const [decrementEnable, setDecrementEnable] = React.useState(0);

  const formEmpty = () =>
    toast.warn("Form Data Is Emtpy", {
      theme: "colored",
      toastId: "form-creation",
    });

  const notify = () =>
    toast.success("Form Creation Successful", {
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
    props.setShowDialog(false);
    if (formSubmission.length === 0 || !formSubmission) {
      formEmpty();
    } else {
      const config = {
        method: "patch",
        url: `${process.env.REACT_APP_FORM_API}/Form/design-form?id=${formId}`,
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

  const addPreviousState = (pageState) => {
    return [...newJsonForm[pageState], ...newJsonForm[state.page]];
  };

  // React.useEffect(() => {
  //   if (fieldDisabled) {
  //     fieldDisabled.forEach((name) => {
  //       document.getElementsByName(name).forEach((e) => {
  //         e.disabled = true;
  //         e.ariaReadOnly = true;
  //       });
  //     });
  //     fieldDisabled.map((name) => {});
  //   }
  // }, [fieldDisabled, state.page]);

  const disableFunction = () => {
    const tempNames = [];

    if (incrementDisable > 0) {
      newJsonForm[state.page - 1].map((value) => {
        const { field_name } = value;
        tempNames.push(field_name);
      });
      setFieldDisabled([...fieldDisabled, ...tempNames]);
    }
  };

  React.useEffect(() => {
    if (fieldDisabled) {
      var fieldset;
      var legend;
      var childInputs;

      var elements = [];

      legend = document.createElement("legend");
      legend.innerHTML = "Fieldset Title";
      fieldset = document.createElement("fieldset");
      fieldset.appendChild(legend);

      fieldDisabled.forEach((name) => {
        document.getElementsByName(name).forEach((e) => {
          e.disabled = true;
          e.ariaReadOnly = true;
          e.classList.add("disabledInputs");
          // e.parentElement.createElement();
        });
        // childInputs = document.getElementsByName(name);
        // fieldset.appendChild(childInputs.createElement("input"));
        // childInputs.classList.add("disabledInputs");
        // Object.keys(childInputs).map(() => {
        //   childInputs.className.add();
        //   // childInputs.classList.add("disabledInputs");
        // });
        // childInputs.forEach(function (input) {
        //   var element = document.createElement("input");

        //   element.type = input.getAttribute("type");
        //   element.name = input.getAttribute("name");

        //   element.value = input.value;

        //   elements.push(element);
        // });
        // console.log("childInputs ... ", childInputs);
        // fieldset.appendChild(childInputs);
      });
      fieldDisabled.map((name) => {});
    }
  }, [fieldDisabled, state.page]);

  React.useEffect(() => {
    if (fieldEnabled) {
      fieldEnabled.forEach((name) => {
        document.getElementsByName(name).forEach((e) => {
          e.disabled = false;
          e.ariaReadOnly = false;
          e.classList.remove("disabledInputs");
        });
      });
      fieldEnabled.map((name) => {});
    }
  }, [fieldEnabled, state.page]);

  const enableFunction = () => {
    const tempNames = [];

    if (incrementDisable) {
      newJsonForm[state.page].map((value) => {
        const { field_name } = value;
        tempNames.push(field_name);
      });
      setFieldEnabled([...fieldEnabled, ...tempNames]);
      // setFieldDisabled([...fieldDisabled, ...tempNames]);
    }
  };

  React.useEffect(() => {
    disableFunction();
  }, [incrementDisable]);

  React.useEffect(() => {
    enableFunction();
  }, [decrementEnable]);

  const splitPages = (data) => {
    setNextBtnVisible(false);

    let newData = data;

    const temp = [];

    let pages = 0;
    temp[pages] = [];

    for (let i = 0; i < newData.length; i += 1) {
      if (newData[i].pageBreakBefore) {
        setNextBtnVisible(true);
        pages += 1;
        temp[pages] = [];
      }
      if (newData[i].props.customPageBreak) {
        setNextBtnVisible(true);
        pages += 1;
        temp[pages] = [];
      }
      temp[pages].push(newData[i]);
    }
    stateActions.update("totalPages", pages);

    disableFunction(temp);

    if (pages > 1) {
      stateActions.update("btnName", "Save & Next");
    }

    setNewJsonForm(temp);
  };

  function arraymove(arr, fromIndex, toIndex) {
    const element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
  }

  const align = () => {
    originalForm.forEach((element, i) => {
      if (element.parentId) {
        arraymove(originalForm, i, element.parentIndex + element.col + 1);
      }
    });
    return originalForm;
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const update = (data) => {
    setStateData(data);
  };

  // React.useEffect(() => {
  //   var element = document.getElementById("childBreaker");
  //   element.parentNode.classList.add("active");
  // });

  React.useEffect(() => {
    if (modalIsOpen) {
      setFormName(props.formName);
      splitPages(props.formData);
      setFormId(props.formId);
      if (props.formData.length !== 0) {
        setOriginalForm(props.formData);
      }
    }
  }, [modalIsOpen]);

  React.useEffect(() => {
    ElementStore.subscribe((state) => update(state.data));
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = (data) => {
    console.log("Data ==> ", data);
  };

  const onNext = () => {
    setIncrementDisable(incrementDisable + 1);
    if (state.page < state.totalPages) {
      stateActions.update("page", state.page + 1);
      if (state.page === state.totalPages - 1) {
        setNextBtnVisible(false);
      }
    }
  };

  const onBack = () => {
    setDecrementEnable(decrementEnable + 1);
    stateActions.update("page", state.page - 1);
    setNextBtnVisible(true);
  };

  const onDeskClick = () => {
    setDesktopSize(true);
    setTabletSize(false);
  };

  const onTabClick = () => {
    setTabletSize(true);
    setDesktopSize(false);
  };

  React.useEffect(() => {
    // newJsonForm.forEach((name) => {
    //   document.getElementsByName(name).forEach((e) => {
    //     e.disabled = true;
    //     e.ariaReadOnly = true;
    //   });
    //   //   var element = document.createElement("input");

    //   //   element.type = input.getAttribute("type");
    //   //   element.name = input.getAttribute("name");

    //   //   element.value = input.value;

    //   //   elements.push(element);
    //   // });
    //   // console.log("childInputs ... ", childInputs);
    //   // fieldset.appendChild(childInputs);
    // });
    setFinalPreview([...newJsonForm]);
  }, [showFinalPreview]);

  React.useEffect(() => {
    console.log("setFinalPreview ===> ", finalPreview);
  }, [finalPreview]);

  const onFinalPreview = () => {
    setShowFinalPreview(true);
    console.log("Final Preview");
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "left" }}>
        <button className="customWhiteFormBtn float-right" onClick={openModal}>
          Preview Form
        </button>
      </div>

      {newJsonForm ? (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
        >
          <div
            className={desktopSize ? "previewContainer" : "previewContainerTab"}
          >
            <div className="previewOptions">
              <div className="row d-flex justify-content-center">
                <div className="col-md-10"></div>
                <div className="col-md-1">
                  <div className="iconContianer" onClick={onDeskClick}>
                    <p>Desktop</p>
                    <PersonalVideoIcon
                      style={{
                        fontSize: "20px",
                        color: desktopSize ? "#3661eb" : "#000000",
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-1">
                  <div className="iconContianer" onClick={onTabClick}>
                    <p>Tablet</p>
                    <TabletAndroidIcon
                      style={{
                        fontSize: "20px",
                        color: desktopSize ? "#000000" : "#3661eb",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <span className="previewDivider"></span>
            <div className="previewNameContianer">
              <div className="row">
                {/* <div className="col-md-1"></div> */}
                <div className="col-md-3">
                  <span className="previewNameHeading">{formName}</span>
                  {/* <span className="previewNameHeading">Test Preview</span> */}
                </div>
                <div className="col-md-2">
                  <div className="previewPages">(Page {state.page + 1})</div>
                </div>
                <div className="col-md-7">
                  <div className="previewCloseBody">
                    <button className="previewCloseBtn" onClick={handleClose}>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={desktopSize ? "previewBorder" : "previewBorderTab"}
              style={
                desktopSize
                  ? {
                      "previewBorder .react-form-builder-form .rfb-item": {
                        width: "1000px !important",
                      },
                      ".ageRangeInputBody": {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                        gap: "5px",
                      },
                    }
                  : {
                      "previewBorderTab .react-form-builder-form .rfb-item": {
                        width: "500px !important",
                      },
                      ".ageRangeInputBody": {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        gap: "5px",
                      },
                    }
              }
            >
              <ReactFormGenerator
                className="previewGenerator"
                data={
                  showFinalPreview && finalPreview
                    ? finalPreview
                    : state.page > 0
                    ? addPreviousState(state.page - 1)
                    : newJsonForm[0]
                }
                onSubmit={handleSubmit}
                actionName="Set this to change the default submit button text"
                submitButton={
                  <>
                    <div className="previewButtonContainer">
                      <button
                        className={
                          state.page > 0
                            ? "previewBackBtn"
                            : "previewBackBtnDisabled"
                        }
                        onClick={onBack}
                        disabled={state.page > 0 ? false : true}
                      >
                        Previous
                      </button>
                      {nextBtnVisible ? (
                        <button
                          className={
                            nextBtnVisible
                              ? "previewNextBtn"
                              : "previewNextDisabled"
                          }
                          onClick={onNext}
                          disabled={nextBtnVisible ? false : true}
                        >
                          Next
                        </button>
                      ) : (
                        <button
                          className="previewNextBtn"
                          onClick={onFinalPreview}
                        >
                          Final Preview
                        </button>

                        // <button
                        //   className="previewNextBtn"

                        //   onClick={onSubmit}

                        // >
                        //   Submit
                        // </button>
                      )}
                    </div>
                  </>
                }
                backButton={
                  <a href="/" className="btn btn-default btn-cancel btn-big">
                    Back
                  </a>
                }
              />
            </div>
          </div>
        </Modal>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};
export default SubmitQuestionnaire;
