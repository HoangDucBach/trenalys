import {useEffect, useState} from "react";
import axios from "axios";
import './engine.component.scss';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

export function InputEngine({type,title, placeholder, value, setValue}) {
    return (
        <div className="input-engine">

            <div className="container-input">
                <div className="input-title">
                    {title}
                </div>
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
        </div>

    );

}

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
            .post(`${process.env.REACT_APP_SERVER_URL}/login`, loginData)
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
            .post(`${process.env.REACT_APP_SERVER_URL}/register`, registerData)
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
        axios.post(`${process.env.REACT_APP_SERVER_URL}/register`, {
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
                        type="password"
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
                        type="password"
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

export function SearchEngine() {
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();
    const search = () => {
        navigate(`/search/${searchValue}`);
    }
    return (
        <div className="search-engine">
            <div className="container-search component">
                <div className="search-img">
                    <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M24.5893 23.1177L19.8686 18.4109C21.3917 16.4705 22.2181 14.0743 22.2151 11.6075C22.2151 9.41067 21.5636 7.26315 20.3431 5.43652C19.1226 3.6099 17.3878 2.18622 15.3582 1.34552C13.3286 0.504813 11.0952 0.284847 8.94056 0.713433C6.78591 1.14202 4.80674 2.19991 3.25333 3.75333C1.69991 5.30674 0.64202 7.28591 0.213433 9.44056C-0.215153 11.5952 0.00481268 13.8286 0.845515 15.8582C1.68622 17.8878 3.1099 19.6226 4.93652 20.8431C6.76315 22.0636 8.91067 22.7151 11.1075 22.7151C13.5743 22.7181 15.9705 21.8917 17.9109 20.3686L22.6177 25.0893C22.7468 25.2194 22.9004 25.3227 23.0695 25.3932C23.2387 25.4637 23.4202 25.5 23.6035 25.5C23.7868 25.5 23.9683 25.4637 24.1375 25.3932C24.3067 25.3227 24.4602 25.2194 24.5893 25.0893C24.7194 24.9602 24.8227 24.8067 24.8932 24.6375C24.9637 24.4683 25 24.2868 25 24.1035C25 23.9202 24.9637 23.7387 24.8932 23.5695C24.8227 23.4004 24.7194 23.2468 24.5893 23.1177ZM2.77689 11.6075C2.77689 9.95989 3.26547 8.34924 4.18085 6.97928C5.09624 5.60931 6.39731 4.54155 7.91953 3.91102C9.44176 3.28049 11.1168 3.11552 12.7328 3.43696C14.3488 3.7584 15.8331 4.55182 16.9982 5.71688C18.1633 6.88194 18.9567 8.36632 19.2781 9.98231C19.5996 11.5983 19.4346 13.2733 18.8041 14.7955C18.1735 16.3178 17.1058 17.6188 15.7358 18.5342C14.3658 19.4496 12.7552 19.9382 11.1075 19.9382C8.89811 19.9382 6.77918 19.0605 5.21688 17.4982C3.65458 15.9359 2.77689 13.817 2.77689 11.6075Z"
                            fill="#8B8B8B"/>
                    </svg>
                </div>
                <input
                    type="text"
                    placeholder="Search trend . . ."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
            </div>
        </div>
    );
}

export function SortEngine() {
    return (
        <div className="sort-engine component">
            <div className="container-sort">
                <div className="sort-title">
                    Sort by
                </div>
                <div className="drop-list-img">
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 10.625L12.25 17.375L5.5 10.625" stroke="#222222" stroke-width="2.25"
                              stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <circle cx="12.5" cy="12.5" r="12" stroke="#222222"/>
                    </svg>

                </div>
            </div>
        </div>
    );
}

export function SurveyEngine() {
    return (
        <div className="button-radius survey-engine">
            Survey Engine
        </div>
    )
}


export function TrendTag({tag}) {
    return (
        <div className="trend-tag component">
            {tag}
        </div>
    );

}

export function TrendCardEngine({trend, user}) {
    const id = trend.id;
    const title = trend.title;
    const description = trend.description;
    const trendTags = trend.trendTags;
    const numberOfVotes = trend.numberOfVotes;
    const timeCreated = trend.timeCreated;

    // const isFollowed = user.followedTrends.includes(id);

    return (
        <div className="trend-card-engine component">
            <div className="container-trend-info">
                <div className="container-trend-id">
                    <div className="trend-id">
                        ID: {id}
                    </div>
                </div>
                <div className="container-trend-description">
                    <div className="container-trend-title">
                        <div className="trend-title">{title}</div>
                        <button className="trend-follow-button button-radius">Follow</button>
                    </div>
                    <div className="trend-description">
                        {description}
                    </div>
                </div>
            </div>
            <div className="container-trend-graph">
                {/*<svg width="250" height="100%" viewBox="0 0 250 69" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                {/*    <path d="M0 29.2361C0 26.4747 2.23858 24.2361 5 24.2361H15.0786C17.84 24.2361 20.0786 26.4747 20.0786 29.2361V63.6664C20.0786 66.4278 17.84 68.6664 15.0786 68.6664H5C2.23858 68.6664 0 66.4278 0 63.6664V29.2361Z" fill="#222222"/>*/}
                {/*    <path d="M25.5464 14.582C25.5464 11.8206 27.785 9.58203 30.5464 9.58203H40.625C43.3864 9.58203 45.625 11.8206 45.625 14.582V63.6666C45.625 66.428 43.3864 68.6666 40.625 68.6666H30.5464C27.785 68.6666 25.5464 66.428 25.5464 63.6666V14.582Z" fill="#222222"/>*/}
                {/*    <path d="M51.0938 11.6979C51.0938 8.93645 53.3323 6.69788 56.0937 6.69788H66.1724C68.9338 6.69788 71.1724 8.93645 71.1724 11.6979V63.6665C71.1724 66.4279 68.9338 68.6665 66.1724 68.6665H56.0938C53.3323 68.6665 51.0938 66.4279 51.0938 63.6665V11.6979Z" fill="#222222"/>*/}
                {/*    <path d="M76.6406 4.99438C76.6406 2.23296 78.8792 -0.00561523 81.6406 -0.00561523H91.7192C94.4807 -0.00561523 96.7192 2.23296 96.7192 4.99438V63.6665C96.7192 66.4279 94.4807 68.6665 91.7192 68.6665H81.6406C78.8792 68.6665 76.6406 66.4279 76.6406 63.6665V4.99438Z" fill="#222222"/>*/}
                {/*    <path d="M102.188 56.0503C102.188 53.2889 104.426 51.0503 107.188 51.0503H117.266C120.028 51.0503 122.266 53.2889 122.266 56.0503V63.6665C122.266 66.428 120.028 68.6665 117.266 68.6665H107.188C104.426 68.6665 102.188 66.428 102.188 63.6665V56.0503Z" fill="#222222"/>*/}
                {/*    <path d="M127.734 9.90503C127.734 7.14361 129.973 4.90503 132.734 4.90503H142.813C145.574 4.90503 147.813 7.14361 147.813 9.90503V63.6664C147.813 66.4279 145.574 68.6664 142.813 68.6664H132.734C129.973 68.6664 127.734 66.4279 127.734 63.6664V9.90503Z" fill="#222222"/>*/}
                {/*    <path d="M153.281 25.7285C153.281 22.9671 155.52 20.7285 158.281 20.7285H168.36C171.121 20.7285 173.36 22.9671 173.36 25.7285V63.6665C173.36 66.4279 171.121 68.6665 168.36 68.6665H158.281C155.52 68.6665 153.281 66.4279 153.281 63.6665V25.7285Z" fill="#222222"/>*/}
                {/*    <path d="M178.828 54.2574C178.828 51.496 181.066 49.2574 183.828 49.2574H193.906C196.668 49.2574 198.906 51.496 198.906 54.2574V63.6665C198.906 66.4279 196.668 68.6665 193.906 68.6665H183.828C181.066 68.6665 178.828 66.4279 178.828 63.6665V54.2574Z" fill="#222222"/>*/}
                {/*    <path d="M204.374 32.432C204.374 29.6706 206.613 27.432 209.374 27.432H219.453C222.214 27.432 224.453 29.6706 224.453 32.432V63.6665C224.453 66.4279 222.214 68.6665 219.453 68.6665H209.374C206.613 68.6665 204.374 66.4279 204.374 63.6665V32.432Z" fill="#222222"/>*/}
                {/*    <path d="M229.922 8.34607C229.922 5.58465 232.16 3.34607 234.922 3.34607H245C247.762 3.34607 250 5.58465 250 8.34607V63.6664C250 66.4279 247.762 68.6664 245 68.6664H234.922C232.16 68.6664 229.922 66.4279 229.922 63.6664V8.34607Z" fill="#222222"/>*/}
                {/*    <path d="M0 29.2361C0 26.4747 2.23858 24.2361 5 24.2361H15.0786C17.84 24.2361 20.0786 26.4747 20.0786 29.2361V63.6664C20.0786 66.4278 17.84 68.6664 15.0786 68.6664H5C2.23858 68.6664 0 66.4278 0 63.6664V29.2361Z" fill="#222222"/>*/}
                {/*    <path d="M127.734 9.90503C127.734 7.14361 129.973 4.90503 132.734 4.90503H142.813C145.574 4.90503 147.813 7.14361 147.813 9.90503V63.6664C147.813 66.4279 145.574 68.6664 142.813 68.6664H132.734C129.973 68.6664 127.734 66.4279 127.734 63.6664V9.90503Z" fill="#222222"/>*/}
                {/*    <path d="M153.281 25.7285C153.281 22.9671 155.52 20.7285 158.281 20.7285H168.36C171.121 20.7285 173.36 22.9671 173.36 25.7285V63.6665C173.36 66.4279 171.121 68.6665 168.36 68.6665H158.281C155.52 68.6665 153.281 66.4279 153.281 63.6665V25.7285Z" fill="#222222"/>*/}
                {/*    <path d="M178.828 54.2574C178.828 51.496 181.066 49.2574 183.828 49.2574H193.906C196.668 49.2574 198.906 51.496 198.906 54.2574V63.6665C198.906 66.4279 196.668 68.6665 193.906 68.6665H183.828C181.066 68.6665 178.828 66.4279 178.828 63.6665V54.2574Z" fill="#222222"/>*/}
                {/*    <path d="M229.922 8.34607C229.922 5.58465 232.16 3.34607 234.922 3.34607H245C247.762 3.34607 250 5.58465 250 8.34607V63.6664C250 66.4279 247.762 68.6664 245 68.6664H234.922C232.16 68.6664 229.922 66.4279 229.922 63.6664V8.34607Z" fill="#222222"/>*/}
                {/*</svg>*/}

            </div>
            <div className="container-trend-detail">
                <div className="container-trend-voted">
                    <div className="trend-voted">{numberOfVotes} VOTED</div>
                </div>
                <div className="container-trend-detail-item">
                    <div className="trend-detail-item__title">Created</div>
                    <div className="trend-detail-item__value">{timeCreated}</div>
                </div>
                <div className="container-trend-detail-item">
                    <div className="trend-detail-item__title">Voted</div>
                    <div className="trend-detail-item__value">{numberOfVotes}</div>
                </div>
            </div>
            <div className="container-trend-tags">
                {
                    trendTags.map(tag => <TrendTag tag={tag}/>)
                }
            </div>

        </div>
    );

}