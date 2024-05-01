import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector, useDispatch } from "react-redux";
import { definConditions } from "../../redux/slices/conditionSlice";
import "./index.css";
export default function Question({
  question,
  answers1,
  answers2,
  as,
  symbol1,
  symbol2,
}) {
  const conditionsObj = useSelector((state) => state.conditionSlice.conditions);
  const dispatch = useDispatch();
  let symbols = conditionsObj[as];
  const handleSymbol1Change = (event) => {
    let value = event.target.value;
    dispatch(definConditions({ key: as, symbol: "filter1", value }));
  };
  const handleSymbol2Change = (event) => {
    let value = event.target.value;
    dispatch(definConditions({ key: as, symbol: "filter2", value }));
  };
  return (
    <div className="question-container">
      <div className="question">
        <h3>{question}</h3>
      </div>
      <div className="answer">
        <FormControl size="small" sx={{ m: 1, minWidth: 80, margin: "20px" }}>
          <InputLabel id="demo-simple-select-autowidth-label">
            {symbol1}
          </InputLabel>
          <Select
            style={{ minWidth: "100px" }}
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={symbols.filter1}
            onChange={handleSymbol1Change}
            autoWidth
            label="symbol1"
          >
            {answers1.map((value, index) => (
              <MenuItem key={index} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ m: 1, minWidth: 80, margin: "20px" }}>
          <InputLabel id="demo-simple-select-autowidth-label">
            {symbol2}
          </InputLabel>
          <Select
            style={{ minWidth: "100px" }}
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={symbols.filter2}
            onChange={handleSymbol2Change}
            autoWidth
            label="symbol2"
            disabled={symbols.filter1 === "" && true}
          >
            {answers2.map((value, index) => (
              <MenuItem key={index} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
