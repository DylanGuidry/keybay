import { useNavigate } from "react-router-dom";
import logo from '../images/KEYBAY-02.png';
import React, { useState } from "react";

export default function AuthForm( { loadUser } ) {
    const navigate = useNavigate();
    const [authMode, setAuthMode] = useState("signin");
    const [state, setState] = useState({
        email: "",
        password: "",
        name: "",
    });

    const onEmailChange = (e) => {
        setState({ ...state, email: e.target.value });
    };

    const onPasswordChange = (e) => {
        setState({ ...state, password: e.target.value });
    };

    const onNameChange = (e) => {
        setState({ ...state, name: e.target.value });
    };

    const onSubmitSignIn = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/signin', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: state.email,
                password: state.password
            })
        }).then(response => response.json())
            .then(data => {
                if (data === 'success') {
                    navigate("/home");
                } else {
                    alert('Wrong credentials')
                }
            })
    }

    const onSubmitSignUp = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/register', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: state.name,
                email: state.email,
                password: state.password
            })
        }).then(response => response.json())
            .then(user => {
                if (user) {
                loadUser(user)
                    navigate("/home");
                } else {
                    alert('Wrong credentials')
                }
            })
    }


    const changeAuthMode = () => {
        setAuthMode(authMode === "signin" ? "signup" : "signin")
    }

    if (authMode === "signin") {
        return (
            <div className="Auth-form-container">
                <form className="Auth-form">
                    <div className="Auth-form-content">
                        <img src={logo} alt="logo" className="logo" width='100%' />
                        <div className="text-center">
                            Not registered yet?{" "}
                            <span className="link-primary" onClick={changeAuthMode}>
                                Sign Up
                            </span>
                        </div>
                        <div className="form-group mt-3">
                            <label>Email address</label>
                            <input
                                onChange={onEmailChange}
                                type="email"
                                className="form-control mt-1"
                                placeholder="Enter email"
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Password</label>
                            <input
                                onChange={onPasswordChange}
                                type="password"
                                className="form-control mt-1"
                                placeholder="Enter password"
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-primary" onClick={onSubmitSignIn}>
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

    return (
        <div className="Auth-form-container">
            <form className="Auth-form">
                <div className="Auth-form-content">
                    <img src={logo} alt="logo" className="logo" width='100%' />
                    <div className="text-center">
                        Already registered?{" "}
                        <span className="link-primary" onClick={changeAuthMode}>
                            Sign In
                        </span>
                    </div>
                    <div className="form-group mt-3">
                        <label>Full Name</label>
                        <input
                            onChange={onNameChange}
                            type="text"
                            className="form-control mt-1"
                            placeholder="e.g Jane Doe"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                            onChange={onEmailChange}
                            type="email"
                            className="form-control mt-1"
                            placeholder="Email Address"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            onChange={onPasswordChange}
                            type="password"
                            className="form-control mt-1"
                            placeholder="Password"
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary"
                            onClick={onSubmitSignUp}>d
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}