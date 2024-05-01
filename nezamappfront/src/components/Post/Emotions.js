import React from "react";
import Slider from "@mui/material/Slider";
import { useSelector, useDispatch } from "react-redux";
import { definEmotions } from "../../redux/slices/conditionSlice";

import "./index.css";

function capitalize(s) {
  return s[0].toUpperCase() + s.slice(1).replaceAll("_", " ");
}
export default function Emotions() {
  const conditionsObj = useSelector((state) => state.conditionSlice.emotions);

  const dispatch = useDispatch();

  let emotions = [];
  Object.keys(conditionsObj).forEach(function (key, index) {
    emotions.push({ [key]: conditionsObj[key] });
  });

  return (
    <React.Fragment>
      {emotions.map((emotion, index) => (
        <div key={index} className="slider-container">
          <h3 style={{ color: "#fff", opacity: 0.7, marginBottom: "10px" }}>
            {capitalize(Object.keys(emotion)[0])}
          </h3>
          <Slider
            style={{ marginTop: "10px" }}
            aria-label={Object.keys(emotion)[0]}
            value={Object.values(emotion)[0]}
            valueLabelDisplay="auto"
            step={10}
            marks
            min={0}
            max={100}
            size="small"
            onChange={(event, newValue) => {
              dispatch(
                definEmotions({
                  key: Object.keys(emotion)[0],
                  value: newValue,
                })
              );
            }}
          />
        </div>
      ))}
    </React.Fragment>
  );
}
