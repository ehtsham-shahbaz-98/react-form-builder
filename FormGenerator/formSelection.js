/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Pagination } from 'antd';
import FormImg from '../../../assets/images/form.png';
import styles from '../layout.module.css';

import '../forms.css';
import 'antd/dist/antd.css';

//  must add in api which template to open

const SelectionPage = () => {
  const [page, setPage] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [formsData, setFormsData] = useState([]);
  const navigate = useNavigate();
  console.log(loaded);
  const navigateToReport = (id) => {
    navigate(`../report-incident?id=${id}`, { replace: true });
  };

  const switchPage = (p, pageSize) => {
    console.log('yahan se b ');
    setPage(p);
  };
  const populateForms = (pageNo) => {
    const config = {
      method: 'GET',
      url: `${process.env.REACT_APP_BACKEND_API}/form/all?page=${
        pageNo * 10
      }&limit=20`,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios(config)
      .then((data) => {
        console.log(data.data.data);
        formsData.push(...data.data.data);
        setFormsData([...formsData]);
        setLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const printingFunction = ()=>{
  //         console.log("printing");
  // }
  //   const mainFunction = async (noOfPrintsPM,timeLimit) => {
  //     let startTime=new Date.UTC();
  //     const flag=true;
  //     let counter=0;
  //     while(flag){
  //   printingFunction();
  //   counter+=1;

  //    const endTime=new Date.UTC();
  //    const dif = ( startTime. getTime() - endTime. getTime() ) / 1000;
  //    if(dif<timeLimit && counter>noOfPrintsPM){
  //     const sleepTime=(timeLimit-dif)*1000
  //     console.log("waiting Now")
  //     // eslint-disable-next-line no-await-in-loop
  //     await delay(sleepTime);
  //     counter=0;
  //     startTime=new Date.UTC();
  //    };
  // }

  //   };

  useEffect(() => {
    console.log('calling Twice');
    if (page * 10 >= formsData.length) {
      populateForms(page);
    }
  }, [page]);

  return (
    <>
      <div className={`${styles.content__container}  mt-3`}>
        <div>
          <h1 className={styles.content__title}>
            Select Incident Report Template
          </h1>
        </div>
      </div>
      <div
        className={`${styles.components_inline_wrap} ${styles.content__container} mt-3 pl-2 `}
      >
        {formsData.map((item, i) => {
          return (
            <div
              role="link"
              className={styles.form__selection_div}
              onClick={() => {
                navigateToReport(item._id);
              }}
              onKeyDown={() => navigateToReport(item._id)}
              tabIndex={i}
            >
              <img src={FormImg} alt="tick" />
              <p className={`${styles.title} mt-3`}>
                {item.name || `Form${i}`}
              </p>
            </div>
          );
        })}
      </div>
      <div className={styles.content__container}>
        <Pagination
          total={formsData.length}
          onChange={(p, pageSize) => {
            switchPage(p, pageSize);
          }}
        />
      </div>
    </>
  );
};
export default SelectionPage;
