import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/transactionApi";
import ImageAad from "./ImageAdd";
import "./index.css";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/base/Button";
import { useSelector, useDispatch } from "react-redux";
import {
  setDefaultResult,
  setAmount,
  setKindOfResult,
  setResult,
} from "../../redux/slices/resultSlice";
import { setDefault } from "../../redux/slices/conditionSlice";
import NumberInput from "../Inputs/NumberInput";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const CustomBotton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "#1976d2",
  borderColor: "#2787e79c",
  cursor: "pointer",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    backgroundColor: "#0069d9",
    borderColor: "#0062cc",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#0062cc",
    borderColor: "#005cbf",
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Transaction() {
  const [data, setData] = useState(null);
  const [uploadImage, setUploadImage] = useState(null);
  const [opinionText, setOpinionText] = useState("");
  const resultObj = useSelector((state) => state.resultSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (!localStorage.getItem("id")) {
    navigate("/");
  }
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);
  const [image, setImage] = useState();
  const [secondImage, setSecondImage] = useState();

  let id = useParams().id;
  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };
  const setNumberInputvalue = (value) => {
    dispatch(setAmount(value));
  };
  const handleSave = () => {
    if (resultObj.result !== "" && resultObj.kindOfResult !== "") {
      let data = new FormData();
      data.append("file", uploadImage, uploadImage.name);
      data.append(
        "resultObj",
        JSON.stringify({
          result: resultObj.result,
          kindOfResult: resultObj.kindOfResult,
          amount:
            resultObj.result === "lose"
              ? resultObj.amount * -1
              : resultObj.amount,
        })
      );
      data.append("textOpinion", opinionText);
      data.append("userId", localStorage.getItem("id"));

      api
        .post(`/update/${id}`, data, {
          headers: {
            accept: "application/json",
            "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          },
        })
        .then((result) => {
          setData(result.data);
          api
            .get(`/images/${result.data.secondImageUrl}`, {
              responseType: "blob",
            })
            .then((img) => setSecondImage(URL.createObjectURL(img.data)));
        })
        .then(() => {
          dispatch(setDefaultResult());
          setOpenDialog(false);
          window.location.reload(false);
        });
    } else {
      setOpenSnackbar(true);
    }
  };

  let timeZone;
  if (data) {
    let tempdate = data.date;
    let value = parseInt(
      tempdate.slice(tempdate.indexOf(",") + 1, tempdate.indexOf(":"))
    );
    let amPm = tempdate.slice(tempdate.length - 2, tempdate.length);
    if (value === 12) value = 0;
    if (value >= 1.3 && value <= 3.3 && amPm === "AM") timeZone = "Sydney";
    else if (value >= 3.3 && value <= 8.3 && amPm === "AM")
      timeZone = "Sydney Tokyo";
    else if (value >= 8.3 && value <= 11.3 && amPm === "AM") timeZone = "Tokyo";
    else if (value >= 11.3 && value <= 11.59 && amPm === "AM")
      timeZone = "Tokyo London";
    else if (value >= 0 && value <= 0.3 && amPm === "PM")
      timeZone = "Tokyo London";
    else if (value >= 0.3 && value <= 4.3 && amPm === "PM") timeZone = "London";
    else if (value >= 4.3 && value <= 8.3 && amPm === "PM")
      timeZone = "London NewYork";
    else if (value >= 8.3 && value <= 11.3 && amPm === "PM")
      timeZone = "NewYork";
    else if (value >= 11.3 && value <= 11.59 && amPm === "PM")
      timeZone = "NewYork Sydney";
    else if (value >= 0 && value <= 1.3 && amPm === "AM")
      timeZone = "NewYork Sydney";
  }

  useEffect(() => {
    api
      .post(`/get/${id}`, { userId: localStorage.getItem("id") })
      .then((result) => {
        setData(result.data);
        api
          .get(`/images/${result.data.firstImageUrl}`, { responseType: "blob" })
          .then((img) => setImage(URL.createObjectURL(img.data)))
          .catch((err) => console.log(err));
        if (result.data.secondImageUrl) {
          api
            .get(`/images/${result.data.secondImageUrl}`, {
              responseType: "blob",
            })
            .then((img) => setSecondImage(URL.createObjectURL(img.data)));
        }
      })
      .catch((err) => console.log(err));

    dispatch(setDefault());
  }, []);

  return (
    <div className="transacion-container">
      {data ? (
        <>
          <div className="transaction-header">
            <div
              style={{ width: "65%", height: "350px" }}
              className="show-image-container"
            >
              <img
                style={{ width: "100%", height: "100%" }}
                src={image}
                alt=""
              />
            </div>
            <div className="show-info-container">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div className="balance-date-container">
                  <h4>Acoount balance: {data.balance}$</h4>
                  <h4>{data.name}</h4>
                </div>
                <div className="balance-date-container">
                  <h4>
                    Date:<span style={{ marginLeft: "5px" }}>{data.date}</span>
                  </h4>
                  <h4>
                    Time zone:
                    <span style={{ marginLeft: "5px" }}>{timeZone}</span>
                  </h4>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  margin: "25px 0",
                  width: "100%",
                }}
              >
                <h4 style={{ marginRight: "10px" }}>Position:</h4>
                <h4>{data.position}</h4>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  margin: "10px 0",
                  width: "100%",
                }}
              >
                <h4 style={{ marginBottom: "10px" }}>Note:</h4>
                <h4>{data.firstPictureOpinion}</h4>
              </div>
            </div>
          </div>
          {data.result !== "null" ? (
            <div className="transaction-header">
              <div className="show-info-container">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <div className="date-container">
                    <h4>
                      Result:
                      <span style={{ marginLeft: "5px" }}>{data.result}</span>
                    </h4>
                  </div>
                  <div>
                    <h4>
                      Acoount balance: {data.balance}
                      {data.result === "win" ? " +" : undefined}{" "}
                      {data.changeAmount}$
                    </h4>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                        marginTop: "10px",
                      }}
                    >
                      <h4>Kind of result:</h4>
                      <h4 style={{ marginLeft: "10px" }}>
                        {data.kindOfResult}
                      </h4>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    margin: "10px 0",
                    width: "100%",
                  }}
                >
                  <h3 style={{ marginRight: "10px" }}>Note:</h3>
                  <h3>{data.firstPictureOpinion}</h3>
                </div>
              </div>
              <div
                style={{ width: "65%", height: "350px" }}
                className="show-image-container"
              >
                <img
                  style={{ width: "100%", height: "100%" }}
                  src={secondImage}
                  alt=""
                />
              </div>
            </div>
          ) : (
            <CustomBotton onClick={handleClickOpen} variant="contained">
              Complete Transaction
            </CustomBotton>
          )}
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "100%",
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress size={100} />
        </Box>
      )}
      <Dialog
        fullScreen
        open={openDialog}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar style={{ justifyContent: "space-between" }}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <CustomBotton
              style={{ backgroundColor: "#fff" }}
              color="inherit"
              onClick={handleSave}
            >
              save
            </CustomBotton>
          </Toolbar>
        </AppBar>
        <div className="dialog-container">
          <div style={{ width: "50%" }}>
            <ImageAad
              image={uploadImage}
              setImage={setUploadImage}
              opinionText={opinionText}
              setOpinionText={setOpinionText}
            />
          </div>
          <div className="result-container">
            <Box
              sx={{
                width: "100%",
                padding: "30px 50px",
                display: "flex",
                flexDirection: "column",

                backgroundColor: "#cececeb6",
                minHeight: "81vh",
                borderRadius: "30px",
              }}
            >
              <div
                style={{ display: "flex", width: "100%", marginBottom: "20px" }}
              >
                <div style={{ width: "20%", marginRight: "10px" }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Result
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={resultObj.result}
                      label="Result"
                      onChange={(e) => dispatch(setResult(e.target.value))}
                    >
                      <MenuItem value={"win"}>Win</MenuItem>
                      <MenuItem value={"lose"}>Lose</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div style={{ width: "80%" }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Kind of result
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={resultObj.kindOfResult}
                      label="Result"
                      onChange={(e) =>
                        dispatch(setKindOfResult(e.target.value))
                      }
                    >
                      <MenuItem value={"tp/sl"}>tp/sl</MenuItem>
                      <MenuItem value={"sl trailing"}>Sl trailing</MenuItem>
                      <MenuItem value={"Risk Free"}>Risk Free</MenuItem>
                      <MenuItem value={"Manual"}>Manual</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <NumberInput
                value={resultObj.amount}
                setValue={setNumberInputvalue}
              />
            </Box>
          </div>
        </div>
      </Dialog>
      <Box sx={{ width: 500 }}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          autoHideDuration={2000}
          open={openSnackbar}
          onClose={() => setOpenSnackbar(false)}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity="warning"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Fill all the requirements
          </Alert>
        </Snackbar>
      </Box>
    </div>
  );
}
