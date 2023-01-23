/* eslint-disable */

import React from "react";
import TextAreaAutosize from "react-textarea-autosize";
import {
  ContentState,
  EditorState,
  convertFromHTML,
  convertToRaw,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";

import DynamicOptionList from "./dynamic-option-list";
import { get } from "./requests";
import ID from "./UUID";

const toolbar = {
  options: ["inline", "list", "textAlign", "fontSize", "link", "history"],
  inline: {
    inDropdown: false,
    className: undefined,
    options: ["bold", "italic", "underline", "superscript", "subscript"],
  },
};

export default class FormElementsEdit extends React.Component {
  constructor(props, formId) {
    console.log(formId);
    console.log("amazing props", props);

    console.log("Inside FormElementsEdit")

    super(props);
    this.state = {
      element: this.props.element,
      data: this.props.data,
      dirty: false,
    };
  }

  toggleRequired() {
    // const this_element = this.state.element;
  }

  editElementProp(elemProperty, targProperty, e) {
    // elemProperty could be content or label
    // targProperty could be value or checked
    const this_element = this.state.element;
    this_element[elemProperty] = e.target[targProperty];

    this.setState(
      {
        element: this_element,
        dirty: true,
      },
      () => {
        if (targProperty === "checked") {
          this.updateElement();
        }
      }
    );
  }

  editPropElement(elemProperty, targProperty, e) {
    // elemProperty could be content or label
    // targProperty could be value or checked
    const this_element = this.state.element;
    console.log(this_element);
    console.log("property", e.target);
    this_element.props[elemProperty] =
      e.target[targProperty] == "true" ? true : false;

    this.setState(
      {
        element: this_element,
        dirty: true,
      },
      () => {
        if (targProperty === "checked") {
          this.updateElement();
        }
      }
    );
  }

  onEditorStateChange(index, property, editorContent) {
    // const html = draftToHtml(convertToRaw(editorContent.getCurrentContent())).replace(/<p>/g, '<div>').replace(/<\/p>/g, '</div>');
    const html = draftToHtml(convertToRaw(editorContent.getCurrentContent()))
      .replace(/<p>/g, "")
      .replace(/<\/p>/g, "")
      .replace(/&nbsp;/g, " ")
      .replace(/(?:\r\n|\r|\n)/g, " ");
    const this_element = this.state.element;
    this_element[property] = html;

    this.setState({
      element: this_element,
      dirty: true,
    });
  }

  updateElement() {
    const this_element = this.state.element;
    // to prevent ajax calls with no change
    if (this.state.dirty) {
      this.props.updateElement.call(this.props.preview, this_element);
      this.setState({ dirty: false });
    }
  }

  convertFromHTML(content) {
    const newContent = convertFromHTML(content);
    if (!newContent.contentBlocks || !newContent.contentBlocks.length) {
      // to prevent crash when no contents in editor
      return EditorState.createEmpty();
    }
    const contentState = ContentState.createFromBlockArray(newContent);
    return EditorState.createWithContent(contentState);
  }

  addOptions() {
    const optionsApiUrl = document.getElementById("optionsApiUrl").value;
    if (optionsApiUrl) {
      get(optionsApiUrl).then((data) => {
        this.props.element.options = [];
        const { options } = this.props.element;
        data.forEach((x) => {
          // eslint-disable-next-line no-param-reassign
          x.key = ID.uuid();
          options.push(x);
        });
        const this_element = this.state.element;
        this.setState({
          element: this_element,
          dirty: true,
        });
      });
    }
  }

  render() {
    if (this.state.dirty) {
      this.props.element.dirty = true;
    }

    const this_checked = this.props.element.hasOwnProperty("required")
      ? this.props.element.required
      : false;
    const this_read_only = this.props.element.hasOwnProperty("readOnly")
      ? this.props.element.readOnly
      : false;
    const this_default_today = this.props.element.hasOwnProperty("defaultToday")
      ? this.props.element.defaultToday
      : false;
    const this_show_time_select = this.props.element.hasOwnProperty(
      "showTimeSelect"
    )
      ? this.props.element.showTimeSelect
      : false;
    const this_show_time_select_only = this.props.element.hasOwnProperty(
      "showTimeSelectOnly"
    )
      ? this.props.element.showTimeSelectOnly
      : false;
    const this_checked_inline = this.props.element.hasOwnProperty("inline")
      ? this.props.element.inline
      : false;
    const this_checked_bold = this.props.element.hasOwnProperty("bold")
      ? this.props.element.bold
      : false;
    const this_checked_italic = this.props.element.hasOwnProperty("italic")
      ? this.props.element.italic
      : false;
    const this_checked_center = this.props.element.hasOwnProperty("center")
      ? this.props.element.center
      : false;
    const this_checked_page_break = this.props.element.hasOwnProperty(
      "pageBreakBefore"
    )
      ? this.props.element.pageBreakBefore
      : false;
    const this_checked_alternate_form = this.props.element.hasOwnProperty(
      "alternateForm"
    )
      ? this.props.element.alternateForm
      : false;

    const {
      canHavePageBreakBefore,
      canHaveAlternateForm,
      canHaveDisplayHorizontal,
      canHaveOptionCorrect,
      canHaveOptionValue,
    } = this.props.element;

    const this_files = this.props.files.length ? this.props.files : [];
    if (
      this_files.length < 1 ||
      (this_files.length > 0 && this_files[0].id !== "")
    ) {
      this_files.unshift({ id: "", file_name: "" });
    }

    let editorState;
    if (this.props.element.hasOwnProperty("content")) {
      editorState = this.convertFromHTML(this.props.element.content);
    }
    if (this.props.element.hasOwnProperty("label")) {
      editorState = this.convertFromHTML(this.props.element.label);
    }
    if (this.props.element.selectionOptions) {
      editorState = this.convertFromHTML(this.props.element.selectionOptions);
    }
    if (this.props.element.questions) {
      editorState = this.convertFromHTML(this.props.element.questions);
    }

    return (
      <div>
        <div className="clearfix">
          {/* <h4 className="float-left">{this.props.element.text}</h4> */}
          <i
            className="float-right fas fa-times dismiss-edit"
            onClick={this.props.manualEditModeOff}
          ></i>
        </div>
        {this.props.element.hasOwnProperty("content") && (
          <div className="form-group">
            <label className="control-label">Text to display:</label>

            <Editor
              toolbar={toolbar}
              defaultEditorState={editorState}
              onBlur={this.updateElement.bind(this)}
              onEditorStateChange={this.onEditorStateChange.bind(
                this,
                0,
                "content"
              )}
              stripPastedStyles={true}
            />
          </div>
        )}
        {this.props.element.hasOwnProperty("file_path") && (
          <div className="form-group">
            <label className="control-label" htmlFor="fileSelect">
              Choose file:
            </label>
            <select
              id="fileSelect"
              className="form-control"
              defaultValue={this.props.element.file_path}
              onBlur={this.updateElement.bind(this)}
              onChange={this.editElementProp.bind(this, "file_path", "value")}
            >
              {this_files.map((file) => {
                const this_key = `file_${file.id}`;
                return (
                  <option value={file.id} key={this_key}>
                    {file.file_name}
                  </option>
                );
              })}
            </select>
          </div>
        )}
        {this.props.element.hasOwnProperty("href") && (
          <div className="form-group">
            <TextAreaAutosize
              type="text"
              className="form-control"
              defaultValue={this.props.element.href}
              onBlur={this.updateElement.bind(this)}
              onChange={this.editElementProp.bind(this, "href", "value")}
            />
          </div>
        )}
        {this.props.element.hasOwnProperty("src") && (
          <div>
            <div className="form-group">
              <label className="control-label" htmlFor="srcInput">
                Link to this :
              </label>
              <input
                id="srcInput"
                type="text"
                className="form-control"
                defaultValue={this.props.element.src}
                onBlur={this.updateElement.bind(this)}
                onChange={this.editElementProp.bind(this, "src", "value")}
              />
            </div>
            <div className="form-group">
              <div className="custom-control custom-checkbox">
                <input
                  id="do-center"
                  className="custom-control-input"
                  type="checkbox"
                  checked={this_checked_center}
                  value={true}
                  onChange={this.editElementProp.bind(
                    this,
                    "center",
                    "checked"
                  )}
                />
                <label className="custom-control-label" htmlFor="do-center">
                  Center?
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-3">
                <label className="control-label" htmlFor="elementWidth">
                  Width:
                </label>
                <input
                  id="elementWidth"
                  type="text"
                  className="form-control"
                  defaultValue={this.props.element.width}
                  onBlur={this.updateElement.bind(this)}
                  onChange={this.editElementProp.bind(this, "width", "value")}
                />
              </div>
              <div className="col-sm-3">
                <label className="control-label" htmlFor="elementHeight">
                  Height:
                </label>
                <input
                  id="elementHeight"
                  type="text"
                  className="form-control"
                  defaultValue={this.props.element.height}
                  onBlur={this.updateElement.bind(this)}
                  onChange={this.editElementProp.bind(this, "height", "value")}
                />
              </div>
            </div>
          </div>
        )}
        {this.props.element.hasOwnProperty("label") && (
          <div className="form-group">
            <label>Display Label</label>
            <Editor
              toolbar={toolbar}
              defaultEditorState={editorState}
              onBlur={this.updateElement.bind(this)}
              onEditorStateChange={this.onEditorStateChange.bind(
                this,
                0,
                "label"
              )}
              stripPastedStyles={true}
            />
            <br />
            <div className="custom-control custom-checkbox">
              <input
                id="is-required"
                className="custom-control-input"
                type="checkbox"
                checked={this_checked}
                value={true}
                onChange={this.editElementProp.bind(
                  this,
                  "required",
                  "checked"
                )}
              />
              <label className="custom-control-label" htmlFor="is-required">
                Required
              </label>
            </div>
            {this.props.element.hasOwnProperty("readOnly") && (
              <div className="custom-control custom-checkbox">
                <input
                  id="is-read-only"
                  className="custom-control-input"
                  type="checkbox"
                  checked={this_read_only}
                  value={true}
                  onChange={this.editElementProp.bind(
                    this,
                    "readOnly",
                    "checked"
                  )}
                />
                <label className="custom-control-label" htmlFor="is-read-only">
                  Read only
                </label>
              </div>
            )}
            {this.props.element.hasOwnProperty("defaultToday") && (
              <div className="custom-control custom-checkbox">
                <input
                  id="is-default-to-today"
                  className="custom-control-input"
                  type="checkbox"
                  checked={this_default_today}
                  value={true}
                  onChange={this.editElementProp.bind(
                    this,
                    "defaultToday",
                    "checked"
                  )}
                />
                <label
                  className="custom-control-label"
                  htmlFor="is-default-to-today"
                >
                  Default to Today?
                </label>
              </div>
            )}
            {this.props.element.hasOwnProperty("showTimeSelect") && (
              <div className="custom-control custom-checkbox">
                <input
                  id="show-time-select"
                  className="custom-control-input"
                  type="checkbox"
                  checked={this_show_time_select}
                  value={true}
                  onChange={this.editElementProp.bind(
                    this,
                    "showTimeSelect",
                    "checked"
                  )}
                />
                <label
                  className="custom-control-label"
                  htmlFor="show-time-select"
                >
                  Show Time Select?
                </label>
              </div>
            )}
            {this_show_time_select &&
              this.props.element.hasOwnProperty("showTimeSelectOnly") && (
                <div className="custom-control custom-checkbox">
                  <input
                    id="show-time-select-only"
                    className="custom-control-input"
                    type="checkbox"
                    checked={this_show_time_select_only}
                    value={true}
                    onChange={this.editElementProp.bind(
                      this,
                      "showTimeSelectOnly",
                      "checked"
                    )}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="show-time-select-only"
                  >
                    Show Time Select Only?
                  </label>
                </div>
              )}
            {(this.state.element.element === "RadioButtons" ||
              this.state.element.element === "Checkboxes") &&
              canHaveDisplayHorizontal && (
                <div className="custom-control custom-checkbox">
                  <input
                    id="display-horizontal"
                    className="custom-control-input"
                    type="checkbox"
                    checked={this_checked_inline}
                    value={true}
                    onChange={this.editElementProp.bind(
                      this,
                      "inline",
                      "checked"
                    )}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="display-horizontal"
                  >
                    Display horizonal
                  </label>
                </div>
              )}
          </div>
        )}

        {this.state.element.element === "Signature" &&
          this.props.element.readOnly ? (
          <div className="form-group">
            <label className="control-label" htmlFor="variableKey">
              Variable Key:
            </label>
            <input
              id="variableKey"
              type="text"
              className="form-control"
              defaultValue={this.props.element.variableKey}
              onBlur={this.updateElement.bind(this)}
              onChange={this.editElementProp.bind(this, "variableKey", "value")}
            />
            <p className="help-block">
              This will give the element a key that can be used to replace the
              content with a runtime value.
            </p>
          </div>
        ) : (
          <div />
        )}

        {canHavePageBreakBefore && (
          <div className="form-group">
            <label className="control-label">Print Options</label>
            <div className="custom-control custom-checkbox">
              <input
                id="page-break-before-element"
                className="custom-control-input"
                type="checkbox"
                checked={this_checked_page_break}
                value={true}
                onChange={this.editElementProp.bind(
                  this,
                  "pageBreakBefore",
                  "checked"
                )}
              />
              <label
                className="custom-control-label"
                htmlFor="page-break-before-element"
              >
                Page Break Before Element?
              </label>
            </div>
          </div>
        )}

        {canHaveAlternateForm && (
          <div className="form-group">
            <label className="control-label">Alternate/Signature Page</label>
            <div className="custom-control custom-checkbox">
              <input
                id="display-on-alternate"
                className="custom-control-input"
                type="checkbox"
                checked={this_checked_alternate_form}
                value={true}
                onChange={this.editElementProp.bind(
                  this,
                  "alternateForm",
                  "checked"
                )}
              />
              <label
                className="custom-control-label"
                htmlFor="display-on-alternate"
              >
                Display on alternate/signature Page?
              </label>
            </div>
          </div>
        )}

        {this.props.element.hasOwnProperty("step") && (
          <div className="form-group">
            <div className="form-group-range">
              <label className="control-label" htmlFor="rangeStep">
                Step
              </label>
              <input
                id="rangeStep"
                type="number"
                className="form-control"
                defaultValue={this.props.element.step}
                onBlur={this.updateElement.bind(this)}
                onChange={this.editElementProp.bind(this, "step", "value")}
              />
            </div>
          </div>
        )}
        {this.props.element.hasOwnProperty("min_value") && (
          <div className="form-group">
            <div className="form-group-range">
              <label className="control-label" htmlFor="rangeMin">
                Min
              </label>
              <input
                id="rangeMin"
                type="number"
                className="form-control"
                defaultValue={this.props.element.min_value}
                onBlur={this.updateElement.bind(this)}
                onChange={this.editElementProp.bind(this, "min_value", "value")}
              />
              <input
                type="text"
                className="form-control"
                defaultValue={this.props.element.min_label}
                onBlur={this.updateElement.bind(this)}
                onChange={this.editElementProp.bind(this, "min_label", "value")}
              />
            </div>
          </div>
        )}
        {this.props.element.hasOwnProperty("max_value") && (
          <div className="form-group">
            <div className="form-group-range">
              <label className="control-label" htmlFor="rangeMax">
                Max
              </label>
              <input
                id="rangeMax"
                type="number"
                className="form-control"
                defaultValue={this.props.element.max_value}
                onBlur={this.updateElement.bind(this)}
                onChange={this.editElementProp.bind(this, "max_value", "value")}
              />
              <input
                type="text"
                className="form-control"
                defaultValue={this.props.element.max_label}
                onBlur={this.updateElement.bind(this)}
                onChange={this.editElementProp.bind(this, "max_label", "value")}
              />
            </div>
          </div>
        )}
        {this.props.element.hasOwnProperty("default_value") && (
          <div className="form-group">
            <div className="form-group-range">
              <label className="control-label" htmlFor="defaultSelected">
                Default Selected
              </label>
              <input
                id="defaultSelected"
                type="number"
                className="form-control"
                defaultValue={this.props.element.default_value}
                onBlur={this.updateElement.bind(this)}
                onChange={this.editElementProp.bind(
                  this,
                  "default_value",
                  "value"
                )}
              />
            </div>
          </div>
        )}
        {this.props.element.hasOwnProperty("static") &&
          this.props.element.static && (
            <div className="form-group">
              <label className="control-label">Text Style</label>
              <div className="custom-control custom-checkbox">
                <input
                  id="do-bold"
                  className="custom-control-input"
                  type="checkbox"
                  checked={this_checked_bold}
                  value={true}
                  onChange={this.editElementProp.bind(this, "bold", "checked")}
                />
                <label className="custom-control-label" htmlFor="do-bold">
                  Bold
                </label>
              </div>
              <div className="custom-control custom-checkbox">
                <input
                  id="do-italic"
                  className="custom-control-input"
                  type="checkbox"
                  checked={this_checked_italic}
                  value={true}
                  onChange={this.editElementProp.bind(
                    this,
                    "italic",
                    "checked"
                  )}
                />
                <label className="custom-control-label" htmlFor="do-italic">
                  Italic
                </label>
              </div>
            </div>
          )}
        {this.props.element.showDescription && (
          <div className="form-group">
            <label className="control-label" htmlFor="questionDescription">
              Description
            </label>
            <TextAreaAutosize
              type="text"
              className="form-control"
              id="questionDescription"
              defaultValue={this.props.element.description}
              onBlur={this.updateElement.bind(this)}
              onChange={this.editElementProp.bind(this, "description", "value")}
            />
          </div>
        )}
        {/* {this.props.element.props.show && (
          <div className="form-group">
            <label className="control-label" htmlFor="questionDescription">
              Render if
            </label>
            <select
              id="fileSelect"
              className="form-control"
              defaultValue={this.props.element.props.show}
              onBlur={this.updateElement.bind(this)}
              onChange={(e) => {
                this.props.element.props.show = this.props.element.props.show
                  ? false
                  : true;
                console.log(this.props.element.props.show);
              }}
            >
              <option value={true} key={true}>
                Show
              </option>
              <option value={false} key={false}>
                Hide
              </option>
            </select>
          </div>
        )} */}

        {(this.props.element.props?.show ||
          this.props.element.props?.show == false) && (
            <div className="form-group">
              <label className="control-label" htmlFor="fileSelect">
                Render ?
              </label>
              <select
                id="fileSelect"
                className="form-control"
                defaultValue={this.props.element.props.show}
                onBlur={this.updateElement.bind(this)}
                onChange={this.editPropElement.bind(this, "show", "value")}
              >
                <option value={true} key={true}>
                  YES
                </option>
                <option value={false} key={false}>
                  NO
                </option>
              </select>
            </div>
          )}
        <div className="form-group">
          <label className="control-label" htmlFor="fileSelect">
            Summary ?
          </label>
          <select
            id="fileSelect"
            className="form-control"
            defaultValue={this.props.element.summary || false}
            onBlur={this.updateElement.bind(this)}
            onChange={this.editElementProp.bind(this, "summary", "value")}
          >
            <option value={true} key={true}>
              YES
            </option>
            <option value={false} key={false}>
              NO
            </option>
          </select>
        </div>
        {/* {(this.props.element.props?.title) && (
          <div className="col-sm-6">
          <label className="control-label" htmlFor="elementHeight">
            Enter the title of this form
          </label>
          <input
            id="elementHeight"
            type="text"
            className="form-control"
            defaultValue={this.props.element.props.title}
            onBlur={this.updateElement.bind(this)}
            onChange={this.editPropElement.bind(this, 'title', 'value')}
          />
        </div>
        )} */}

        {/* {this.props.element.props?.name && (
          <div className="col-sm-3">
            <label className="control-label" htmlFor="elementHeight">
              Text
            </label>
            <input
              id="elementHeight"
              type="text"
              className="form-control"
              defaultValue={this.props.element.props.name}
              onBlur={this.updateElement.bind(this)}
              onChange={this.editPropElement.bind(this, 'name', 'value')}
            />
          </div>
        )} */}

        {this.props.element.props?.hasOwnProperty("title") && (
          <div className="col-sm-3">
            <label className="control-label" htmlFor="elementHeight">
              Field Title
            </label>
            <input
              id="elementHeight"
              type="text"
              className="form-control"
              defaultValue={this.props.element.title}
              onBlur={this.updateElement.bind(this)}
              onChange={this.editElementProp.bind(this, "title", "value")}
            />
          </div>
        )}

        {/* for questions weight mainly for checkklist accident component */}
        {this.props.element.props?.hasOwnProperty("weight") && (
          <div className="col-sm-3">
            <label className="control-label" htmlFor="elementHeight">
              Question Weight (comma seperated)
            </label>
            <input
              id="elementHeight"
              type="text"
              className="form-control"
              defaultValue={this.props.element.weight}
              onBlur={this.updateElement.bind(this)}
              onChange={this.editElementProp.bind(this, "weight", "value")}
            />
          </div>
        )}
        {/* for adding the options in pill or multiselect */}
        {this.props.element.props?.selectionOptions && (
          <div className="form-group">
            <label className="control-label">
              Add elements with comma in between
            </label>

            <Editor
              toolbar={toolbar}
              defaultEditorState={editorState}
              onBlur={this.updateElement.bind(this)}
              onEditorStateChange={this.onEditorStateChange.bind(
                this,
                0,
                "selectionOptions"
              )}
              stripPastedStyles={true}
            />
          </div>
        )}
        {this.props.element.props?.questions && (
          <div className="form-group">
            <label className="control-label">Add Questions</label>

            <Editor
              toolbar={toolbar}
              defaultEditorState={editorState}
              onBlur={this.updateElement.bind(this)}
              onEditorStateChange={this.onEditorStateChange.bind(
                this,
                0,
                "questions"
              )}
              stripPastedStyles={true}
            />
          </div>
        )}
        {/* for adding the extra steps in form */}
        {(this.props.element.props?.hasNestedSteps == true ||
          this.props.element.props?.hasNestedSteps == false) && (
            <div className="form-group">
              <label className="control-label" htmlFor="fileSelect">
                Has Additional Steps ?
              </label>
              <select
                id="fileSelect"
                className="form-control"
                defaultValue={this.props.element.hasNestedSteps || false}
                onBlur={this.updateElement.bind(this)}
                onChange={this.editElementProp.bind(
                  this,
                  "hasNestedSteps",
                  "value"
                )}
              >
                <option value={true} key={true}>
                  YES
                </option>
                <option value={false} key={false}>
                  NO
                </option>
              </select>
            </div>
          )}
        {/* for the configuration of extra steps in form */}
        {(this.props.element.props?.isNestedStep == true ||
          this.props.element.props?.isNestedStep == false) && (
            <div className="form-group">
              <label className="control-label" htmlFor="fileSelect">
                is Additional Step ?
              </label>
              <select
                className="form-control"
                defaultValue={this.props.element.isNestedStep || false}
                onBlur={this.updateElement.bind(this)}
                onChange={this.editElementProp.bind(
                  this,
                  "isNestedStep",
                  "value"
                )}
              >
                <option value={true} key={true}>
                  YES
                </option>
                <option value={false} key={false}>
                  NO
                </option>
              </select>
            </div>
          )}

        {/* for the configuration of extra steps in form */}
        {this.props.element.isNestedStep == "true" && (
          <div className="form-group">
            <label className="control-label" htmlFor="fileSelect">
              Parent page?
            </label>
            <input
              id="parentPage"
              type="number"
              className="form-control"
              defaultValue={this.props.element.parentStep || ""}
              onBlur={this.updateElement.bind(this)}
              onChange={this.editElementProp.bind(this, "parentStep", "value")}
            />
          </div>
        )}

        {/* for the configuration of extra steps in form */}

        {this.props.element.isNestedStep == "true" && (
          <div className="form-group">
            <label className="control-label" htmlFor="fileSelect">
              Parent page field title?
            </label>
            <input
              id="parentOption"
              type="text"
              className="form-control"
              defaultValue={this.props.element.parentTitle || ""}
              onBlur={this.updateElement.bind(this)}
              onChange={this.editElementProp.bind(this, "parentTitle", "value")}
            />
          </div>
        )}
        {this.props.element.isNestedStep == "true" && (
          <div className="form-group">
            <label className="control-label" htmlFor="fileSelect">
              Parent page option?
            </label>
            <input
              id="parentOption"
              type="text"
              className="form-control"
              defaultValue={this.props.element.parentValue || ""}
              onBlur={this.updateElement.bind(this)}
              onChange={this.editElementProp.bind(this, "parentValue", "value")}
            />
          </div>
        )}

        {this.props.showCorrectColumn &&
          this.props.element.canHaveAnswer &&
          !this.props.element.hasOwnProperty("options") && (
            <div className="form-group">
              <label className="control-label" htmlFor="correctAnswer">
                Correct Answer
              </label>
              <input
                id="correctAnswer"
                type="text"
                className="form-control"
                defaultValue={this.props.element.correct}
                onBlur={this.updateElement.bind(this)}
                onChange={this.editElementProp.bind(this, "correct", "value")}
              />
            </div>
          )}
        {this.props.element.canPopulateFromApi &&
          this.props.element.hasOwnProperty("options") && (
            <div className="form-group">
              <label className="control-label" htmlFor="optionsApiUrl">
                Populate Options from API
              </label>
              <div className="row">
                <div className="col-sm-6">
                  <input
                    className="form-control"
                    style={{ width: "100%" }}
                    type="text"
                    id="optionsApiUrl"
                    placeholder="http://localhost:8080/api/optionsdata"
                  />
                </div>
                <div className="col-sm-6">
                  <button
                    onClick={this.addOptions.bind(this)}
                    className="btn btn-success"
                  >
                    Populate
                  </button>
                </div>
              </div>
            </div>
          )}
        {this.props.element.hasOwnProperty("options") && (
          <DynamicOptionList
            showCorrectColumn={this.props.showCorrectColumn}
            canHaveOptionCorrect={canHaveOptionCorrect}
            canHaveOptionValue={canHaveOptionValue}
            data={this.props.preview.state.data}
            updateElement={this.props.updateElement}
            preview={this.props.preview}
            element={this.props.element}
            key={this.props.element.options.length}
          />
        )}
        {/* for title */}
        {this.props.element.props.hasDropDown === true && (
          <div className="form-group">
            <label className="control-label" htmlFor="fileSelect">
              Do you want to add dropdown options?
            </label>
            <select
              className="form-control"
              defaultValue={this.props.element.hasPageTitle || false}
              onBlur={this.updateElement.bind(this)}
              onChange={this.editElementProp.bind(this, "hasPageTitle", "value")}
            >
              <option value={true} key={true}>
                YES
              </option>
              <option value={false} key={false}>
                NO
              </option>
            </select>
          </div>
        )}
        {this.props.element.props?.hasOwnProperty("imgLink") && (
          <div>
            <label className="control-label" htmlFor="elementHeight">
              Img Link
            </label>
            <input
              id="elementHeight"
              type="text"
              className="form-control"
              defaultValue={this.props.element.imgLink}
              onBlur={this.updateElement.bind(this)}
              onChange={this.editElementProp.bind(this, "imgLink", "value")}
            />
          </div>
        )}
        {/* when page title has to be added to a field */}
        {this.props.element.hasPageTitle == "true" && (
          <div className="form-group">
            <label className="control-label" htmlFor="fileSelect">
              Dropdown options (Comma Seperated)
            </label>
            <textarea
              id="parentOption"
              type="text"
              rows={5}
              className="form-control"
              defaultValue={this.props.element.pageTitle || ""}
              onBlur={this.updateElement.bind(this)}
              onChange={this.editElementProp.bind(this, "pageTitle", "value")}
            >
            </textarea>
            {/* <input
              id="parentOption"
              type="text"
              className="form-control"
              defaultValue={this.props.element.pageTitle || ""}
              onBlur={this.updateElement.bind(this)}
              onChange={this.editElementProp.bind(this, "pageTitle", "value")}
            /> */}
          </div>
        )}
      </div>
    );
  }
}
FormElementsEdit.defaultProps = { className: "edit-element-fields" };
