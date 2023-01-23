/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-script-url */
/* eslint-disable react/jsx-curly-brace-presence */

import React, { useEffect, useState } from 'react';

import { ReactFormGenerator, Registry } from 'react-form-builder2';

import oldInput from './components/inputComponent';
import MyInput from './components/riskComponent';
import Incident from './components/testComponent';
import Occurance from './components/reportingComponent';
import 'react-form-builder2/dist/app.css';

// import { get } from './requests';

// const getUrl = (cid) =>
//   `https://safe-springs-35306.herokuapp.com/api/formdata?cid=${cid}`;

const FormGenerator = () => {
  const newInput = React.forwardRef((props, ref) => {
    const { name, defaultValue, disabled } = props;

    console.log('iskaref', ref);
    return (
      <input
        ref={ref}
        name={name}
        defaultValue={defaultValue}
        disabled={disabled}
      />
    );
  });

  const ans = [
    {
      name: 'checkboxes_5CC289BA-ECFD-4DB6-873F-16D970A6A6DB',
      custom_name: 'checkboxes_5CC289BA-ECFD-4DB6-873F-16D970A6A6DB',
      value: ['checkboxes_option_5B260AF6-A590-4EEF-BA9C-2F1A6B53052F'],
    },
    {
      custom_name: 'new input81221381-B7BC-490E-96D3-9A9ECD96E641',
      name: 'new input81221381-B7BC-490E-96D3-9A9ECD96E641',
      value: 'asdasdfadsff',
    },
    {
      custom_name: 'oldInput05F46AE6-01AD-4E62-AABA-773ACC8BC22E',
      name: 'oldInput05F46AE6-01AD-4E62-AABA-773ACC8BC22E',
      value: 'adsfasdf',
    },
  ];
  const json = [
    {
      canHaveAlternateForm: false,
      canHaveAnswer: true,
      canHaveDisplayHorizontal: true,
      canHaveOptionCorrect: true,
      canHaveOptionValue: true,
      canHavePageBreakBefore: true,
      canPopulateFromApi: true,
      component: {},
      custom: true,
      defaultValue: '',
      name: 'test_input',
      element: 'CustomElement',
      field_name: 'my_input_B28E75CD-E9AE-4255-86E0-902D8CC3FFD5',
      forwardRef: true,
      id: 'DFCF9342-52AD-4B1B-928F-4A86A303EF95',
      key: 'Incident',
      props: {
        show: true,
        defaultValue: 'adsf',
        name: 'test_input',
        value: 'Asdf',
      },
      required: false,
      text: 'Incident',
    },
    {
      canHaveAlternateForm: true,
      canHaveAnswer: true,
      canHaveDisplayHorizontal: true,
      canHaveOptionCorrect: true,
      canHaveOptionValue: true,
      canHavePageBreakBefore: true,
      canPopulateFromApi: true,
      pageBreakBefore: true,
      dirty: false,
      element: 'Checkboxes',
      field_name: 'checkboxes_5CC289BA-ECFD-4DB6-873F-16D970A6A6DB',
      id: 'D1D39E27-94FE-414B-AD18-4DE159D4D4D1',
      inline: false,
      label: 'Placeholder Label',
      options: [
        {
          value: '1',
          text: '1',
          key: 'checkboxes_option_5B260AF6-A590-4EEF-BA9C-2F1A6B53052F',
        },
        {
          value: '2',
          text: '2',
          key: 'checkboxes_option_5B260AF6-A590-4EEF-BA9C-2F1A6B53052E',
        },
      ],
      required: true,
      text: 'Checkboxes',
    },

    {
      bare: undefined,
      canHaveAlternateForm: true,
      canHaveDisplayHorizontal: true,
      canHaveOptionCorrect: true,
      canHaveOptionValue: true,
      canHavePageBreakBefore: true,
      canPopulateFromApi: true,
      component: {},
      custom: true,
      pageBreakBefore: true,
      custom_options: [],
      element: 'CustomElement',
      field_name: 'new input81221381-B7BC-490E-96D3-9A9ECD96E641',
      forwardRef: true,
      id: 'EE36105C-7637-4277-BE45-13120CB9CAC3',
      inline: undefined,
      key: 'newInput',
      label: 'Label Input',
      props: { test: 'test_input' },
      required: false,
      showDescription: undefined,
      static: undefined,
      text: 'new Input',
    },
    {
      bare: undefined,
      canHaveAlternateForm: false,
      canHaveDisplayHorizontal: true,
      canHaveOptionCorrect: true,
      canHaveOptionValue: true,
      canHavePageBreakBefore: true,
      canPopulateFromApi: true,
      component: {},
      custom: true,
      custom_options: [],
      element: 'CustomElement',
      field_name: 'oldInput05F46AE6-01AD-4E62-AABA-773ACC8BC22E',
      forwardRef: true,
      id: '618733B5-6C09-464A-93FF-8813B97BF0B7',
      inline: undefined,
      key: 'oldInput',
      props: { name: 'oldInput', show: true },
      required: false,
      showDescription: undefined,
      static: undefined,
      text: 'oldInput',
    },
  ];

  // checking total steps and pages in this form
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);
  const [jsonForm, setJsonForm] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // const[pageJson,setPageJson]=useState([])
  const splitPages = () => {
    const temp = [];
    let pages = 0;
    temp[pages] = [];
    for (let i = 0; i < json.length; i += 1) {
      if (json[i].pageBreakBefore) {
        pages += 1;
        temp[pages] = [];
      }
      console.log(pages, json[i]);
      temp[pages].push(json[i]);
    }
    setTotalPages(pages);
    setJsonForm(temp);
    setLoaded(true);

    console.log(temp);
  };

  useEffect(() => {
    Registry.register('newInput', newInput);
    Registry.register('MyInput', MyInput);
    Registry.register('Incident', Incident);
    Registry.register('Occurance', Occurance);
    Registry.register('oldInput', oldInput);
    splitPages();
  }, []);

  const onBack = (data) => {
    console.log(data, 1);
    console.log(page);
    if (page > 0) {
      setPage(page - 1);
    } else {
      // submit logic
      console.log('is Zero', page);
    }
  };
  const handleBackClick = () => {
    onBack('here1');
  };

  const onLoad = (data) => {
    if (page < totalPages) {
      setPage(page + 1);
      console.log(page);
    } else {
      // submit logic
      console.log(data);
    }
  };

  useEffect(() => {
    if (loaded) {
      const concernedElement =
        window.document.getElementsByClassName('btn-cancel');

      concernedElement[0].addEventListener('mousedown', handleBackClick);
    }
    return () => {
      const concernedElement =
        window.document.getElementsByClassName('btn-cancel');
      concernedElement[0].removeEventListener('mousedown', handleBackClick);
    };
  }, [loaded, page]);
  //  event when back is clickeed

  // document.addEventListener("mousedown", (event) => {
  // const concernedElement = window.document.getElementsByClassName("btn-cancel");
  //   if (concernedElement[0].contains(event.target)) {
  //     onBack("here1")
  //   }
  // });

  return (
    <>
      {loaded ? (
        <ReactFormGenerator
          actionName="NEXT"
          onSubmit={(e) => onLoad(e)}
          back_name="Back"
          back_action="javascript:console.log('');"
          onChange={() => {
            console.log('miracle miracle');
          }}
          on_change={() => {
            console.log('miracle miracle');
          }}
          // onBack={(e) => onBack(e)}
          // form_method="POST"
          task_id={1}
          // Used to submit a hidden variable with the id to the form from the database.
          // answer_data={JSON_ANSWERS} // Answer data, only used if loading a pre-existing form with values.
          // authenticity_token={AUTH_TOKEN} // If using Rails and need an auth token to submit form.
          data={jsonForm[page]}
          answer_data={ans}
          submitButton={
            <button type={'submit'} className={'btn btn-primary'}>
              Submit
            </button>
          }
          backButton={
            <button type={'submit'} className={'btn'}>
              lol
            </button>
          }
        />
      ) : null}
    </>
  );
};
export default FormGenerator;
