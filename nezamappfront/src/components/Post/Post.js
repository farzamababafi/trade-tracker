import React, { useState, useEffect } from "react";
import Emotions from "./Emotions";
import { useNavigate } from "react-router-dom";
import "./index.css";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Condistions from "./Condistions";
import ImageAdd from "../Inputs/ImageAdd";
import transactionApi from "../../api/transactionApi";
import { useSelector, useDispatch } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {
  calculateScore,
  setBalance,
  calculateEmotionRate,
} from "../../redux/slices/conditionSlice";
const steps = ["Determine emotions ", "Transaction's condition", "Add image"];

export default function Post() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [image, setImage] = useState(null);
  const [opinionText, setOpinionText] = useState("");
  const [isConditionEmpty, setIsConditionEmpty] = useState(false);
  const transactionObj = useSelector((state) => state.conditionSlice);

  const id = localStorage.getItem("id");
  const userName = localStorage.getItem("name");
  let conditionArray = [];
  const handleNext = () => {
    if (activeStep === 0 && transactionObj.emotionRate < 70) {
      setOpenSnackbar(true);
      return;
    }
    if (activeStep === 1) {
      dispatch(calculateScore());
      dispatch(setBalance({ balance: localStorage.getItem("balance") }));
    }
    if (activeStep < steps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else if (activeStep === steps.length - 1 && image) {
      let data = new FormData();
      data.append("file", image, image.name);

      data.append("transactionObj", JSON.stringify(transactionObj));
      data.append("textOpinion", opinionText);
      data.append("id", id);

      transactionApi
        .post("/post", data, {
          headers: {
            accept: "application/json",
            "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          },
        })
        .then((result) => {
          navigate(`/home/${localStorage.getItem("name")}`);
        });
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    } else if (activeStep === 0) {
      navigate(`/home/${userName}`);
    }
  };
  useEffect(() => {
    dispatch(calculateEmotionRate());
  }, [transactionObj.emotions]);

  useEffect(() => {
    if (transactionObj.name === "") {
      navigate(`/home/${userName}`);
    }
  }, []);
  useEffect(() => {
    conditionArray = [];
    Object.values(transactionObj.conditions).forEach((item) => {
      conditionArray.push(Boolean(item.filter1));
      conditionArray.push(Boolean(item.filter2));
    });
    setIsConditionEmpty(conditionArray.every((bool) => bool));
  }, [transactionObj.conditions]);
  return (
    <div className="post-container">
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
            Your emotions are not suitable for trading
          </Alert>
        </Snackbar>
      </Box>
      <div className="header-container">
        <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
          Back
        </Button>
        <div style={{ width: "70%" }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};

              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </div>
        <Button
          disabled={
            (activeStep === 1 && !isConditionEmpty) ||
            (activeStep === steps.length - 1 && !image)
          }
          onClick={handleNext}
        >
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </div>

      {activeStep === 0 ? (
        <Emotions />
      ) : activeStep === 1 ? (
        <Condistions />
      ) : (
        <ImageAdd
          opinionText={opinionText}
          setOpinionText={setOpinionText}
          image={image}
          setImage={setImage}
        />
      )}
    </div>
  );
}
