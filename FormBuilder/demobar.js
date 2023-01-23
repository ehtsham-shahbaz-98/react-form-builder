/* eslint-disable */

import React from "react";
import { ReactFormGenerator, ElementStore } from "react-form-builder2";
// import FormGenerator from "../FormGenerator/formGenerator";

// import styles from "../layout.module.css";

import "../Questionnaire/Questionnaire.css";

export default class Demobar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      previewVisible: false,
      shortPreviewVisible: false,
      roPreviewVisible: false,
      pages: 0,
      totalPages: 0,
    };

    const update = this._onChange.bind(this);
    ElementStore.subscribe((state) => update(state.data));
  }

  componentDidMount() {
    console.log("Demobar State DATA ===> ", this.state.data);
  }

  splitPages() {
    console.log("INSIDE SPLIT PAGE ===> ", this.state.data);

    const temp = [];
    let pages = 0;
    temp[pages] = [];
    for (let i = 0; i < this.state.data.length; i += 1) {
      if (this.state.data[i].pageBreakBefore) {
        pages += 1;
        temp[pages] = [];
      }
      console.log(pages, this.state.data[i]);
      temp[pages].push(this.state.data[i]);
    }
    this.setState({
      totalPages: pages,
      data: temp,
    });
  }

  showPreview() {
    this.setState({
      previewVisible: true,
    });
  }

  showShortPreview() {
    this.setState({
      shortPreviewVisible: true,
    });
  }

  showRoPreview() {
    this.setState({
      roPreviewVisible: true,
    });
  }

  closePreview() {
    this.setState({
      previewVisible: false,
      shortPreviewVisible: false,
      roPreviewVisible: false,
    });
  }

  _onChange(data) {
    this.setState({
      data,
    });
  }

  _onSubmit(data) {
    console.log("onSubmit", data);
    // Place code to post json data to server here
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps')
    if (this.props.show !== nextProps.show) {
      console.log("Inisde Component did mount");
      this.splitPages();
    }
  }

  render() {
    let modalClass = "modal";
    if (this.state.previewVisible) {
      modalClass += " show d-block";
    }

    let shortModalClass = "modal short-modal";
    if (this.state.shortPreviewVisible) {
      shortModalClass += " show d-block";
    }

    let roModalClass = "modal ro-modal";
    if (this.state.roPreviewVisible) {
      roModalClass += " show d-block";
    }

    return (
      <>
        <button
          className="customWhiteFormBtn float-left"
          onClick={this.showPreview.bind(this)}
        >
          Preview Form
        </button>

        {this.state.previewVisible && (
          <div className={modalClass} role="dialog">
            <div
              className="modal-dialog modal-lg"
              role="document"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                className="modal-content"
                style={{ padding: "0rem", minHeight: "100px" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    // alignItems: "center",
                  }}
                >
                  <h2>Form Preview</h2>
                  <>{console.log("THIS STATE DATA ==> ", this.state.data)}</>
                </div>
                <ReactFormGenerator
                  download_path=""
                  back_action="/"
                  back_name="Back"
                  answer_data={{}}
                  action_name="Save"
                  form_action="/"
                  form_method="POST"
                  onSubmit={this._onSubmit}
                  variables={this.props.variables}
                  data={this.state.data}
                />

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-default btn-demobar-modal"
                    data-dismiss="modal"
                    onClick={this.closePreview.bind(this)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {this.state.roPreviewVisible && (
          <div className={roModalClass}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <ReactFormGenerator
                  download_path=""
                  back_action="/"
                  back_name="Back"
                  answer_data={{}}
                  action_name="Save"
                  form_action="/"
                  form_method="POST"
                  read_only={true}
                  variables={this.props.variables}
                  hide_actions={true}
                  data={this.state.data}
                />

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-default btn-demobar-modal"
                    data-dismiss="modal"
                    onClick={this.closePreview.bind(this)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {this.state.shortPreviewVisible && (
          <div className={shortModalClass}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <ReactFormGenerator
                  download_path=""
                  back_action=""
                  answer_data={{}}
                  form_action="/"
                  form_method="POST"
                  data={this.state.data}
                  display_short
                  variables={this.props.variables}
                  hide_actions={false}
                />

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-default btn-demobar-modal"
                    data-dismiss="modal"
                    onClick={this.closePreview.bind(this)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
