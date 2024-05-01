import React, { useState, useEffect } from "react";
import userApi from "../../api/userApi";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Table from "./Table";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Input from "@mui/material/Input";
import NumberInput from "../Inputs/NumberInput";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setName } from "../../redux/slices/conditionSlice";

import { useParams } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [id, setId] = useState("");
  const [userName, setUserName] = useState("");

  const symbol = useSelector((state) => state.conditionSlice.name);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let name = useParams().name;
  const [balance, setBalance] = useState("");
  let isChanged = false;

  if (
    userName === localStorage.getItem("name") &&
    balance === parseInt(localStorage.getItem("balance"))
  ) {
    isChanged = true;
  }

  const handleSymbolChange = (event) => {
    let value = event.target.value;
    dispatch(setName(value));
  };
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    userApi
      .get(`/get/${name}`)
      .then((result) => {
        localStorage.setItem("id", result.data._id);
        localStorage.setItem("name", result.data.name);
        localStorage.setItem("balance", result.data.balance);
        setBalance(parseInt(result.data.balance));
        setUserName(result.data.name);
        setId(result.data._id);
      })
      .catch((err) => navigate("/"));
  }, []);
  const editSubmit = () => {
    userApi
      .post(`edit/${localStorage.getItem("id")}`, {
        name: userName,
        balance: balance,
      })
      .then((result) => {
        if (result.data && result.data !== "User name must be unique") {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };
  const handleDialogClose = () => {
    setOpenDialog(false);
    setOpenEditDialog(false);
  };
  return (
    <div className="home-container">
      <div className="profile-container">
        <div className="profile">
          <div className="avatar-container">
            <Avatar alt="Remy Sharp" src="" sx={{ width: 100, height: 100 }} />
          </div>
          <div className="name-conainer">{name}</div>
          <div className="balance-conainer">
            <h3>Balance:</h3>
            <h3>${balance}</h3>
          </div>
          <Button
            onClick={() => setOpenEditDialog(true)}
            sx={{ color: "#fff", fontSize: "1em" }}
          >
            Edit
          </Button>
        </div>
        <Button
          onClick={() => navigate("/")}
          variant="contained"
          sx={{
            color: "#212121",
            backgroundColor: "rgb(208, 219, 230)",
            "&:hover": { backgroundColor: "rgb(208, 219, 230)" },
          }}
        >
          Exit
        </Button>
      </div>
      <div className="taransactions-container">
        {id ? (
          <Table userId={id} name={name} setOpenDialog={setOpenDialog} />
        ) : (
          <CircularProgress />
        )}
      </div>
      <React.Fragment>
        <Dialog
          fullScreen={fullScreen}
          open={openDialog}
          onClose={handleDialogClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"Create transaction?"}
          </DialogTitle>
          <DialogContent>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <DialogContentText>{"Choose you're symbol"}</DialogContentText>
              <FormControl sx={{ m: 1, minWidth: 80, margin: "20px" }}>
                <InputLabel id="demo-simple-select-autowidth-label">
                  Symbol
                </InputLabel>
                <Select
                  style={{ minWidth: "100px" }}
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={symbol}
                  onChange={handleSymbolChange}
                  autoWidth
                  label="symbol"
                >
                  <MenuItem value={"XAU/USD"}>XAU/USD</MenuItem>
                  <MenuItem value={"EUR/USD"}>EUR/USD</MenuItem>
                  <MenuItem value={"USD/JPY"}>USD/JPY</MenuItem>
                  <MenuItem value={"GBP/USD"}>GBP/USD</MenuItem>
                  <MenuItem value={"USD/CHF"}>USD/CHF</MenuItem>
                  <MenuItem value={"AUD/USD"}>AUD/USD</MenuItem>
                  <MenuItem value={"USD/CAD"}>USD/CAD</MenuItem>
                  <MenuItem value={"NZD/USD"}>NZD/USD</MenuItem>
                  <MenuItem value={"EUR/GBP"}>EUR/GBP</MenuItem>
                  <MenuItem value={"NDAQ"}>NDAQ</MenuItem>
                  <MenuItem value={"D&J"}>D&J</MenuItem>
                  <MenuItem value={"BTC/USD"}>BTC/USD</MenuItem>
                  <MenuItem value={"ETH/USD"}>ETH/USD</MenuItem>
                </Select>
              </FormControl>
            </div>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleDialogClose}>
              Cancel
            </Button>
            <Button
              onClick={() => navigate("/create")}
              disabled={symbol === "" ? true : false}
              autoFocus
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
      <React.Fragment>
        <Dialog
          fullScreen={fullScreen}
          open={openEditDialog}
          onClose={handleDialogClose}
          aria-labelledby="responsive-dialog-title"
          sx={{
            "& .MuiDialog-container": {
              "& .MuiPaper-root": {
                width: "100%",
                maxWidth: "30vw", // Set your width here
              },
            },
          }}
        >
          <DialogTitle id="responsive-dialog-title">
            {"Edit information?"}
          </DialogTitle>
          <DialogContent>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                padding: "10px",
              }}
            >
              <Input
                sx={{ margin: "20px" }}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Name"
              />
              <div
                style={{ margin: "20px" }}
                className="number-input-container"
              >
                <NumberInput
                  value={balance}
                  setValue={setBalance}
                  limit={true}
                />
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleDialogClose}>
              Cancel
            </Button>
            <Button
              onClick={editSubmit}
              disabled={isChanged || userName === ""}
              autoFocus
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </div>
  );
}
