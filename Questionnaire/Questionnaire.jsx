import React from "react";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaClone, FaCheck, FaTimes } from "react-icons/fa";
import BeatLoader from "react-spinners/BeatLoader";
import { Box, TextField } from "@mui/material";
import { toast } from "react-toastify";
import Modal from "@mui/material/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PropTypes from "prop-types";
import {
  createTheme,
  ThemeProvider,
  alpha,
  styled,
} from "@mui/material/styles";
import {
  DataGridPro,
  gridClasses,
  GridToolbar,
  GridToolbarContainer,
  GridCsvExportMenuItem,
  GridToolbarExportContainer,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
  gridFilteredSortedRowIdsSelector,
  // useGridApiContext
} from "@mui/x-data-grid-pro";
import {
  getFormBuilder,
  postFormName,
  cloneFormData,
} from "../../services/form-builder";
import {
  postExportExcel,
  postExportPDF,
  getDownloadReport,
} from "../../services/export-apis";
import { saveAs } from "file-saver";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./Questionnaire.css";
import arrowDown from "../../assets/svgs/arrow_down.svg";

const getMuiTheme = createTheme({
  typography: {
    fontSize: 25,
  },
  ".css-1x51dt5-MuiInputBase-input-MuiInput-input": {
    color: "#000000 !important",
  },
});

const ODD_OPACITY = 0.2;

/**
 * TODO:
 * Remove checkable option from the datatable
 */

const StripedDataGrid = styled(DataGridPro)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    "&:hover, &.Mui-hovered": {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
    "&.Mui-selected": {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity
      ),
      "&:hover, &.Mui-hovered": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity
        ),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  },
}));

const Questionnaire = () => {
  const navigate = useNavigate();

  const [load, setLoad] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [formData, setFormData] = React.useState([]);
  const [formName, setFormName] = React.useState("");
  const [pageSize, setPageSize] = React.useState(5);

  const [openModal, setOpenModal] = React.useState(false);
  const [newFormId, setNewFormId] = React.useState("");

  const studyCloned = () =>
    toast.success("Study Cloned Successfully", {
      theme: "colored",
      toastId: "study-clone-success",
    });

  const formNameRequired = () =>
    toast.warn("Form Name Is Required", {
      theme: "colored",
      toastId: "form-name-creation",
    });

  const formNameCreated = () =>
    toast.success("Form Created Successfully", {
      theme: "colored",
      toastId: "form-name-creation",
    });

  const requestFailed = () =>
    toast.warn("Form Name Already Exists", {
      theme: "colored",
      toastId: "requestFailed",
    });

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const fetchFormData = async () => {
    try {
      setLoad(true);
      const res = await getFormBuilder();

      if (res.status === 200) {
        setFormData(res.data);
        setLoad(false);
      }
    } catch (err) {
      console.log("Error: ", err.message);
      setLoad(false);
    }
  };

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "none !important",
    boxShadow: 24,
    borderRadius: "3px",
    p: 3,
  };

  React.useEffect(() => {
    fetchFormData();
  }, []);

  const rows = formData.map((row) => ({
    id: row.formId,
    name: row.formName === "" ? "Empty" : row.formName,
    createdAt: row.createdAt,
    // createdAt: row.createdAt,
    edit: row.formId,
    isActive: row.isActive,
    delete: row.formId,
    clone: row.formId,
  }));

  const exportData = formData.map((row) => ({
    Name: row.formName === "" ? "Empty" : row.formName,
    "Created At": row.createdAt,
    "Is Active": row.isActive === true ? "Active" : "In Active",
  }));

  const columns = [
    {
      field: "id",
      hide: true,
      headerName: "ID",
      renderHeader: () => <strong>{"ID"}</strong>,
    },
    {
      field: "name",
      headerName: "Questionnaire",
      width: 300,
      renderHeader: () => <strong>{"Questionnaire"}</strong>,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 400,
      renderHeader: () => <strong>{"Created At"}</strong>,
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 300,
      renderHeader: () => <strong>{"Edit"}</strong>,
      renderCell: (params) => {
        const id = params.row.id;
        const name = params.row.name;
        const status = params.row.isActive;
        return (
          <button
            style={{
              cursor: "pointer",
              textAlign: "center",
              // color: "white",
              background: "none",
              border: "none",
              borderRadius: "5px",
            }}
            onClick={async () => {
              try {
                navigate(`/edit-questionnaire/`, {
                  state: {
                    id: id,
                    name: name,
                    status: status,
                  },
                });
              } catch (err) {
                setLoad(false);
                console.log("Error: ", err.message);
              }
            }}
          >
            <FaEdit
              style={{
                fontSize: "20px",
                color: "red !important",
                // marginLeft: "60px",
              }}
            />
          </button>
        );
      },
    },
    {
      field: "isActive",
      headerName: "Status",
      width: 300,
      renderHeader: () => <strong>{"Status"}</strong>,
      renderCell: (params) => {
        const status = params.row.isActive;

        return (
          <button
            style={{
              cursor: "pointer",
              textAlign: "center",
              // color: "white",
              background: "none",
              border: "none",
              borderRadius: "5px",
            }}
          >
            {status ? (
              <FaCheck
                color="#3661eb"
                style={{
                  fontSize: "20px",
                  color: "red !important",
                }}
              />
            ) : (
              <FaTimes
                style={{
                  fontSize: "20px",
                  color: "red !important",
                }}
              />
            )}
          </button>
        );
      },
    },
    {
      field: "clone",
      headerName: "Clone",
      width: 300,
      renderHeader: () => <strong>{"Clone"}</strong>,
      renderCell: (params) => {
        const id = params.row.id;
        const name = params.row.name;

        return (
          <button
            style={{
              cursor: "pointer",
              textAlign: "center",
              // color: "white",
              background: "none",
              border: "none",
              borderRadius: "5px",
            }}
            onClick={async () => {
              try {
                setLoad(true);
                const res = await cloneFormData(id, name);
                if (res.status === 200) {
                  setLoad(false);
                  fetchFormData();
                  studyCloned();
                }
              } catch (err) {
                console.log("Error: ", err.message);
              }
            }}
          >
            <FaClone
              color="#3661eb"
              style={{
                fontSize: "20px",
                color: "blue !important",
                // marginLeft: "60px",
              }}
            />
          </button>
        );
      },
    },
  ];

  const handleFormName = (event) => {
    event.preventDefault();
    setFormName(event.target.value);
  };

  const saveFormName = async () => {
    if (formName === "") {
      formNameRequired();
    } else {
      try {
        const res = await postFormName(formName);
        if (res.status === 200) {
          formNameCreated();
          const id = res.data;
          setNewFormId(id);
          navigate(`/questionnaire-builder/`, {
            state: {
              id: id,
              formName: formName,
            },
          });
        } else {
          requestFailed();
        }
      } catch (err) {
        console.log("Error: ", err);
        requestFailed();
      }
    }
  };

  const GridExportToPDF = (props) => {
    return (
      <MenuItem
        onClick={async () => {
          try {
            const res = await postExportPDF(props.rows);
            if (res.status === 200) {
              const res2 = await getDownloadReport(res.data);
              if (res2.status === 200) {
                const blob = new Blob([res2.data], { type: "application/pdf" });
                saveAs(blob, "Questionnaire.pdf");
              }
            }
            props.hideMenu?.();
          } catch (err) {
            console.log("ERROR: ", err);
          }
        }}
      >
        Export PDF
      </MenuItem>
    );
  };

  const GridExportToExcel = (props) => {
    return (
      <MenuItem
        onClick={async () => {
          try {
            const res = await postExportExcel(props.rows);
            if (res.status === 200) {
              const res2 = await getDownloadReport(res.data);
              if (res2.status === 200) {
                const blob = new Blob([res2.data], {
                  type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                });
                saveAs(blob, "Questionnaire.xlsx");
              }
            }
            props.hideMenu?.();
          } catch (err) {
            console.log("ERROR: ", err);
          }
        }}
      >
        Export Excel
      </MenuItem>
    );
  };

  const GridExportFilteredRows = () => {
    return (
      <MenuItem
        onClick={() => {
          // const filteredRows = gridFilteredSortedRowIdsSelector(apiRef);
          // console.log("Filtered Rows ===> ", filteredRows);
        }}
        // onClick={async () => {
        //   try {
        //     const res = await postExportExcel(props.rows);
        //     if (res.status === 200) {
        //       const res2 = await getDownloadReport(res.data);
        //       if (res2.status === 200) {
        //         const blob = new Blob([res2.data], {
        //           type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        //         });
        //         saveAs(blob, "Sponsors.xlsx");
        //       }
        //     }
        //     props.hideMenu?.();
        //   } catch (err) {
        //     console.log("ERROR: ", err);
        //   }
        // }}
      >
        Filtered rows
      </MenuItem>
    );
  };

  const CustomExportButton = (props) => (
    <GridToolbarExportContainer {...props}>
      <GridExportToExcel rows={exportData} />
      <GridExportToPDF rows={exportData} />
      <GridExportFilteredRows />
    </GridToolbarExportContainer>
  );

  const CustomToolbar = (props) => (
    <GridToolbarContainer {...props}>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <CustomExportButton />
    </GridToolbarContainer>
  );

  GridExportToExcel.propTypes = {
    hideMenu: PropTypes.func,
  };

  GridExportToPDF.propTypes = {
    hideMenu: PropTypes.func,
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
        <div className="content-body">
          <p className="questionnaire-link" style={{ fontWeight: "600" }}>
            <Link to="/">Manage Your Study</Link> |{" "}
            <Link to="/all-questionnaire">Questionnaire</Link>
          </p>
          <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <Row>
                <Col md={12}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "2%",
                    }}
                  >
                    <h4>Enter Form Name</h4>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TextField
                      className="muiTextInput"
                      id="outlined-basic"
                      onChange={handleFormName}
                      placeholder="Form Name"
                      variant="outlined"
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <div
                    style={{
                      marginTop: "4%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <button
                      onClick={saveFormName}
                      className="customBlueSaveBtn"
                    >
                      Save
                    </button>
                  </div>
                </Col>
              </Row>
            </Box>
          </Modal>
          <Row>
            <Col md={6}>
              <div className="questionnaire-head-start">
                <p className="questionnaire-heading">Questionnaire</p>
                <p className="questionnaire-text">
                  Select Questionnaire Below Or Add A New Questionnaire
                </p>
              </div>
            </Col>
            <Col md={6}>
              <div className="questionnaire-head-end">
                {/* <Link to="/questionnaire-builder"> */}
                <button
                  className="questionaire-create-btn"
                  onClick={handleClick}
                >
                  Create New Questionnaire
                  <img
                    className="questionnaire-arrow"
                    src={arrowDown}
                    alt="Arrow Down"
                  />
                </button>
                <Menu
                  className="questionnaire-btn-menu"
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleOpenModal}>
                    New Questionnaire
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    Copy Form Another Study
                  </MenuItem>
                </Menu>
                {/* </Link> */}
              </div>
            </Col>
          </Row>

          {/* 
          FIXME: Fix the checkable rows
          */}
          <Box sx={{ height: 400, width: "100%", display: "flex" }}>
            <ThemeProvider theme={getMuiTheme}>
              <StripedDataGrid
                className="allQuestionnaire-grid"
                rows={rows}
                columns={columns}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 20]}
                components={{ Toolbar: CustomToolbar }}
                pagination
                rowHeight={38}
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
                getRowClassName={(params) =>
                  params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
                }
              />
            </ThemeProvider>
          </Box>
        </div>
      )}
    </>
  );
};

export default Questionnaire;
