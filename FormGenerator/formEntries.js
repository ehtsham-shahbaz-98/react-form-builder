/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-script-url */
/* eslint-disable react/jsx-curly-brace-presence */

import React, { useContext, useEffect, useState } from 'react';

import { ReactFormGenerator } from 'react-form-builder2';
import axios from 'axios';
import { Tabs } from 'antd';

import { useLocalStorage, useMethods } from 'react-use';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Toast from '../../../components/toast';
import { UserContext } from '../../../context/userContext';
import {
  getCurrentDetails,
  setCurrentDetails,
} from '../../../context/currentContext';
import { mapper } from '../../../utils';

import Tick from '../../../assets/icons/filled-green-tick.svg';
import Delete from '../../../assets/icons/filled-red-cross.svg';
import SimpleSelect from '../../../components/SingleSelect/simpleSelect';
import 'react-form-builder2/dist/app.css';
import styles from '../layout.module.css';
import '../forms.css';

const { TabPane } = Tabs;

const FormGenerator = () => {
  const navigate = useNavigate();

  const { user, navItems } = useContext(UserContext);
  const { projectID, organization, organizationID } = getCurrentDetails();
  console.log(getCurrentDetails());
  const setUserDetails = setCurrentDetails();
  const [searchParams] = useSearchParams();
  const submissionId = searchParams.get('id');

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
    isOrganizationFetched: !!organizationID,
    selectedOrganization: '',
    selectedProject: '',
    selectedProjectID: '',
    projectList: [],
    locationList: [],
    selectedLocation: '',
    selectedLocationID: '',
    incidentId: '',
    descriptionId: '',
    typeId: '',
    totalPages: 0,
    json: [],
    submitFlag: true,
    btnName: 'Save & Next',
    loaded: false,
    page: 0,
  };

  // const newInput = React.forwardRef((props, ref) => {
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

  // checking total steps and pages in this form
  const [state, stateActions] = useMethods(reducer, initState);

  // const [page, setPage] = useState(0);
  const [pageValid, setPageValid] = useState([]);
  const [jsonForm, setJsonForm] = useState([]);
  // const [loaded, setLoaded] = useState(false);
  // const [btnName, setBtnName] = useState('Save & Next');
  const [pageAns, setPageAns] = useState([]);
  const [formId, setFormId] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [previewReport, setPreviewReport] = useLocalStorage(
    'previewIncident',
    {}
  );
  const [submission, setSubmission] = useState('');
  ('');

  useEffect(() => {
    console.log(pageAns);
  }, [pageAns]);
  const onCaseRefresh = () => {};
  const isJsonString = (str) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };

  const splitPages = (data) => {
    const temp = [];
    let cases;
    let pages = 0;
    temp[pages] = [];
    for (let i = 0; i < data.length; i += 1) {
      if (data[i].title === 'Description') {
        console.log('yss');
        stateActions.update('descriptionId', data[i].field_name);
      }
      if (data[i].key === 'IncidentType') {
        stateActions.update('typeId', data[i].field_name);
      }
      if (data[i].pageBreakBefore) {
        pages += 1;
        temp[pages] = [];
      }
      if (data[i].props?.cases) {
        data[i].props.refresh = onCaseRefresh;
        data[i].props.setForm = setJsonForm;
        data[i].props.completeForm = data;
        cases = data[i].props.caseValues;
      }
      if (
        data[i]?.props?.caseValue &&
        cases &&
        data[i]?.props?.caseValue !== cases[0]
      ) {
        data[i].key = { key: data[i].key };
      }

      // give on load here to everything that will incur it

      temp[pages].push(data[i]);
    }
    stateActions.update('totalPages', pages);

    if (pages > 1) {
      stateActions.update('btnName', 'Save & Next');
      // setBtnName('Save & Next');
    }

    setJsonForm(temp);
    stateActions.update('loaded', true);
    // setLoaded(true);
  };
  // 61d615457ed2641368fede65
  // 61c2f865ca11161bdcbff976
  // 6203b464859ad404acb511e7
  // 61fad0d15e53b50ed86ffc60 mainform

  const handlePreviewPage = () => {
    const formFields = jsonForm.map((items) => {
      return items.map((item) => {
        return {
          text: item.title || item.text,
          field_name: item.field_name,
        };
      });
    });
    const obj = {
      id: 1,
      incidentId: state.incidentId,
      formFields: JSON.stringify(formFields),
      pageAns: JSON.stringify(pageAns),
    };
    setPreviewReport(obj);

    // console.log(previewReport);
    window.open('/preview-incident', '_blank');
  };

  const submitData = (submissionJson, partialSave) => {
    // const {description,type}=null;
    console.log(submissionJson);
    console.log(state.descriptionId);
    console.log(state.typeId);
    let description = '';
    let type = '';
    let pLocation = null;
    state.allLocationList.forEach((location) => {
      if (location.name === state.selectedLocation) pLocation = location._id;
    });
    submissionJson.forEach((elem) => {
      if (elem.name === state.descriptionId) {
        const elementValue = isJsonString(elem.value)
          ? JSON.parse(elem.value)
          : false;
        description = elementValue ? elementValue.value?.join(',') : elem.value;
      }
      if (elem.name === state.typeId) {
        const elementValue = isJsonString(elem.value)
          ? JSON.parse(elem.value)
          : false;
        type = elementValue ? elementValue.value?.join(',') : elem.value;
      }
    });
    console.log(description);
    console.log(type);
    const postData = JSON.stringify({
      _id: submissionId,
      p_location: pLocation,
      status: 2,
      projectId: projectID,
      createdBy: user?.email,
      organizationID,
      formId,
      type,
      description,
      submissionJson,
    });
    const config = {
      method: 'POST',
      url: `${process.env.REACT_APP_BACKEND_API}/form/submission`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: postData,
    };

    axios(config)
      .then(() => {
        if (!partialSave) {
          toast((t) => (
            <Toast
              type="success"
              message="Incident Reported Successfully"
              toastRef={t}
            />
          ));
          navigate(`/view-all-incident`);
        } else {
          toast((t) => (
            <Toast
              type="success"
              message="Step Saved Successfully"
              toastRef={t}
            />
          ));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // const createDraft = () => {
  //   const postData = JSON.stringify({
  //     status: 1,
  //     projectId: projectID,
  //     createdBy: user?.email,
  //     formId,
  //   });
  //   const config = {
  //     method: 'POST',
  //     url: `https://dev.safetyconnect.ai/backend/form/submission`,
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     data: postData,
  //   };

  //   axios(config)
  //     .then((data) => {
  //       console.log("ll",data.data.data._id);
  //       stateActions.update('incidentId', data.data.data._id);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const onStart = () => {
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_BACKEND_API}/form/submission/?id=${submissionId}`,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios(config)
      .then((data) => {
        console.log(data);
        stateActions.update('json', data.data.data.formJson);
        setFormId(data.data.data.formId._id);
        setPageAns(
          data.data.data.submissionJson ? data.data.data.submissionJson : []
        );
        splitPages(data.data.data.formId.formJson);
        if (data.data.data.submissionId)
          setSubmission(data.data.data.submissionId);
        stateActions.update('incidentId', submissionId);
        // console.log(data.data.data.submissionJson)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    onStart();
    // createDraft();
  }, []);

  const handleAnswers = (data) => {
    pageValid[state.page] = true;
    setPageValid([...pageValid]);

    data.forEach((element) => {
      // here we are checking if page Ans has already the answer added
      // if yes then update if no then push new value
      const index = pageAns.findIndex((x) => x.name === element.name);
      const i = jsonForm[state.page].findIndex(
        (x) => x.field_name === element.name
      );
      if (index !== -1) {
        pageAns[index] = element;
      } else {
        pageAns.push(element);
      }
      console.log(jsonForm[state.page], i);
      jsonForm[state.page][i].props.defaultValue = element.value;

      const elementValue = isJsonString(element.value)
        ? JSON.parse(element.value)
        : false;

      if (elementValue && elementValue.valid === false) {
        console.log('setting false');
        pageValid[state.page] = false;
        setPageValid([...pageValid]);
        console.log('validity', pageValid);
      }
    });

    setPageAns(pageAns);
    console.log(pageAns);
    console.log('pageValid', pageValid);
    return pageValid[state.page];
  };

  const handleSummary = () => {
    console.log(jsonForm[state.page + 1]);
    if (
      jsonForm[state.page + 1] &&
      jsonForm[state.page + 1][0].key === 'Summary'
    ) {
      jsonForm[state.page + 1][0].props.summaryOptions = jsonForm[
        state.page
      ].map((element) => {
        const index = pageAns.findIndex((x) => x.name === element.field_name);

        const obj = {};
        if (index !== -1 && element.summary === 'true') {
          obj.title = element.title || element.key;
          obj.value = pageAns[index]?.value || '';
          if (isJsonString(obj.value)) {
            obj.value = JSON.parse(obj.value)?.value;
          }
          return obj;
        }
        return obj;
      });
    }
  };

  const handlePageSwitch = (value, reqPage) => {
    let increment = value;
    let flag = true;
    const referencePage = reqPage || state.page;

    while (flag === true) {
      //  check if next page has any index which is saying this page is nested
      console.log('checking', referencePage, increment);
      const index = jsonForm[referencePage + increment].findIndex(
        (x) => x.isNestedStep === 'true'
      );
      console.log('found Index', index);
      // here we will have an insight if page is subform or not
      if (index > -1) {
        // now that we know that the page is nested let's find a parent page and it's value contains required value
        const { parentValue, parentStep, parentTitle } =
          jsonForm[referencePage + increment][index];

        // this is our parent page from jsonForm
        const parentPage = jsonForm[referencePage + increment - parentStep];
        console.log('parent page', referencePage + increment - parentStep);
        // we will find the position of parent element in page
        console.log(parentPage);
        console.log(parentTitle);

        const parentIndex = parentPage.findIndex((x) => x.text === parentTitle);
        console.log('parent index', parentIndex);

        // if parent page details are correct
        if (parentIndex > -1) {
          // answer of the parent element
          const parentPageAns = pageAns.filter(
            (x) => x.name === parentPage[parentIndex].field_name
          );
          console.log('parentPageAns', parentPageAns);
          // if parent element includes required value
          if (
            parentPageAns.length > 0 &&
            parentPageAns[0].value.includes(parentValue)
          ) {
            jsonForm[referencePage + increment][index].showStep = true;
            flag = false;
          } else {
            jsonForm[referencePage + increment][index].showStep = false;

            increment += value;
          }
        }
        // if parent page index is not found
        else {
          increment += value;
        }
      } else {
        flag = false;
      }
    }
    return increment;
  };
  const jumpToPage = (e) => {
    // console.log(e);
    // this will tell us which tab is now clicked
    const requiredTab = parseInt(e, 10);
    if (requiredTab === state.page) {
      return;
    }
    // if set to false the next button will be clicked but won't set any page
    stateActions.update('submitFlag', false);
    // either we have to find next possible step or previous
    const progression = state.page < requiredTab ? 1 : -1;

    // next button reference
    const nextButton = window.document.getElementsByClassName('btn-submit');
    nextButton[0].click();

    console.log('hahaha');
    // finding next step
    const possiblePage = handlePageSwitch(
      progression,
      requiredTab - progression
    );

    // setting page
    stateActions.update('page', requiredTab - progression + possiblePage);
    // setPage(requiredTab - progression + possiblePage);
    // removing lock
    stateActions.update('submitFlag', true);
  };
  const onBack = (data) => {
    console.log(data);
    if (state.page > 0) {
      const decrementPage = handlePageSwitch(-1);
      stateActions.update('page', state.page + decrementPage);
      // setPage(page + decrementPage);
      stateActions.update('btnName', 'Save & Next');
      // setBtnName('Save & Next');
    } else {
      // submit logic
      console.log('is Zero', state.page);
    }
  };
  const handleBackClick = () => {
    onBack('here1');
  };

  const validateSubmission = () => {
    const index = pageValid.findIndex((element) => element === false);
    console.log('validIndex', index);
    return index > -1 ? index : true;
  };

  const saveDraft = () => {
    submitData(pageAns, 1);
  };
  const onLoad = (data) => {
    console.log(pageAns);
    handleAnswers(data);

    //  in case of tabs this will restrict function to not set page
    if (!state.submitFlag) {
      return;
    }
    if (state.page < state.totalPages) {
      handleSummary(data);

      // handle change page here we will update page
      const incrementPage = handlePageSwitch(1);
      submitData(pageAns, true);

      stateActions.update('page', state.page + incrementPage);

      // setPage(page + incrementPage);
      if (state.page + 1 === state.totalPages) {
        stateActions.update('btnName', 'Submit');
        // setBtnName('Submit');
      }
    } else {
      // submit logic
      const validity = validateSubmission();
      console.log('validity', validity);
      if (validity !== true) {
        // jump to page
        const switchPage = handlePageSwitch(-(state.page - validity));
        stateActions.update('page', state.page + switchPage);

        // setPage(page + switchPage);
      } else {
        console.log(data);
        submitData(pageAns, 2);
        stateActions.update('btnName', 'Submit');
        // setBtnName('Submit');
      }
    }
  };
  useEffect(() => {
    if (!organization) {
      stateActions.update('selectedOrganization', navItems[0]);

      stateActions.update(
        'projectList',
        navItems[0].projects.map(({ name }) => name)
      );

      stateActions.update('selectedProject', navItems[0].projects[0].name);
    } else {
      const org = navItems.filter((element) => {
        return element.id === organizationID;
      });

      stateActions.update('selectedOrganization', org[0]);

      stateActions.update(
        'projectList',
        org[0]?.projects.map(({ name }) => name)
      );

      stateActions.update('selectedProject', org[0].projects[0].name);
    }
  }, [organization]);
  useEffect(() => {
    if (state.isOrganizationFetched) {
      if (state.selectedProject === '') return null;
      const pid = state.selectedOrganization.projects.filter((element) => {
        if (element.name === state.selectedProject) {
          return element.id;
        }
        return null;
      });

      stateActions.update('isProjectFetched', false);

      if (pid[0]?.id) {
        stateActions.update('selectedProjectID', pid[0].id);

        setUserDetails.update('project', state.selectedProject);
        setUserDetails.update('projectID', pid[0].id);

        // generateID(pid[0].id);

        const config = {
          method: 'GET',
          url: `${process.env.REACT_APP_BACKEND_API}/project/?projectid=${pid[0]?.id}`,
          headers: {},
        };

        axios(config)
          .then((response) => {
            // console.log('SOR: project', response);
            // console.log('roles', roles);

            // const isUserSupervisor =
            //   roles[getUserDetails?.organizationID]?.project[
            //     getUserDetails?.projectID
            //   ]?.location[state?.selectedLocationID]?.all?.includes(
            //     user?.email
            //   ) ?? false;

            // const isUserLeader =
            //   roles[getUserDetails.organizationID]?.project[
            //     getUserDetails?.projectID
            //   ]?.all?.includes(user.email) ?? false;

            // console.log(
            //   'isUserSupervisor',
            //   isUserSupervisor,
            //   'isUserLeader',
            //   isUserLeader
            // );

            const object = {
              project: response.data.data,
              locationList: response.data.data.p_locations.map(
                (location) => location.name
              ),
              selectedLocation: response.data.data.p_locations[0].name,
              locations: response.data.data.locations,
              allLocationList: response.data.data.p_locations,
              // members: response.data.data.involved_persons,

              // defaultSubmitTo: setDefault(
              //   response.data.data,
              //   response.data.data.locations[0],
              //   response.data.data.p_locations,
              //   false,
              //   isUserSupervisor,
              //   false,
              //   user?.email
              // ),
              // isProjectFetched: true,
            };

            console.log('bulk after fetch', object);

            stateActions.bulkUpdate(object);
            // setUserDetails.update(
            //   'people',
            //   response.data.data.involved_persons
            // );
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    return null;
  }, [state.selectedProject]);

  // Fetch Organization People
  useEffect(() => {
    if (state.selectedOrganization.id) {
      const config = {
        method: 'GET',
        url: `${process.env.REACT_APP_BACKEND_API}/organization/?organization_id=${state.selectedOrganization.id}`,
        headers: {},
      };

      axios(config)
        .then((response) => {
          stateActions.update('people', response.data.data.members);

          stateActions.update(
            'peopleMapper',
            mapper(response.data.data.members)
          );

          stateActions.update('isOrganizationFetched', true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [state.selectedOrganization]);

  const CreateSorContent = () => {
    return (
      <>
        <div className={styles.components_inline}>
          <div className={`${styles.components_inline} mr-5`}>
            <span className={`${styles.content__category} h6`}> Project:</span>
            <SimpleSelect
              // customClass="view__singleSelect_15"
              list={state.selectedProject}
              setList={(index, value) => {
                stateActions.update('selectedProject', value);
              }}
              allList={state.projectList}
              placeholder="Project"
              searchable={false}
              style={{ minWidth: '10rem' }}
            />
          </div>

          <div className={styles.components_inline}>
            <span className={`${styles.content__category} h6 mr-4`}>
              Location:
            </span>
            <SimpleSelect
              customClass="view__singleSelect_15"
              list={state.selectedLocation}
              setList={(index, value) => {
                stateActions.update('selectedLocation', value);
              }}
              allList={state.locationList}
              placeholder="Location"
              searchable={false}
              style={{ minWidth: '10rem' }}
            />

            <div> </div>
          </div>
        </div>
        <div className="mt-3 ml-1">
          {submission && (
            <span>
              <strong> Incident ID: </strong>
              {` ${submission}`}
            </span>
          )}
        </div>
      </>
    );
  };

  useEffect(() => {
    if (state.loaded) {
      const concernedElement =
        window.document.getElementsByClassName('btn-cancel');

      concernedElement[0]?.addEventListener('mousedown', handleBackClick);
      concernedElement[0]?.classList.add('btn-left-auto');
    }
    return () => {
      const concernedElement =
        window.document.getElementsByClassName('btn-cancel');
      if (concernedElement[0]) {
        concernedElement[0].removeEventListener('mousedown', handleBackClick);
      }
    };
  }, [state.loaded, state.page]);

  return (
    <>
      {state.loaded ? (
        <>
          <div
            data-tut="reactour__project_location"
            className={styles.content__container}
          >
            <div>
              <h1 className={styles.content__title}>Create Incident Report</h1>
            </div>
            {organization !== 'Select Organization' && <CreateSorContent />}
          </div>

          <div
            className="mt-3"
            style={{ backgroundColor: 'white', padding: '2rem 2rem' }}
          >
            <Tabs
              onChange={(e) => {
                jumpToPage(e);
              }}
              activeKey={state.page.toString()}
              size="small"
            >
              {jsonForm.map((element, i) => {
                const nestedIndex = element.findIndex(
                  (x) => x.isNestedStep === 'true'
                );
                const titleIndex = element.findIndex((x) => x.hasPageTitle);
                if (nestedIndex > -1 && !element[nestedIndex].showStep) {
                  return null;
                }
                return (
                  <TabPane
                    tab={
                      <>
                        <div className={styles.formHead_tabs__imgDiv}>
                          {i < state.page ? (
                            <img
                              className={styles.formHead_tabs__img}
                              src={pageValid[i] ? Tick : Delete}
                              alt="tick"
                            />
                          ) : (
                            <>
                              <span
                                className={
                                  i === state.page
                                    ? styles.formHead_tabs__numberSelected
                                    : styles.formHead_tabs__numberDefault
                                }
                              >
                                {i}
                              </span>
                            </>
                          )}
                        </div>
                        <div className={styles.formHead_tabs__textDiv}>
                          {i === state.page ? (
                            <span
                              className={`${styles.formHead_tabs__textSelected} ${styles.formHead_tabs__text}`}
                            >
                              {titleIndex > -1
                                ? element[titleIndex].pageTitle
                                : 'No Title And Now'}
                            </span>
                          ) : (
                            <span
                              className={`${
                                i < state.page
                                  ? styles.formHead_tabs__textPositive
                                  : styles.formHead_tabs__textDefault
                              }
                            ${
                              i < state.page && !pageValid[i]
                                ? styles.formHead_tabs__textNegative
                                : styles.formHead_tabs__textPositive
                            }
                            
                            ${styles.formHead_tabs__text}`}
                            >
                              {titleIndex > -1
                                ? element[titleIndex].pageTitle
                                : 'No Title And Now'}
                            </span>
                          )}
                        </div>
                      </>
                    }
                    key={i.toString()}
                  >
                    {''}
                  </TabPane>
                );
              })}
            </Tabs>
            <ReactFormGenerator
              actionName="Submit"
              onSubmit={(e) => onLoad(e)}
              back_name="Back"
              back_action="javascript:console.log('');"
              // onBack={(e) => onBack(e)}
              // form_method="POST"
              task_id={1}
              // Used to submit a hidden variable with the id to the form from the database.
              answer_data={pageAns} // Answer data, only used if loading a pre-existing form with values.
              // authenticity_token={AUTH_TOKEN} // If using Rails and need an auth token to submit form.
              data={jsonForm[state.page]}
              submitButton={
                <>
                  <button type={'submit'} className={'btn btn-submit'}>
                    {state.btnName}
                  </button>
                  <button
                    type={'button'}
                    className={'btn  btn-draft'}
                    style={{ alignSelf: 'left' }}
                    onClick={() => {
                      saveDraft();
                    }}
                  >
                    Save As Draft
                  </button>
                  <button
                    type={'button'}
                    className={'btn  btn-draft'}
                    style={{ alignSelf: 'left' }}
                    onClick={(e) => {
                      e.preventDefault();
                      handlePreviewPage();
                    }}
                  >
                    Preview
                  </button>
                </>
              }
            />
          </div>
        </>
      ) : null}
    </>
  );
};
export default FormGenerator;
