import React, { useEffect } from "react";
import { Registry } from "react-form-builder2";
import "react-form-builder2/dist/app.css";
import "./Questionnaire.css";
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
import PageContainer from "../FormComponents/PageContainer";
import PageBreak from "../FormComponents/PageBreak";

import Layout from "../../components/Layout/Layout";

import QuestionnaireBuilder from "./QuestionnaireBuilder";
import EditQuestionnaire from "./EditQuestionnaire";

const QuestionnaireComponent = ({ active }) => {
    const RegistryList = Registry.list();
    const registerComponent = (name, component) => {
        if (!RegistryList.includes(name)) {
            Registry.register(name, component);
        }
    };

    useEffect(() => {
        registerComponent("PageContainer", PageContainer);
        registerComponent("AgeRange", AgeRange);
        registerComponent("AgeRangeYear", AgeRangeYear);
        registerComponent("AssignedDrugKit", AssignedDrugKit);
        registerComponent("Camera", Camera);
        registerComponent("CheckBox", CheckBox);
        registerComponent("Date", Date);
        registerComponent("Time", Time);
        registerComponent("DispenseDrugKit", DispenseDrugKit);
        registerComponent("DobAge", DobAge);
        registerComponent("DropDown", DropDown);
        registerComponent("DurationSpinner", DurationSpinner);
        registerComponent("EQ5D5L", EQ5D5L);
        registerComponent("HotSpot", HotSpot);
        registerComponent("ListView", ListView);
        registerComponent("MultiSelectCheckBox", MultiSelectCheckBox);
        registerComponent("None", None);
        registerComponent("NRS", NRS);
        registerComponent("NumberSpinnerNumericPad", NumberSpinnerNumericPad);
        registerComponent("NumberSpinner", NumberSpinner);
        registerComponent("NumericPad", NumericPad);
        registerComponent("PatientVisit", PatientVisit);
        registerComponent("PriorityList", PriorityList);
        registerComponent("RadioButton", RadioButton);
        registerComponent("RadioButtonGroup", RadioButtonGroup);
        registerComponent("RadioButtonImage", RadioButtonImage);
        registerComponent("ReplaceDrugKit", ReplaceDrugKit);
        registerComponent("SingleSelectCheckbox", SingleSelectCheckbox);
        registerComponent("StandardSpinnerControl", StandardSpinnerControl);
        registerComponent("TextArea", TextArea);
        registerComponent("TimeTwo", TimeTwo);
        registerComponent("VAS", VAS);
        registerComponent("VideoPlayer", VideoPlayer);
        registerComponent("VisitDatePicker", VisitDatePicker);
        registerComponent("Page Break", PageBreak);
    }, []);

    const handleActivePage = (path) => {
        switch (path) {
            case "Questionnaire Builder":
                return <Layout children={<QuestionnaireBuilder />} />;
            case "Edit Questionnaire":
                return <Layout children={<EditQuestionnaire />} />;
            default:
                return null;
        }
    };
    return <div>{handleActivePage(active)}</div>;
};

export default QuestionnaireComponent;
