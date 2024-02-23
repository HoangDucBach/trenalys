import {useEffect, useState} from "react";
import axios from "axios";
import './engine.component.scss';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

export function InputEngine({type, title, placeholder, value, setValue}) {
    return (
        <div className="input-engine component">
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
    const [isLogging, setIsLogging] = useState(false);
    const dispatch = useDispatch();

    const loginUser = async () => {
        setIsLogging(true);
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
            })
            .catch(err => {
                console.log('Login failed:', err);
                setLoginStatus(false);
            })
            .finally(() => setIsLogging(false));


    };
    return (
        <div className="login-engine">
            <div className="container-login">
                <div className="title">
                    Login
                </div>
                {loginStatus === false && <p className="error-message">Incorrect Gmail or password.</p>}
                <InputEngine
                    title='Gmail'
                    type='text'
                    placeholder='Type your gmail'
                    value={gmail}
                    setValue={setGmail}
                />
                <InputEngine
                    title='Password'
                    type='password'
                    placeholder='Type your password'
                    value={password}
                    setValue={setPassword}
                />
            </div>
            <div className="container-login-and-register">
                <button className="button-radius login-button loading-container-engine" onClick={loginUser}>
                    Log in
                    <LoadingEngine loading={isLogging}/>
                </button>
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
    const [isRegistering, setIsRegistering] = useState(false);
    const registerUser = async () => {
        setIsRegistering(true);
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
                <button className="button-radius login-button" onClick={registerUser}>
                    Register
                    <LoadingEngine loading={isRegistering}/>
                </button>
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
                              strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12.5" cy="12.5" r="12" stroke="#222222"/>
                    </svg>

                </div>
            </div>
        </div>
    );
}

export function SurveyFormEngine() {
    const [trendTitle, setTrendTitle] = useState('');
    const [trendDescription, setTrendDescription] = useState('');
    const [trendTags, setTrendTags] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            trendTitle: trendTitle,
            trendDescription: trendDescription,
            trendTimeCreated: new Date().toISOString(),
        };

        try {
            const postUrl = `${process.env.REACT_APP_SERVER_URL}/dashboard/home/create-trend-form`;

            const response = await axios.post(postUrl, formData);
            if (response.status !== 200) {
                throw new Error('Failed to submit form');
            }
            console.log('Form submitted successfully:', response.data);
        } catch (error) {
            console.error('Error submitting form:', error.message);
        }
    };
    return (
        <div className="survey-form-engine component">
            <form className="container-survey-form" onSubmit={handleSubmit}>
                <div className="survey-form-title title">
                    Create Survey Form
                </div>
                <div className="container-survey-form-item">
                    <InputEngine
                        title='Title'
                        type='text'
                        placeholder='Type your survey title'
                        value={trendTitle}
                        setValue={setTrendTitle}
                        className="component"
                    />
                </div>
                <div className="container-survey-form-item">
                    <InputEngine
                        title='Description'
                        type='text'
                        placeholder='Type your survey description'
                        value={trendDescription}
                        setValue={setTrendDescription}
                    />
                </div>
                <div className="container-survey-form-item">
                    <button className="button-radius button-cancel-survey">Cancel</button>
                    <input type="submit" className="button-radius button-submit-survey"/>
                </div>
            </form>
        </div>
    );
}

export function SurveyEngine() {
    const [isFormAvailable, setIsFormAvailable] = useState(false);
    return (
        <>
            <div
                className="button-radius survey-engine"
                onClick={() => setIsFormAvailable(!isFormAvailable)}
            >
                Survey Engine
            </div>
            {isFormAvailable && <SurveyFormEngine/>}
        </>
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
    const title = trend.name;
    const description = trend.description;
    // const trendTags = trend.trendTags;
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
                {/*{*/}
                {/*    trendTags.map(tag => <TrendTag tag={tag}/>)*/}
                {/*}*/}
            </div>

        </div>
    );

}

export function LoadingEngine({loading}) {
    if (!loading) {
        return null;
    }
    return (
        <div className="loading-engine">
        </div>
    )
}