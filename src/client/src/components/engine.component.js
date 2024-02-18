import {useState} from "react";
import axios from "axios";
import './engine.component.scss';
import {Link, useNavigate} from "react-router-dom";

export function LoginEngine() {
    const [gmail, setGmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState(null);
    const navigate = useNavigate();
    const loginUser = async () => {
        const loginData = {
            gmail: gmail,
            password: password
        }
        axios
            .post(`${process.env.REACT_APP_SERVER_URL}/login`, loginData)
            .then(res => {
                console.log('Login success:', res.data);
                setLoginStatus(true);
            }).catch(err => {
            console.log('Login failed:', err);
            setLoginStatus(false);
        });


    };
    const registerUser = () => {
        navigate('/register');
    };
    return (
        <div className="login-engine">
            <div className="container-login">
                <div className="title">
                    Login
                </div>
                {loginStatus === false && <p className="home-login-incorrect-message">Incorrect Gmail or password.</p>}
                <div className="container-input">
                    <div className="input-title">
                        Gmail
                    </div>
                    <input
                        type="text"
                        placeholder="Type your gmail"
                        value={gmail}
                        onChange={(e) => setGmail(e.target.value)}
                    />
                </div>
                <div className="container-input">
                    <div className="input-title">
                        Password
                    </div>
                    <input
                        type="text"
                        placeholder="Type your password"
                        value={gmail}
                        onChange={(e) => setGmail(e.target.value)}
                    />
                </div>
            </div>
            <div className="container-login-and-register">
                <button className="button-radius login-button" onClick={loginUser}>Log in</button>
                <p>Don't have account? <Link to={'/register'}>Register</Link></p>
            </div>

        </div>
    );

}

export function RegisterEngine() {
    const [gmail, setGmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState(null);

    const navigate = useNavigate();
    const registerUser = async () => {
        const loginData = {
            gmail: gmail,
            password: password,
            confirmPassword: confirmPassword,
        }
    };
    return (
        <div className="register-engine">
            <div className="container-login">
                <div className="title">
                    Register
                </div>
                <div className="container-input">
                    <div className="input-title">
                        Gmail
                    </div>
                    <input
                        type="text"
                        placeholder="Type your gmail"
                        value={gmail}
                        onChange={(e) => setGmail(e.target.value)}
                    />
                </div>
                <div className="container-input">
                    <div className="input-title">
                        Password
                    </div>
                    <input
                        type="text"
                        placeholder="Type your password"
                        value={gmail}
                        onChange={(e) => setGmail(e.target.value)}
                    />
                </div>
                <div className="container-input">
                    <div className="input-title">
                        Confirm password
                    </div>
                    <input
                        type="text"
                        placeholder="Type your confirm password"
                        value={gmail}
                        onChange={(e) => setGmail(e.target.value)}
                    />
                </div>
                <div className="container-input" style={{backgroundColor: 'transparent'}}>
                    <div className="input-title">
                        Code
                    </div>
                    <div className="container-input-code">
                        <input
                            className={"input-code"}
                            type="text"
                            placeholder="0"
                            maxLength={1}
                        />
                        <input
                            className={"input-code"}
                            type="text"
                            placeholder="0"
                            maxLength={1}
                        />
                        <input
                            className={"input-code"}
                            type="text"
                            placeholder="0"
                            maxLength={1}
                        />
                        <input
                            className={"input-code"}
                            type="text"
                            placeholder="0"
                            maxLength={1}

                        />
                    </div>
                </div>
            </div>
            <div className="container-login-and-register">
                <button className="button-radius login-button" onClick={registerUser}>Log in</button>
                <p>Already have your account. <Link to={'/login'}>Login</Link></p>
            </div>

        </div>
    );

}
