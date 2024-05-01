import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import Chip from "./Chip";
import Input from "@mui/material/Input";
import NumberInput from "../Inputs/NumberInput";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import userApi from "../../api/userApi";
export default function CreateUser() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [name, setName] = useState("");
  const [balance, setBalance] = useState(0);
  const [datas, setDatas] = useState([]);
  localStorage.clear();
  let navigate = useNavigate();

  let clickable = name !== "" && balance != null ? false : true;
  const handleSubmit = () => {
    let data = { name: name, balance: balance };
    userApi
      .post("/create", data)
      .then((result) => {
        if (result.data.message === "User name must be unique") {
          setOpenSnackbar(true);
          setName("");
          setBalance(0);
        } else navigate(`/home/${result.data.name}`);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    userApi
      .get("/get")
      .then((result) => {
        setDatas(result.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="user-create-component">
      <div className="user-create-container">
        <div className="create-container">
          <div className="input-container">
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
                  User name must be unique
                </Alert>
              </Snackbar>
            </Box>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
            <div className="number-input-container">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h3>Please enter balance</h3>
              </div>
              <NumberInput value={balance} setValue={setBalance} />
            </div>
          </div>
          <Button
            sx={{
              backgroundColor: "#212121",
              "&:hover": {
                backgroundColor: "#212121",
              },
            }}
            variant="contained"
            disabled={clickable}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
        <div className="user-container">
          <div className="users">
            {datas.map((data, index) => (
              <Chip key={index} id={data._id} name={data.name} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
