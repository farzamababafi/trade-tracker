import React, { useRef } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button } from "@mui/material";

import TextArea from "../Inputs/TextArea";

export default function ImageAdd({
  image,
  setImage,
  opinionText,
  setOpinionText,
}) {
  const inputFile = useRef();
  const handleButtonClick = () => {
    inputFile.current.click();
  };

  return (
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
          onChange={(event) => {
            setImage(event.target.files[0]);
          }}
          ref={inputFile}
          type="file"
          rel="file"
          accept="image/*"
          name="file"
          hidden
        />
        <Button
          onClick={handleButtonClick}
          style={{ color: "black", margin: "10px" }}
          variant="contained"
        >
          Select image
        </Button>
        <TextArea value={opinionText} setValue={setOpinionText} />
      </div>
    </div>
  );
}
