import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TableIcon from "@mui/icons-material/SupervisedUserCircle";
import CreateIcon from "@mui/icons-material/CreateTwoTone";
import LogoutIcon from "@mui/icons-material/LogoutOutlined";
import Box from "@mui/material/Box";
import { resetUserList } from "../../storage";
import Api from "../../utils/api";
import wordings from "./wordings";
import "./styles.scss";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const customStyles = {
  rows: {
    style: {
      minHeight: "70px"
    }
  },
  headCells: {
    style: {
      paddingLeft: "25px",
      paddingRight: "8px",
      fontSize: "1rem",
      color: "#0e4f74",
      fontWeight: "bold",
      borderBottom: "3px solid #1b63b9"
    }
  },
  cells: {
    style: {
      paddingLeft: "25px",
      paddingRight: "8px",
      fontSize: "0.93rem"
    }
  }
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

const Home = ({ history }) => {
  const [users, setUsers] = useState([]);
  const totalUsers = JSON.parse(localStorage.getItem("users"));

  const getUsers = async () => {
    try {
      const response = await Api.get("0.8/?results=20");
      const userList = response.results.map(result => result.user);
      const total = [...totalUsers, ...userList];
      resetUserList(total);
      setUsers(total);
    } catch (error) {
      setUsers([]);
      resetUserList([]);
    }
  };

  useEffect(() => { getUsers() }, []);

  const columns = [
    {
      name: wordings.no,
      maxWidth: "10px",
      cell: (row, index) => index + 1
    },
    {
      name: wordings.title,
      maxWidth: "10px",
      selector: (row) => row.name.title
    },
    {
      name: wordings.firstName,
      selector: (row) => row.name.first
    },
    {
      name: wordings.lastName,
      selector: (row) => row.name.last
    },
    {
      name: wordings.gender,
      selector: "gender"
    },
    {
      name: wordings.dob,
      selector: "dob"
    },
    {
      name: wordings.email,
      selector: "email"
    },
    {
      name: wordings.phone,
      selector: "phone"
    },
  ];

  const onSearch = (event) => {
    const filteredList = totalUsers.filter(user =>
      (user.name.first.includes(event.target.value) || user.name.last.includes(event.target.value))
    );

    setUsers(filteredList);
  };

  const handleLogout = () => {
    resetUserList([]);
    history.push("/");
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <TableIcon />
          <Typography component="div" sx={{ flexGrow: 1 }}>
            {wordings.users}
          </Typography>
          <Button
            variant="outlined"
            color="inherit"
            style={{ marginRight: '2%' }}
            startIcon={<CreateIcon />}
            onClick={() => history.push("/create")}
          >
            {wordings.createUser}
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
          >
            {wordings.logout}
          </Button>
        </Toolbar>
      </AppBar>
      <div className="tableContainer">
        <TextField
          id="search"
          label={wordings.search}
          variant="outlined"
          style={{ width: '50%', margin: '3%' }}
          onChange={onSearch}
        />
        <div className="table">
          <DataTable
            customStyles={customStyles}
            columns={columns}
            data={users}
            highlightOnHover
            responsive
            noHeader
          />
        </div>
      </div>
    </div >
  );
};

export default Home;
