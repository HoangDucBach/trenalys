import {useEffect, useRef, useState} from "react";
import axios from "axios";
import './engine.component.scss';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {checkLogin} from "../redux/actions/status.action";

export function InputEngine({type, title, placeholder, value, setValue, typeInput, id}) {
    return (
        <div className="input-engine">
            <div className="container-input">
                <div className="input-title title-custom">
                    {title}
                </div>
                {typeInput === 'textarea' && <textarea
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    id={id}
                />}
                {typeInput === 'input' && <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    id={id}
                />}

            </div>
        </div>
    );
}

export function UserStatusEngine() {
    const status = useSelector(state => state.status);
    const [username, setUsername] = useState('');

    const dispatch = useDispatch();

    const logout = () => {
        dispatch({type: 'LOGOUT'});
    }
    useEffect(() => {
        console.log('Status:', status);
        if (status.isLogged === true && status.gmail !== null) {
            setUsername(status.gmail.substring(0, status.gmail.indexOf('@')));
        }
    }, [status.isLogged]);
    if (status.isLogged === false) {
        return (
            <div className="user-status-engine">
                <div className="user-status-engine__container-login-and-register ">
                    <Link className='title-custom' to={'/register'}>Register</Link>
                    <Link className="button-custom login-button" to={'/login'}>Login</Link>
                </div>

            </div>
        )
    }
    return (
        <div className="user-status-engine">
            <div className="user-status-engine__container-notification">
                <div className="notification-icon">
                    <svg width="17" height="21" viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M15.3616 13.9104C14.7904 14.5144 14.018 14.8949 13.1852 14.9802L13.1725 14.9815L13.1599 14.9831C10.0578 15.3812 6.91705 15.3812 3.81497 14.9831L3.79793 14.9809L3.78083 14.9793C2.94189 14.9009 2.16169 14.5228 1.5842 13.9175C1.18804 13.43 0.981497 12.8182 1.0013 12.1932L1.00181 12.1774V12.1615V11.9858C1.02976 11.5373 1.16777 11.1022 1.40397 10.7184C2.08363 9.93489 2.5537 8.99238 2.76923 7.97811L2.78277 7.9144L2.78793 7.84946C2.81793 7.47189 2.81792 7.09835 2.81791 6.76911L2.81791 6.75245C2.81791 6.4107 2.81842 6.11415 2.84062 5.82648C3.12282 3.20467 5.71645 1.25 8.44715 1.25H8.53662C11.2416 1.25 13.8879 3.21307 14.161 5.8256C14.1832 6.10879 14.1838 6.40507 14.1838 6.74911V6.76595C14.1837 7.09614 14.1837 7.47189 14.2137 7.84946L14.2185 7.90917L14.2303 7.96789C14.436 8.98829 14.9031 9.93759 15.5852 10.7244C15.8284 11.104 15.971 11.5382 15.9999 11.9867V12.1615H15.9999L16 12.1676C16.0039 12.805 15.7778 13.4233 15.3616 13.9104ZM9.64786 18.335C9.8894 18.3435 10.1277 18.3872 10.3552 18.4643C9.99434 18.908 9.46094 19.1867 8.88007 19.2263L8.85485 19.2281L8.82974 19.2311C8.13133 19.3143 7.4288 19.1208 6.87434 18.6939L6.85251 18.6771L6.82979 18.6615C6.75745 18.6119 6.69757 18.549 6.65252 18.4774C6.66016 18.4755 6.66796 18.4736 6.67594 18.4717C7.10859 18.3812 7.54954 18.3354 7.99174 18.335H9.64786Z"
                            stroke="#222222" strokeWidth="2"/>
                    </svg>

                </div>
            </div>
            <Link to='/dashboard/home' className="user-status-engine__container-gmail title-custom">
                {username}
            </Link>
            <div className="user-status-engine__container-log-out">
                <div className="log-out-icon" onClick={logout}>
                    <svg width="20" height="26" viewBox="0 0 20 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0 12.75C0 13.0815 0.131696 13.3995 0.366117 13.6339C0.600537 13.8683 0.918479 14 1.25 14H10.7375L7.8625 16.8625C7.74534 16.9787 7.65235 17.117 7.58889 17.2693C7.52542 17.4216 7.49275 17.585 7.49275 17.75C7.49275 17.915 7.52542 18.0784 7.58889 18.2307C7.65235 18.383 7.74534 18.5213 7.8625 18.6375C7.9787 18.7547 8.11695 18.8477 8.26928 18.9111C8.4216 18.9746 8.58498 19.0072 8.75 19.0072C8.91502 19.0072 9.0784 18.9746 9.23072 18.9111C9.38305 18.8477 9.5213 18.7547 9.6375 18.6375L14.6375 13.6375C14.7513 13.5186 14.8405 13.3784 14.9 13.225C15.025 12.9207 15.025 12.5793 14.9 12.275C14.8405 12.1216 14.7513 11.9814 14.6375 11.8625L9.6375 6.8625C9.52095 6.74595 9.38259 6.6535 9.23031 6.59043C9.07803 6.52735 8.91482 6.49489 8.75 6.49489C8.58518 6.49489 8.42197 6.52735 8.26969 6.59043C8.11741 6.6535 7.97905 6.74595 7.8625 6.8625C7.74595 6.97905 7.6535 7.11741 7.59043 7.26969C7.52735 7.42197 7.49489 7.58518 7.49489 7.75C7.49489 7.91482 7.52735 8.07803 7.59043 8.23031C7.6535 8.38259 7.74595 8.52095 7.8625 8.6375L10.7375 11.5H1.25C0.918479 11.5 0.600537 11.6317 0.366117 11.8661C0.131696 12.1005 0 12.4185 0 12.75ZM16.25 0.25H3.75C2.75544 0.25 1.80161 0.645088 1.09835 1.34835C0.395088 2.05161 0 3.00544 0 4V7.75C0 8.08152 0.131696 8.39946 0.366117 8.63388C0.600537 8.8683 0.918479 9 1.25 9C1.58152 9 1.89946 8.8683 2.13388 8.63388C2.3683 8.39946 2.5 8.08152 2.5 7.75V4C2.5 3.66848 2.6317 3.35054 2.86612 3.11612C3.10054 2.8817 3.41848 2.75 3.75 2.75H16.25C16.5815 2.75 16.8995 2.8817 17.1339 3.11612C17.3683 3.35054 17.5 3.66848 17.5 4V21.5C17.5 21.8315 17.3683 22.1495 17.1339 22.3839C16.8995 22.6183 16.5815 22.75 16.25 22.75H3.75C3.41848 22.75 3.10054 22.6183 2.86612 22.3839C2.6317 22.1495 2.5 21.8315 2.5 21.5V17.75C2.5 17.4185 2.3683 17.1005 2.13388 16.8661C1.89946 16.6317 1.58152 16.5 1.25 16.5C0.918479 16.5 0.600537 16.6317 0.366117 16.8661C0.131696 17.1005 0 17.4185 0 17.75V21.5C0 22.4946 0.395088 23.4484 1.09835 24.1517C1.80161 24.8549 2.75544 25.25 3.75 25.25H16.25C17.2446 25.25 18.1984 24.8549 18.9017 24.1517C19.6049 23.4484 20 22.4946 20 21.5V4C20 3.00544 19.6049 2.05161 18.9017 1.34835C18.1984 0.645088 17.2446 0.25 16.25 0.25Z"
                            fill="#222222"/>
                    </svg>
                </div>
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
                dispatch(checkLogin(true));
                dispatch({type: 'CHECK_LOGIN', payload: true});
                dispatch({type: 'LOGIN', payload: loginData.gmail});
                window.location.href = '/dashboard/home';
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
                <div className="title-custom title-component-title">
                    Login
                </div>
                {loginStatus === false && <p className="incorrect-message">Incorrect Gmail or password.</p>}
                <InputEngine
                    typeInput='input'
                    title='Gmail'
                    type='text'
                    placeholder='Type your gmail'
                    value={gmail}
                    setValue={setGmail}
                />
                <InputEngine
                    typeInput='input'
                    title='Password'
                    type='password'
                    placeholder='Type your password'
                    value={password}
                    setValue={setPassword}
                />
            </div>
            <div className="container-login-and-register">
                <button className="button-custom login-button loading-container-engine" onClick={loginUser}>
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
        }).catch(err => {
            console.log('Send code failed:', err);
        });
    };
    return (
        <div className="register-engine">
            <div className="container-login">
                <div className="title-custom title-component-title">
                    Register
                </div>
                {registerStatus === false && <p className="incorrect-message">{registerError}</p>}
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
                        <button className="button-custom button-send-code" onClick={sendCode}>Send code</button>
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
                <button className="button-custom login-button" onClick={registerUser}>
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
            <div className="container-search component-custom">
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
            <div className="container-sort component-custom">
                <div className="sort-title">
                    Sort by
                </div>
                <div className="drop-list-img">
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 10.625L12.25 17.375L5.5 10.625" stroke="#222222" strokeWidth="2.25"
                              strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12.5" cy="12.5" r="12" stroke="#222222"/>
                    </svg>

                </div>
            </div>
        </div>
    );
}

export function SurveyEngine() {
    return (
        <div className='survey-engine'>
            <Link
                to={'/dashboard/create-trend-form'}
                className="button-custom">
                Create Survey
            </Link>
        </div>
    )
}

export function TrendTag({ tag, deleteTag }) {
    const [value, setValue] = useState(tag || 'Edit this tag');

    return (
        <div className="container-trend-tag component-custom">
            <div className="trend-tag">
                {value}
            </div>
            <button className="trend-tag-delete button-custom" onClick={() => deleteTag(value)}>
                <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M13 1.5L1 13.5ZM1 1.5L13 13.5Z" fill="#D8A353"/>
                    <path d="M13 1.5L1 13.5M1 1.5L13 13.5" stroke="#6E6E6E" strokeWidth="2" stroke-linecap="round"
                          strokeLinejoin="round"/>
                </svg>
            </button>
        </div>
    );
}

export function TrendTagAddEngine({ trendTags, setTrendTags }) {
    const [inputValue, setInputValue] = useState('');
    const deleteTag = (tagToDelete) => {
        setTrendTags(prevTags => prevTags.filter(tag => tag.key !== tagToDelete));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            const newTag = inputValue.trim();
            if (newTag.length >= 10) {
                throw new Error('Tag is too long');
            }
            if (trendTags.some(tag => tag.key === newTag)) {
                throw new Error('Tag already exists');
            }
            if (newTag) {
                setTrendTags([...trendTags, <TrendTag key={newTag} tag={newTag} deleteTag={() => deleteTag(newTag)} />]);
                setInputValue('');
            }
            e.preventDefault();
        }
    };

    return (
        <div className='trend-tag-add-engine component-custom'>
            <div className='container-trend-tag-add component-custom'>
                {trendTags.map(tag => tag)}
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    id={'input-trend-tag-add'}
                    placeholder="Type your tag"
                />
            </div>
        </div>
    );
}
export function TrendCardEngine({trend}) {
    const id = trend.id;
    const title = trend.name;
    const description = trend.description;
    const tags = trend.tags;
    const numberOfVotes = trend.numberofvotes;
    const timeCreated = new Date(trend.timecreated);

    return (
        <div className="trend-card-engine component-custom">
            <div className="container-trend-graph component-custom">
            </div>
            <div className="container-trend-title-and-id">
                <div className="trend-title title-custom">{title}</div>
                <div className="trend-id">
                    #{id}
                </div>
            </div>
            <div className="container-trend-description">
                <div className="trend-description">
                    {description}
                </div>
            </div>

            <div className="container-trend-detail">
                <div className="container-trend-detail-item">
                    <div className="trend-detail-item__title">Created</div>
                    <div className="trend-detail-item__value">{
                        timeCreated.toLocaleDateString("en-US")
                    }</div>
                </div>
                <div className="container-trend-detail-item">
                    <div className="trend-detail-item__title">Voted</div>
                    <div className="trend-detail-item__value">{numberOfVotes}</div>
                </div>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: '15px',
            }}>
                <div className="container-trend-tags">
                    {tags && tags.slice(0, 4).map(tag => <TrendTag tag={tag}/>)}
                </div>
                <div className="button-follow button-custom">
                    Follow
                </div>
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