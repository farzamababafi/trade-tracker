import React from "react";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import userApi from "../../api/userApi";
import { useNavigate } from "react-router-dom";

import { IconButton } from "@mui/material";
export default function Chip({ name }) {
  let navigate = useNavigate();
  return (
    <div className="chip-container">
      <div
        onClick={() => navigate(`/home/${name}`)}
        className="avatar-container"
      >
        <Avatar style={{ width: "50px", height: "50px" }}>M</Avatar>
      </div>
      <div onClick={() => navigate(`/home/${name}`)} className="name-container">
        <h3>{name}</h3>
      </div>
      <div
        onClick={() => {
          userApi.post(`/delete/${name}`).then((data) => {
            if (data.statusText === "OK") window.location.reload(false);
          });
        }}
        className="icon-container"
      >
        <IconButton>
          <DeleteIcon style={{ color: "rgb(208, 219, 230)" }} />
        </IconButton>
      </div>
    </div>
  );
}
