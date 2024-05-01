import React, { useRef, useState, useEffect } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import NumberInput from "./NumberInput";
import TextArea from "./TextArea";
import { calculateLotRr } from "../../redux/slices/conditionSlice";

export default function ImageAdd({
  image,
  setImage,
  opinionText,
  setOpinionText,
}) {
  const inputFile = useRef();
  const [stopLoss, setStopLoss] = useState(1);
  const [takeProfit, setTakeProfit] = useState(0);
  const dispatch = useDispatch();
  const transactionObj = useSelector((state) => state.conditionSlice);
  useEffect(() => {
    dispatch(calculateLotRr({ sl: stopLoss, tp: takeProfit }));
  }, [takeProfit, stopLoss]);

  return (
    <>
      <div className="info-container">
        <div className="input-container">
          <div className="input">
            <label htmlFor="input">Stop Loss</label>
            <NumberInput value={stopLoss} setValue={setStopLoss} />
          </div>
          <div className="input">
            <label htmlFor="input">Take Profit</label>
            <NumberInput value={takeProfit} setValue={setTakeProfit} />
          </div>
        </div>
        <div className="data-container">
          <div className="data">
            <label htmlFor="p">Lot:</label>
            <p>{transactionObj.lot}</p>
          </div>
          <div className="data">
            <label htmlFor="p">Amount of risk:</label>
            <p>{transactionObj.amountOfRisk}</p>
          </div>
          <div className="data">
            <label htmlFor="p">RR:</label>
            <p>{transactionObj.rr}</p>
          </div>
          <div className="data">
            <label htmlFor="p">Risk:</label>
            <p>{transactionObj.risk}</p>
          </div>
        </div>
        <div style={{ margin: "10px" }}>
          <h2>{transactionObj.position}</h2>
        </div>
      </div>
      <div className="image-container">
        <div className="image-area">
          {image === null ? (
            <React.Fragment>
              <CloudUploadIcon style={{ fontSize: "100px" }} />
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "500",
                  marginBottom: "6px",
                }}
              >
                Upload Image
              </h3>
              <p style={{ color: "#7a7a7a" }}>
                Image size must be less tahn{" "}
                <span style={{ fontWeight: "600" }}>2MB</span>
              </p>
            </React.Fragment>
          ) : (
            <img
              src={image === null ? undefined : URL.createObjectURL(image)}
              alt={image === null ? undefined : image.name}
            />
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
            minHeight: "15vh",
          }}
        >
          <input
            id="input-1"
            onChange={(event) => {
              setImage(event.target.files[0]);
            }}
            ref={inputFile}
            type="file"
            re="file"
            accept="image/*"
            name="file"
            hidden
          />
          <Button
            onClick={() => {
              inputFile.current.click();
              console.log("hello");
            }}
            style={{ color: "black", margin: "10px" }}
            variant="contained"
          >
            Select image
          </Button>
          <TextArea value={opinionText} setValue={setOpinionText} />
        </div>
      </div>
    </>
  );
}
