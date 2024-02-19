import {useEffect, useState} from "react";
import axios from "axios";
import './engine.component.scss';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

export function LoginEngine() {
    const [gmail, setGmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState(null);

    const dispatch = useDispatch();

    const loginUser = async () => {
        const loginData = {
            gmail: gmail,
            password: password
        }
        axios
            .post(`/login`, loginData)
            .then(res => {
                console.log('Login success:', res.data);
                setLoginStatus(true);
                dispatch({type: 'CHECK_LOGIN', payload: true});
            }).catch(err => {
            console.log('Login failed:', err);
            setLoginStatus(false);
        });


    };
    return (
        <div className="login-engine">
            <div className="container-login">
                <div className="title">
                    Login
                </div>
                {loginStatus === false && <p className="error-message">Incorrect Gmail or password.</p>}
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
                        type="password"
                        placeholder="Type your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
    const [registerError, setRegisterError] = useState(null);
    const [inputCode, setInputCode] = useState('');
    const [registerStatus, setRegisterStatus] = useState(null);
    const [code, setCode] = useState(null);
    const registerUser = async () => {
        console.log('Code:', code, 'Verify:', inputCode);
        if (password !== confirmPassword) {
            setRegisterError('Password and confirm password are not the same.');
            setRegisterStatus(false);
            return;
        }
        if (inputCode.toString() !== code.toString()) {
            setRegisterError('Verify code is not correct.');
            setRegisterStatus(false);
            return;
        }
        const registerData = {
            action: 'createUser',
            gmail: gmail,
            password: password
        }
        axios
            .post(`/register`, registerData)
            .then(res => {
                console.log('Register success:', res.data);
                setRegisterStatus(true);
                setGmail('');
                setPassword('');
                setConfirmPassword('');
                setInputCode('');
            }).catch(err => {
            console.log('Register failed:', err);
            setRegisterStatus(false);
        });
    };
    const sendCode = async () => {
        axios.post(`/register`, {
            action: 'sendCode',
            gmail: gmail
        }).then(res => {
            setCode(res.data.data.code);
            console.log('Send code success:', res.data.data.code);
        }).catch(err => {
            console.log('Send code failed:', err);
        });
    };
    return (
        <div className="register-engine">
            <div className="container-login">
                <div className="title">
                    Register
                </div>
                {registerStatus === false && <p className="error-message">{registerError}</p>}
                {registerStatus === true && <p className="success-message">Register successful!</p>}

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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="container-input">
                    <div className="input-title">
                        Confirm password
                    </div>
                    <input
                        type="text"
                        placeholder="Type your confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <div className="container-input" style={{backgroundColor: 'transparent'}}>
                    <div className="container-input-code-title">
                        <div className="input-title">
                            Code
                        </div>
                        <button className="button-radius button-send-code" onClick={sendCode}>Send code</button>
                    </div>
                    <div className="container-input-code">
                        <input
                            type="text"
                            className="input-code"
                            maxLength="4"
                            placeholder="0000"
                            minLength="4"
                            value={inputCode}
                            onChange={(e) => setInputCode(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className="container-login-and-register">
                <button className="button-radius login-button" onClick={registerUser}>Register</button>
                <p>Already have your account. <Link to={'/login'}>Login</Link></p>
            </div>

        </div>
    );

}
