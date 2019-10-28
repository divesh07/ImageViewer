import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Login.css';
import 'typeface-roboto';
import Header from '../../common/header/Header';
import Home from "../home/Home";
import PropTypes from 'prop-types';
import { Button, Card, Typography, FormControl, InputLabel, Input, FormHelperText, CardContent } from '@material-ui/core';

const CardContainer = function (props) {
    return (
        <Typography component="div" style={{ padding: 0, textAlign: "center" }}>
            {props.children}
        </Typography>
    );
}

CardContainer.propTypes = {
    children: PropTypes.node.isRequired
}

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            value: 0,
            usernameRequired: "dispNone",
            passwordRequired: "dispNone",
            projectUserName: "testProject",
            projectPassword: "testProject",
            validateCredentials: "dispNone",
            accesstoken: "8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784"
        };
    }

    loginClickHandler = () => {
        this.state.username === "" ? this.setState({ usernameRequired: "dispBlock" }) : this.setState({ usernameRequired: "dispNone" });
        this.state.password === "" ? this.setState({ passwordRequired: "dispBlock" }) : this.setState({ passwordRequired: "dispNone" });

        if ((this.state.username !== "" && this.state.password !== "") && (this.state.username !== this.state.projectUserName
            || this.state.password !== this.state.projectPassword)) {
            console.log("Invalid Credentials")
            this.setState({ validateCredentials: "dispBlock" });
            this.setState({value: 1})
        } else {
            console.log("Credentials validated")
            this.setState({ validateCredentials: "dispNone" });
            sessionStorage.setItem("access-token", this.state.accesstoken);

            //if (this.state.value === 1){
                ReactDOM.render(<Home />, document.getElementById('root'));
            //}
            
        }
    }

    inputUserNameChangeHandler = (e) => {
        this.setState({ username: e.target.value })
    }

    inputPasswordChangeHandler = (e) => {
        this.setState({ password: e.target.value });
    }

    render() {
        return (
            <div>
                <Header></Header>

                <Card className="cardContainer">
                    <CardContent>
                        <Typography className="title" color="textSecondary" variant="h5" component="h2">LOGIN
                        </Typography>

                        <FormControl required>
                            <InputLabel htmlFor="username">Username</InputLabel>
                            <Input id="username" type="text" username={this.state.username} onChange={this.inputUserNameChangeHandler} />
                            <FormHelperText className={this.state.usernameRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl><br /><br />

                        <FormControl required >
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input id="password" type="password" password={this.state.password} onChange={this.inputPasswordChangeHandler} />
                            <FormHelperText className={this.state.passwordRequired}>
                                <span className="red">required</span>
                            </FormHelperText>

                            <FormHelperText className={this.state.validateCredentials}>
                                <span className="red">Incorrect username and/or password</span>
                            </FormHelperText>

                        </FormControl><br /><br />

                        <Button variant="contained" color="primary" onClick={this.loginClickHandler}>LOGIN</Button>

                    </CardContent>

                </Card>
            </div>

        );
    }
}

export default Login;