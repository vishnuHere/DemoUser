import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { history } from "../../utils/history";
import UserIcon from "@mui/icons-material/SupervisedUserCircleOutlined";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import wordings from "./wordings.js";
import "./index.scss";

const customStyle = { margin: '3%', width: `75%` };

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ERROR_MSG = "Invalid Credentials";

const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [open, setOpen] = useState(false);
    const credentials = require("./credentials.json");

    const handleSubmit = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        if (credentials.username === username && credentials.passowrd === "password")
            history.push("home");
        else
            setOpen(true);

    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="login">
            <form onSubmit={handleSubmit} className={"login__container"}>
                <UserIcon sx={{ fontSize: 150, color: "#398fc7" }} />
                <TextField
                    id="outlined-basic"
                    label={wordings.username}
                    variant="outlined"
                    style={customStyle}
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
                <TextField
                    id="outlined-basic"
                    label={wordings.password}
                    variant="outlined"
                    style={customStyle}
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <Button variant="contained" type="submit">
                    {wordings.login}
                </Button>
            </form>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="error"
                    sx={{ width: "100%" }}
                >
                    {ERROR_MSG}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Login;
