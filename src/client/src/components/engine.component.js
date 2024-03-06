import {useEffect, useRef, useState} from "react";
import axios from "axios";
import './engine.component.scss';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {checkLogin} from "../redux/actions/status.action";
import {TrendBarGraphDemo} from "./graph.component";
import {SVGIcon} from "./global.component";
import Select, {components} from "react-select";
import {useMediaQuery} from "react-responsive";

export function InputEngine(
    {
        type,
        title,
        placeholder,
        value,
        setValue,
        typeInput,
        id,
        className,
        readOnly,
        maxLength
    }) {
    return (
        <div className={`input-engine ${className}`}>
            <div className="container-input">
                <div className="input-title title-custom">
                    {title}
                </div>
                {typeInput === 'textarea' && <textarea
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    id={id}
                    maxLength={maxLength}
                />}
                {typeInput === 'input' && <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    id={id}
                    readOnly={readOnly}
                    maxLength={maxLength}
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
                </div>
            </div>
            <Link to='/dashboard/home' className="user-status-engine__container-gmail">
                <div className="user-avatar">
                    {status.gmail.substring(0, 1).toUpperCase()}
                </div>
                <h4 className='title-custom'>{username}</h4>
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
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [gmail, setGmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogging, setIsLogging] = useState(false);


    const loginUser = async () => {
        setIsLogging(true);
        const loginData = {
            gmail: gmail,
            password: password,
        }
        axios
            .post(`${process.env.REACT_APP_SERVER_URL}/login`, loginData)
            .then(res => {
                dispatch(checkLogin(true));
                dispatch({type: 'CHECK_LOGIN', payload: true});
                dispatch({type: 'LOGIN', payload: loginData});
                navigate('/dashboard/home');
            })
            .catch(err => {
                dispatch({
                    type: 'RECEIVE_NOTIFICATION',
                    payload: {
                        status: 'error',
                        title: err.response.data.title,
                        message: err.response.data.message
                    }
                })
            })
            .finally(() => setIsLogging(false));


    };
    return (
        <div className="login-engine">
            <div className="container-login">
                <div className="title-custom title-component-title">
                    Login
                </div>
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
    const status = useSelector(state => state.status);
    const [searchValue, setSearchValue] = useState(status.search || '');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            navigate({
                pathname: `/dashboard/home`,
                search: `?q=${encodeURIComponent(searchValue)}`
            });
            dispatch({type: 'SEARCH', payload: e.target.value})
            window.location.reload();
        }
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
                    onKeyDown={handleKeyDown}
                />
            </div>
        </div>
    );
}

export function SortEngine() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const server = useSelector(state => state.server);
    const isTabletOrMobile = useMediaQuery({query: '(max-width: 600px)'});


    const [sortOrder, setSortOrder] = useState(server.dashboard.home.sortOrder);
    const [sortType, setSortType] = useState(server.dashboard.home.sortType);
    const sortOptions = [
        {value: 'id', label: 'ID'},
        {value: 'number_of_votes', label: 'Vote'},
        {value: 'name', label: 'Name'},
        {value: 'time_created', label: 'Date'},
    ];

    const handleChange = (selectedOption) => {
        setSortType(selectedOption.value);
    }
    const handleSortOrder = async (e) => {
        e.preventDefault()
        setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
    };

    useEffect(() => {
        navigate(`${window.location.pathname}?sortType=${sortType}&sortOrder=${sortOrder}`);
        dispatch({type: 'SORT_TRENDS', payload: {sortType, sortOrder}});
    }, [sortOrder, sortType]);

    const customStyles = {
        dropdownIndicator: (styles) => ({
            ...styles,
            display: isTabletOrMobile ? 'none' : 'block',
            padding: '8px',
            cursor: 'pointer'
        }),
        indicatorSeparator: (styles) => ({
            ...styles,
            display: isTabletOrMobile ? 'none' : 'block',
        }),
        input: (styles) => ({
            ...styles,
            padding: '8px',
            height: '100%',
            width: 'fit-content',
        }),
        control: (provided, state) => ({
            ...provided,
            borderRadius: '10px',
            fontFamily: 'DM Sans',
            backgroundColor: '#E9E9E9',
            width: 'fit-content',

            padding: '5px',
            border: state.isFocused ? '3px solid #6946CB' : '3px solid #E9E9E9',
            boxShadow: 'none',
            '&:hover': {},
        }),
        option: (provided, state) => ({
            ...provided,
            fontFamily: 'DM Sans',
            backgroundColor: state.isFocused ? '#6946CB' : 'transparent',
            color: state.isFocused ? '#ffffff' : '#222222',
        }),
        menu: (provided, state) => ({
            ...provided,
            borderRadius: '10px',
            fontFamily: 'DM Sans',
            marginTop: 0,
            backgroundColor: '#E9E9E9',

        }),
        menuList: (provided, state) => ({
            ...provided,

        }),


    }
    return (
        <div className="sort-engine">
            <Select
                defaultValue={sortOptions.find(option => option.value === sortType)}
                options={sortOptions}
                onChange={handleChange}
                className='trend-graph__select'
                styles={customStyles}
            />
            <button
                className="sort-engine_button--type button-custom"
                onClick={handleSortOrder}
            >
                {sortOrder === 'asc' ?
                    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M7.29289 16.7071C7.68342 17.0976 8.31658 17.0976 8.70711 16.7071L15.0711 10.3431C15.4616 9.95262 15.4616 9.31946 15.0711 8.92893C14.6805 8.53841 14.0474 8.53841 13.6569 8.92893L8 14.5858L2.34315 8.92893C1.95262 8.53841 1.31946 8.53841 0.928932 8.92893C0.538408 9.31946 0.538408 9.95262 0.928932 10.3431L7.29289 16.7071ZM9 1C9 0.447715 8.55228 6.58593e-09 8 0C7.44772 -6.58593e-09 7 0.447715 7 1L9 1ZM9 16L9 1L7 1L7 16L9 16Z"
                            fill="#222222"/>
                    </svg>
                    : <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM7 16C7 16.5523 7.44772 17 8 17C8.55228 17 9 16.5523 9 16H7ZM7 1L7 16H9L9 1L7 1Z"
                            fill="#222222"/>
                    </svg>
                }
            </button>
        </div>
    );
}

export function SurveyEngine() {
    return (
        <div className='survey-engine'>
            <Link
                to={'/dashboard/create-trend-form'}
                className="button-custom"
            >
                Create Survey
            </Link>
        </div>
    )
}

export function TagEngine({tag, deleteFunction, className}) {
    return (
        <div className={`container-tag-engine component-custom ${className}`}>
            <div className="tag">
                {tag}
            </div>
            <button className="tag-delete button-custom" onClick={deleteFunction}>
                <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M13 1.5L1 13.5ZM1 1.5L13 13.5Z" fill="#D8A353"/>
                    <path d="M13 1.5L1 13.5M1 1.5L13 13.5" stroke="#6E6E6E" strokeWidth="2" strokeLinecap="round"
                          strokeLinejoin="round"/>
                </svg>
            </button>
        </div>

    )
}

export function TrendTagAddEngine({
                                      trendTags, setTrendTags
                                  }) {
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
                setTrendTags([...trendTags, <TagEngine
                    key={newTag}
                    tag={newTag}
                    deleteFunction={() => deleteTag(newTag)}/>]);
                setInputValue('');
            }
            e.preventDefault();
        }
    };

    return (
        <div className='tag-add-engine'>
            <div className='container-tag-add component-custom'>
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

// VOTE ENGINE
export function ElectionBallotEngine({
                                        trend,
                                         ballot,
                                         isVoted = false,
                                         typeInput = 'checkbox',
                                     }) {
    const [isChecked, setIsChecked] = useState(isVoted);
    const [numberOfVotes, setNumberOfVotes] = useState(ballot.numberOfVotes);
    const [name, setName] = useState(ballot.name);
    const status = useSelector(state => state.status);
    const handleCheck = async () => {
        setIsChecked(!isChecked);
        axios.post(`${process.env.REACT_APP_SERVER_URL}/trend/${ballot.trendId}/vote`, {
            isVoted: !isChecked
        }, {
            params: {
                gmail: status.gmail,
                electionBallotId: ballot.id
            }
        })
            .then(res => {
                setNumberOfVotes(res.data.electionBallot.numberOfVotes);
            })
            .catch()
            .finally()
    };
    return (
        <div className="election-ballot-engine custom-component">
            <div className="container-election-ballot__header">
                <input type={typeInput}
                       className="election-ballot"
                       onChange={handleCheck}
                       checked={isChecked}
                       name={trend.id}
                />
                <div className="title-custom">{name}</div>
            </div>
            <div className="container-election-ballot__footer">
                <div className="election-ballot__footer-item">
                    <div className="election-ballot__footer-item__icon">
                        <svg width="15" height="17" viewBox="0 0 15 17" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M14.4763 6.96402C14.2655 6.69414 14.0018 6.47689 13.7037 6.3276C13.4056 6.17831 13.0804 6.10062 12.7511 6.10002H9.33081L9.75085 4.95603C9.92556 4.45513 9.98375 3.91651 9.92041 3.38637C9.85707 2.85622 9.67411 2.35037 9.38721 1.91222C9.1003 1.47406 8.71803 1.11667 8.27317 0.870709C7.82832 0.624747 7.33416 0.497552 6.83309 0.500036C6.68881 0.500357 6.54768 0.545056 6.42661 0.628774C6.30555 0.712491 6.20969 0.831675 6.15053 0.972035L4.01285 6.10002H2.2502C1.65341 6.10002 1.08106 6.35288 0.659067 6.80297C0.237074 7.25305 0 7.8635 0 8.50002V14.1C0 14.7365 0.237074 15.347 0.659067 15.7971C1.08106 16.2471 1.65341 16.5 2.2502 16.5H11.7985C12.3249 16.4998 12.8346 16.3028 13.2389 15.9432C13.6432 15.5836 13.9165 15.0843 14.0112 14.532L14.9638 8.93202C15.0227 8.58592 15.0096 8.23024 14.9253 7.89016C14.8411 7.55008 14.6878 7.2339 14.4763 6.96402ZM3.75033 14.9H2.2502C2.05127 14.9 1.86048 14.8157 1.71982 14.6657C1.57916 14.5157 1.50013 14.3122 1.50013 14.1V8.50002C1.50013 8.28785 1.57916 8.08436 1.71982 7.93433C1.86048 7.78431 2.05127 7.70002 2.2502 7.70002H3.75033V14.9ZM13.5012 8.64402L12.5486 14.244C12.5166 14.4304 12.4237 14.5986 12.2864 14.7187C12.149 14.8389 11.9761 14.9031 11.7985 14.9H5.25046V7.06802L7.29063 2.17203C7.50064 2.23733 7.69567 2.34836 7.86343 2.4981C8.03118 2.64784 8.168 2.83304 8.26527 3.04202C8.36253 3.251 8.41812 3.47922 8.42852 3.71227C8.43893 3.94532 8.40393 4.17813 8.32572 4.39603L7.92819 5.54002C7.84348 5.78183 7.81488 6.0419 7.84484 6.29805C7.87479 6.55419 7.96241 6.79881 8.1002 7.01101C8.238 7.22322 8.42189 7.39671 8.63618 7.51669C8.85047 7.63667 9.08879 7.69957 9.33081 7.70002H12.7511C12.8613 7.69983 12.9702 7.72554 13.07 7.77531C13.1698 7.82509 13.2581 7.89771 13.3287 7.98802C13.4009 8.07708 13.4538 8.18205 13.4837 8.29545C13.5135 8.40885 13.5195 8.52787 13.5012 8.64402Z"
                                fill="#222222"/>
                        </svg>
                    </div>
                    <div className="election-ballot__footer-item__value">{numberOfVotes} votes</div>
                </div>
            </div>
        </div>
    )
}

export function ElectionBallotAddEngine({
                                            votes, setVotes
                                        }) {
    const [inputValue, setInputValue] = useState('');
    const deleteElectionBallot = (voteToDelete) => {
        setVotes(prevVote => prevVote.filter(vote => vote.key !== voteToDelete));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            const newVote = inputValue.trim();
            if (newVote.length >= 30) {
                throw new Error('Vote is too long');
            }
            if (votes.some(tag => tag.key === newVote)) {
                throw new Error('Vote already exists');
            }
            if (newVote) {
                setVotes([...votes,
                    <TagEngine
                        key={newVote}
                        tag={newVote}
                        deleteFunction={() => deleteElectionBallot(newVote)}
                    />]);
                setInputValue('');
            }
            e.preventDefault();
        }
    };

    return (
        <div className='tag-add-engine election-ballot-add-engine'>
            <div className='container-tag-add component-custom'>
                {votes.map(vote => vote)}
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    id={'input-vote-tag-add'}
                    placeholder="Add your election ballot"
                />
            </div>
        </div>
    );
}

export function TrendCardEngine({trend}) {
    const id = trend.id;
    const title = trend.name;
    const description = trend.description;
    const numberOfVotes = trend.numberOfVotes;
    const timeCreated = new Date(trend.timeCreated);
    const shortDescription = trend.shortDescription;

    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/trend/' + id, {state: {id}});
    }
    return (
        <div className="trend-card-engine component-custom" onClick={handleClick}>
            <div className="container-trend-graph component-custom">
                <TrendBarGraphDemo trend={trend}/>
            </div>
            <div className="container-trend-title-and-id">
                <div className="trend-title title-custom">{title}</div>
                <div className="trend-id">
                    #{id}
                </div>
            </div>
            <div className="container-trend-description">
                <div className="trend-description">
                    {shortDescription}
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
            <div className="button-follow button-custom">
                Show
            </div>
        </div>
    );

}


export function LoadingEngine({
                                  loading
                              }) {
    if (!loading) {
        return null;
    }
    return (
        <div className="loading-engine">
        </div>
    )
}
