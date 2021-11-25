import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ArrowBack from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { updateList, insertIntoUserList } from "../../storage";
import wordings from "./wordings";
import "./styles.scss";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SUCCESS_MSG = wordings.successMsg;
const MALE = "male";

const UserCreate = ({ history }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState({ title: "mr", first: "", last: "" });
  const [gender, setGender] = useState(MALE);
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleChange = (event) => {
    setPriority(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUserCreate = () => {
    const data = {
      name,
      dob,
      username: userName,
      password,
      phone,
      email,
      gender
    };

    insertIntoUserList(data);
    setOpen(true);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => history.goBack()}
          >
            <ArrowBack />
          </IconButton>
          <Typography component="div" sx={{ flexGrow: 1 }}>
            {wordings.createUser}
          </Typography>
        </Toolbar>
      </AppBar>
      <form className="create-container" onSubmit={handleUserCreate}>
        <div className="create-container__nameContainer">
          <FormControl>
            <InputLabel id="demo-simple-select-title-label">
              {wordings.title}
            </InputLabel>
            <Select
              labelId="demo-simple-select-title-label"
              id="demo-simple-title-standard"
              label={wordings.title}
              value={name.title}
              onChange={(event) => setName({ ...name, title: event.target.value })}
              required
            >
              <MenuItem value={"mr"}>Mr.</MenuItem>
              <MenuItem value={"ms"}>Ms.</MenuItem>
              <MenuItem value={"mrs"}>Mrs.</MenuItem>
              <MenuItem value={"miss"}>Miss.</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="firstName"
            label={wordings.enterFirstName}
            variant="outlined"
            value={name.first}
            onChange={(event) => setName({ ...name, first: event.target.value })}
            required
          />
          <TextField
            id="lastName"
            label={wordings.enterLastName}
            variant="outlined"
            value={name.last}
            onChange={(event) => setName({ ...name, last: event.target.value })}
            required
          />
        </div>

        <FormControl>
          <InputLabel id="demo-simple-select-standard-label">
            {wordings.gender}
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            label={wordings.gender}
            value={gender}
            onChange={(event) => setGender(event.target.value)}
            required
          >
            <MenuItem value={"male"}>{wordings.male}</MenuItem>
            <MenuItem value={"female"}>{wordings.female}</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="username"
          label={wordings.enterUserName}
          variant="outlined"
          value={userName}
          onChange={(event) => setUsername(event.target.value)}
          required
        />
        <TextField
          id="password"
          label={wordings.enterPassword}
          type="password"
          variant="outlined"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <TextField
          id="date"
          label={wordings.dob}
          type="date"
          value={dob}
          sx={{ width: 220 }}
          onChange={(event) => setDob(event.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          required
        />
        <TextField
          id="email"
          label={wordings.enterEmail}
          variant="outlined"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          required
        />
        <TextField
          id="phone"
          label={wordings.enterPhoneNumber}
          variant="outlined"
          value={phone}
          type="number"
          onChange={(event) => setPhone(event.target.value)}
          required
        />
        <Button variant="contained" type="submit">
          Add
        </Button>
      </form>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {SUCCESS_MSG}
        </Alert>
      </Snackbar>
    </div >
  );
};

export default UserCreate;
