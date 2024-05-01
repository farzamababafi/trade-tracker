import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import userApi from "../../api/userApi";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";

const columns = [
  { id: "id", label: "Id", minWidth: 70 },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "date", label: "Date", minWidth: 100 },
  { id: "result", label: "Result", minWidth: 20 },
];

/*const reverseRows = rows.sort(function (a, b) {
  return -(a.id - b.id || a.name.localeCompare(b.name));
});
   console.log(date.format("YYYY-MM-DD"));*/
export default function Tables({ setOpenDialog, userId, name }) {
  const [page, setPage] = useState(0);
  const [date, setDate] = useState("");
  const [isAsc, setIsAsc] = useState(true);
  const [rows, setRows] = useState([]);
  const rowsPerPage = 13;
  let emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  let navigate = useNavigate();

  useEffect(() => {
    if (date !== "") {
      let dataObj = {
        date: date.$d
          .toLocaleString()
          .slice(0, date.$d.toLocaleString().indexOf(",")),
        id: userId,
      };
      userApi.post("/getbydate", dataObj).then((result) => {
        setRows(result.data);
      });
    } else {
      userApi.get(`/gettransaction/${name}`).then((result) => {
        setRows(result.data);
      });
    }
    emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  }, [date]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backgroundColor: "#212121",
        color: "#fff",
        borderRadius: "0",
      }}
    >
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell
              key={"id"}
              style={{
                minWidth: "20px",

                backgroundColor: "rgba(128, 128, 128, 0.196)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "whitesmoke",
                }}
              >
                <p>#</p>
                <IconButton
                  onClick={() => setIsAsc(!isAsc)}
                  style={{ marginLeft: "2vh", color: "whitesmoke" }}
                  size="small"
                  aria-label="add"
                >
                  {isAsc ? (
                    <SouthIcon style={{ fontSize: "15px" }} />
                  ) : (
                    <NorthIcon style={{ fontSize: "15px" }} />
                  )}
                </IconButton>
              </div>
            </TableCell>
            {columns.map((column) =>
              column.id !== "id" ? (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: "column.minWidth",
                    backgroundColor: "rgba(128, 128, 128, 0.196)",
                    color: "#fff",
                  }}
                >
                  {column.label}
                </TableCell>
              ) : undefined
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => {
              return (
                <TableRow
                  onClick={() => navigate(`/transaction/${row._id}`)}
                  className="tablerow-container"
                  style={{ cursor: "pointer" }}
                  hover
                  key={index}
                >
                  {columns.map((column) => {
                    let value = row[column.id === "id" ? "count" : column.id];
                    if (column.id === "date") {
                      let tempdate = row[column.id];
                      value = tempdate.slice(0, tempdate.indexOf(","));
                    }

                    if (value === "win") {
                      return (
                        <TableCell
                          style={{ color: "green" }}
                          key={column.id}
                          align={column.align}
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    } else if (value === "lose") {
                      return (
                        <TableCell
                          style={{ color: "red" }}
                          key={column.id}
                          align={column.align}
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    } else {
                      return (
                        <TableCell
                          sx={{ color: "#fff" }}
                          key={column.id}
                          align={column.align}
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    }
                  })}
                </TableRow>
              );
            })}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0 10px",
            width: "70%",
            borderRadius: "10px",
            justifyContent: "space-between",
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              format="YYYY-MM-DD"
              value={date}
              onChange={setDate}
              sx={{
                "& input": { color: "whitesmoke" },
                "& .css-i4bv87-MuiSvgIcon-root": {
                  color: "whitesmoke",
                },
                "& .css-i4bv87-MuiSvgIcon-root:hover": {
                  color: "gray",
                },
                "& .MuiOutlinedInput-root": {
                  "& > fieldset": { borderColor: "#C7C8CD !important" },
                },
              }}
              hover
            />
          </LocalizationProvider>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(128, 128, 128, 0.196)",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
            }}
          >
            <IconButton
              sx={{ color: "whitesmoke", "&:hover": { color: "gray" } }}
              onClick={() => {
                setOpenDialog(true);
              }}
              aria-label="add"
            >
              <h4>+</h4>
            </IconButton>
          </div>
        </div>
        <TablePagination
          style={{
            width: "25%",
            backgroundColor: "rgba(128, 128, 128, 0.196)",
            borderRadius: "10px",
            color: "whitesmoke",
          }}
          component="div"
          rowsPerPageOptions={[]}
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      </div>
    </TableContainer>
  );
}
