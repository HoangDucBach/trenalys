import './dashboard.component.scss';
import {
    InputEngine,
    SearchEngine,
    SortEngine,
    SurveyEngine,
    TrendCardEngine,
    TrendTagAddEngine, ElectionBallotAddEngine, ElectionBallotEngine
} from "./engine.component";
import axios from "axios";
import {useEffect, useState} from "react";
import RequireAuth from "./require.component";
import {CustomComponent, CustomForm, CustomHeader} from "./component.component";
import {Link, NavLink, useLocation, useNavigate} from "react-router-dom";
import {SVGIcon} from "./global.component";
import {StatusGraphComponent, TrendGraph} from "./graph.component";
import Select from "react-select";
import {useDispatch, useSelector} from "react-redux";

/*
* This is the main dashboard that will be used to wrap order child dashboard.
* -- DashboardComponent
* -- DashboardHeaderTop
* -- DashboardHeaderLeft
* -- DashboardHomeMain
*
* -- DashboardHomeComponent
* -- DashboardCreateTrendFormMain
*
* -- DashboardCreateTrendFormComponent
* -- DashboardTrendMain
* -- DashboardTrendComponent
*
* -- DashboardTrendGraphMain
* -- DashboardTrendGraphComponent
*
* -- DashboardTrendElectionBallotMain
* -- DashboardTrendElectionBallotComponent
*
* -- DashboardTrendElectionBallotAddMain
* -- DashboardTrendElectionBallotAddComponent
*
* -- DashboardTrendElectionBallotVoteMain
* -- DashboardTrendElectionBallotVoteComponent
*
 */
export function DashboardComponent({children, className}) {
    return (
        <RequireAuth>
            <div className={`dashboard ${className}`}>
                <DashboardHeaderLeft/>
                <div className="dashboard-main">
                    {children}
                </div>
            </div>
        </RequireAuth>
    );
}

export function DashboardHeaderTop({title, menuEngine = true}) {
    return (
        <div className="dashboard-header-top">
            <div className="dashboard-title title-custom">
                {title}
            </div>
            {menuEngine && <div className="container-dashboard-engine">
                <SearchEngine/>
                <SortEngine/>
                <SurveyEngine/>
            </div>}
        </div>
    );
}

export function DashboardHeaderLeft() {
    return (
        <div className="dashboard-header-left">
            <div className="dashboard-header-left__menu">
                <div className="dashboard-header-left__menu-item">
                    <div className="dashboard-header-left__menu-item-icon">
                        <NavLink to="/dashboard/home" activeClassName="active">
                            <SVGIcon icon='home' backgroundColor='transparent' color='#222222'/>
                        </NavLink>
                    </div>
                </div>

                <div className="dashboard-header-left__menu-item">
                    <div className="dashboard-header-left__menu-item-icon">
                        <NavLink to="/profile" activeClassName="active">
                            <SVGIcon icon='profile' backgroundColor='transparent' color='#222222'/>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function DashboardHomeMain() {
    const server = useSelector(state => state.server);
    const [trends, setTrends] = useState([]);

    const sortType = server.dashboard.home.sortType;
    const sortOrder = server.dashboard.home.sortOrder;

    useEffect(() => {
        async function getTrends() {
            if (!sortOrder || !sortType) return;
            await axios
                .get(`${process.env.REACT_APP_SERVER_URL}/dashboard/home/get-trends`,
                    {
                        params: {
                            sortType: server.dashboard.home.sortType,
                            sortOrder: server.dashboard.home.sortOrder
                        }
                    }
                ).then(res => {
                    setTrends(res.data.data);
                }).catch(err => {
                    console.error('err:', err);
                })
            ;
        }

        getTrends().then();
    }, [sortOrder, sortType]);
    return (
        <div className="dashboard-home-main">
            <div className="container-trend-card-engine">
                {
                    trends && trends.map(trend => {
                        return (
                            <TrendCardEngine
                                trend={trend}
                            />
                        );
                    })
                }
            </div>
        </div>
    );

}


export function DashboardHomeComponent() {
    return (
        <DashboardComponent>
            <DashboardHeaderTop title={"Home"} menuEngine={true}/>
            <DashboardHomeMain/>
        </DashboardComponent>
    );
}

export function DashboardCreateTrendFormMain() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [trendTags, setTrendTags] = useState([]);
    const [electionBallots, setElectionBallots] = useState([]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            trendName: title,
            trendDescription: description,
            trendTimeCreated: new Date().toISOString(),
            trendTags: trendTags.map(tag => tag.props.tag),
            trendElectionBallots: electionBallots.map(ballot => ballot.props.tag),
            trendShortDescription: shortDescription
        };

        await axios.post(`${process.env.REACT_APP_SERVER_URL}/dashboard/create-trend-form`, formData)
            .then(res => {
                dispatch({
                    type: 'RECEIVE_NOTIFICATION', payload: {
                        status: 'success',
                        title: res.data.title,
                        message: res.data.message
                    }
                })
                setTimeout(() => {
                    navigate('/dashboard/home');
                }, 3000);
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
                console.error('err:', err);
            });
    }
    return (
        <div className="dashboard-create-trend-form-main">
            <CustomForm
                className="create-trend-form"
                onSubmit={handleSubmit}
            >
                <CustomComponent
                    title='Detail'
                    description='Create a trend to survey opinions'
                    svg={
                        <SVGIcon
                            icon={'detail'}
                            backgroundColor='#222222'
                            color='#ffffff'
                        />
                    }
                >
                    <InputEngine
                        typeInput={'input'}
                        title='Title'
                        placeholder='Max 20 characters'
                        type='text'
                        id='create-trend-form__input--title'
                        value={title}
                        setValue={setTitle}
                        maxLength={20}
                    />
                    <InputEngine
                        typeInput={'textarea'}
                        title='Short description'
                        placeholder='Max 85 characters'
                        type='text'
                        id='create-trend-form__input--short-description'
                        value={shortDescription}
                        setValue={setShortDescription}
                        maxLength={85}
                    />
                    <InputEngine
                        typeInput={'textarea'}
                        title='Description'
                        placeholder='Type your description'
                        type='text'
                        id='create-trend-form__input--description'
                        value={description}
                        setValue={setDescription}
                        maxLength={85}
                    />
                </CustomComponent>
                <CustomComponent
                    title='Tags'
                    description='Add tags so people can search easier'
                    svg={
                        <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="1" width="24" height="24" rx="4.5" fill="#222222" stroke="white"/>
                            <path
                                d="M4.75001 13.5003C4.74936 13.6317 4.77458 13.7619 4.82425 13.8835C4.87402 14.0053 4.94735 14.1162 5.04005 14.2096L5.04087 14.2104L11.3567 20.5188L11.5334 20.3419L11.3567 20.5188C11.8255 20.987 12.461 21.25 13.1236 21.25C13.786 21.25 14.4214 20.9871 14.8901 20.5191C14.8902 20.519 14.8903 20.5189 14.8905 20.5188L19.518 15.9288L19.5188 15.928C19.987 15.4592 20.25 14.8237 20.25 14.1611C20.25 13.5281 20.01 12.9198 19.5803 12.458L12.501 6.00001V5.75001H12.5003H5.75011C5.48487 5.75001 5.23049 5.85538 5.04293 6.04293C4.85538 6.23049 4.75001 6.48487 4.75001 6.75011V13.5003ZM4.75001 13.5003C4.75001 13.5001 4.75002 13.4998 4.75002 13.4996L5.00001 13.501M4.75001 13.5003V13.501H5.00001M5.00001 13.501C4.99944 13.5997 5.01836 13.6976 5.05569 13.789C5.09302 13.8804 5.14802 13.9635 5.21754 14.0336L5.00001 13.501ZM18.2518 14.1221L18.2518 14.1225C18.2512 14.2535 18.1993 14.3791 18.1071 14.4722C18.107 14.4723 18.1069 14.4725 18.1068 14.4726L13.4724 19.0995C13.4723 19.0995 13.4722 19.0996 13.4721 19.0997C13.3785 19.1927 13.2518 19.2449 13.1198 19.2449C12.9878 19.2449 12.8612 19.1927 12.7675 19.0997C12.7674 19.0996 12.7673 19.0995 12.7673 19.0995L6.75021 13.0898V7.75021H12.0899L18.1068 13.7671C18.1069 13.7672 18.107 13.7673 18.1071 13.7674C18.1533 13.8141 18.1898 13.8694 18.2147 13.9301C18.2396 13.9911 18.2522 14.0563 18.2518 14.1221ZM10.4082 10.0922C10.1362 10.0922 9.87037 10.1728 9.64423 10.324C9.41809 10.4751 9.24183 10.6898 9.13775 10.9411C9.03367 11.1924 9.00644 11.4689 9.0595 11.7356C9.11256 12.0024 9.24353 12.2474 9.43585 12.4397C9.62816 12.632 9.87319 12.763 10.1399 12.8161C10.4067 12.8691 10.6832 12.8419 10.9345 12.7378C11.1857 12.6337 11.4005 12.4575 11.5516 12.2313C11.7027 12.0052 11.7834 11.7393 11.7834 11.4673C11.7834 11.1026 11.6385 10.7529 11.3806 10.495C11.1227 10.2371 10.7729 10.0922 10.4082 10.0922Z"
                                fill="white" stroke="white" strokeWidth="0.5" strokeLinejoin="round"/>
                        </svg>
                    }
                >
                    <TrendTagAddEngine trendTags={trendTags} setTrendTags={setTrendTags}/>
                </CustomComponent>
                <CustomComponent
                    title='Election Ballot'
                    description='Add election ballot for survey'
                    svg={
                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="25" height="25" rx="5" fill="#222222"/>
                            <path
                                d="M11.8322 3.75004C11.6363 3.75054 11.4461 3.81133 11.2844 3.92315C11.1228 4.03489 10.9971 4.19236 10.9202 4.37494L10.9198 4.37584L8.84621 9.35002H7.2502C6.58171 9.35002 5.94414 9.6334 5.47669 10.132C5.00975 10.63 4.75 11.3022 4.75 12V17.6C4.75 18.2978 5.00975 18.97 5.47669 19.4681C5.94414 19.9666 6.58171 20.25 7.2502 20.25H16.7985H16.7986C17.3881 20.2498 17.9564 20.029 18.405 19.63C18.8533 19.2313 19.1536 18.6803 19.2576 18.0743L19.2577 18.0739L20.2103 12.474C20.2103 12.474 20.2103 12.474 20.2103 12.4739C20.2749 12.094 20.2605 11.7036 20.168 11.33C20.0755 10.9566 19.9069 10.6083 19.6732 10.31C19.4403 10.0118 19.1478 9.77041 18.8156 9.60407C18.4834 9.43766 18.1201 9.3507 17.7516 9.35002H17.7511H14.6889L14.9855 8.54219L14.9856 8.5422L14.9869 8.53836C15.1742 8.00131 15.2365 7.42437 15.1686 6.85671C15.1008 6.28903 14.9048 5.74634 14.5964 5.27526C14.2879 4.80413 13.8757 4.41819 13.3941 4.15192C12.9126 3.88565 12.3765 3.7474 11.8322 3.75004ZM11.8322 3.75004C11.8323 3.75004 11.8324 3.75004 11.8325 3.75004L11.8331 4.00004L11.8319 3.75004C11.832 3.75004 11.8321 3.75004 11.8322 3.75004ZM16.8029 18.15L16.8029 18.15H16.7985H10.5005V10.618L12.426 5.99714C12.5225 6.04733 12.6135 6.11015 12.6969 6.1846C12.8387 6.31113 12.9553 6.46856 13.0386 6.64751C13.1219 6.8265 13.1698 7.02262 13.1788 7.22342C13.1877 7.42422 13.1575 7.62455 13.0904 7.81157L13.0896 7.81397L12.6922 8.95737C12.6922 8.95749 12.6922 8.95761 12.6921 8.95774C12.5949 9.23549 12.5622 9.53364 12.5965 9.82708C12.6309 10.1207 12.7314 10.4021 12.8905 10.6472C13.0497 10.8923 13.2633 11.0944 13.514 11.2348C13.7649 11.3753 14.0451 11.4495 14.3303 11.45H14.3308L17.7511 11.45L17.7515 11.45C17.8224 11.4499 17.893 11.4664 17.9584 11.499C18.024 11.5317 18.0834 11.5801 18.1316 11.6419L18.1316 11.6419L18.1345 11.6455C18.1839 11.7064 18.2209 11.7792 18.2419 11.859C18.2628 11.9385 18.2671 12.0221 18.2544 12.1038L17.3022 17.7018C17.2796 17.8337 17.2142 17.9497 17.1218 18.0305C17.0297 18.1111 16.9166 18.152 16.8029 18.15ZM8.50033 18.15H7.2502C7.12296 18.15 6.9974 18.0962 6.9022 17.9947C6.80648 17.8926 6.75013 17.7509 6.75013 17.6V12C6.75013 11.8491 6.80648 11.7074 6.9022 11.6053C6.9974 11.5038 7.12296 11.45 7.2502 11.45H8.50033V18.15Z"
                                fill="#FFFBF3" stroke="#FFFBF3" strokeWidth="0.5"/>
                        </svg>

                    }
                >
                    <ElectionBallotAddEngine votes={electionBallots} setVotes={setElectionBallots}/>
                    <div className="container-create-trend-form__warning">
                        <p>Please ensure that this survey is for reference only, the analysis provided is based on user
                            participation and is objective.</p>
                    </div>
                </CustomComponent>
                <div className="container-create-trend-form__button">
                    <Link to={'/dashboard/home'} className="button-custom"
                          id='create-trend-form__button--cancel'>Cancel</Link>
                    <button type='submit' className="button-custom" id='create-trend-form__button--create'>Create
                    </button>
                </div>
            </CustomForm>
        </div>
    );
}

export function DashboardCreateTrendFormComponent() {
    return (
        <DashboardComponent className={'dashboard-create-trend-form'}>
            <DashboardHeaderTop title={"Create Trend Form"} menuEngine={false}/>
            <DashboardCreateTrendFormMain/>
        </DashboardComponent>
    );
}

function DashboardTrendMain() {
    const [trend, setTrend] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const {id} = useLocation().state;

    const status = useSelector(state => state.status);
    // GRAPH
    const [selectedGraph, setSelectedGraph] = useState('bar');
    const graphOptions = [
        {value: 'bar', label: 'Bar'},
        {value: 'pie', label: 'Pie'}
    ]
    const graphOptionSelectStyle = {
        control: (provided, state) => ({
            ...provided,
            borderRadius: '10px',
            backgroundColor: '#E9E9E9',
            fontFamily: 'DM Sans',

            padding: '5px',
            border: state.isFocused ? '3px solid #6946CB' : '3px solid #E9E9E9',
            boxShadow: 'none',
            '&:hover': {},
        }),
        option: (provided, state) => ({
            ...provided,
            fontFamily: 'DM Sans',
            backgroundColor: state.isFocused ? '#6946CB' : '#E9E9E9',
            color: state.isFocused ? '#ffffff' : '#222222',
        }),
        menu: (provided, state) => ({
            ...provided,
            borderRadius: '10px',
            backgroundColor: '#E9E9E9',
            fontFamily: 'DM Sans',
        }),
        menuList: (provided, state) => ({
            ...provided,
        }),

    };
    const handleChangeSelectedGraph = (e) => {
        setSelectedGraph(e.value);

    }
    useEffect(() => {
    }, [selectedGraph]);
    useEffect(() => {
        async function getTrend() {
            await axios.get(`${process.env.REACT_APP_SERVER_URL}/trend/${id}`,
                {
                    params: {
                        gmail: status.gmail,
                    }
                }).then(res => {
                setTrend(res.data.trend);
            }).catch(err => {
                console.error(err);
            });
        }

        getTrend().then(() => setIsLoading(false));
    }, []);
    if (isLoading) return (
        <div className="dashboard-trend-main">
            <div className="container-trend__header">
                <div className="container-trend-title-and-id">
                    <h1 className="title-custom">Loading...</h1>
                </div>
            </div>
        </div>);
    return (
        <div className="dashboard-trend-main">
            <div className="dashboard-trend-main__header">
                <div className="dashboard-trend-main__header__container-title-id">
                    <h1 className="title-custom">{trend.name}</h1>
                    <div className="dashboard-trend-main__header__id">
                        #{trend.id}
                    </div>
                </div>
                <button className="button-custom">Follow</button>
            </div>
            <div className="dashboard-trend-main__main">
                <div className="container-trend-main__main__headline">
                    <div className="dashboard-trend-main__main__headline-tags">
                        {
                            trend.tags.map(tag => <div className="tag button-custom">{tag}</div>)
                        }
                    </div>
                    <div className="dashboard-trend-main__main__headline-statistics">
                        <div className="dashboard-trend-main__main__headline-statistics--item">
                            <SVGIcon
                                icon={'vote'}
                                backgroundColor='transparent'
                                color='#222222'
                            />
                            <div className="dashboard-trend-main__main__headline-statistics--item-value">
                                {trend.numberOfVotes} votes
                            </div>
                        </div>
                    </div>
                </div>
                <CustomComponent
                    title='Detail'
                    svg={<SVGIcon icon={'detail'}/>}
                    className='dashboard-trend-main__detail'
                >
                    <div className="dashboard-trend-main__description">
                        {trend.description}
                    </div>
                </CustomComponent>
                <CustomComponent
                    title='Graph'
                    svg={<SVGIcon icon={'graph'}/>}
                    className='dashboard-trend-main__graph'
                >
                    <CustomHeader className='dashboard-trend-main__graph-header'>
                        <StatusGraphComponent trend={trend} typeGraph={selectedGraph}/>
                        <Select
                            defaultValue={graphOptions[0]}
                            options={graphOptions}
                            onChange={handleChangeSelectedGraph}
                            className='dashboard-trend-main__graph-select'
                            styles={graphOptionSelectStyle}
                        />
                    </CustomHeader>
                    <TrendGraph trend={trend} type={selectedGraph} className='dashboard-trend-main__graph-content'/>
                </CustomComponent>
                <CustomComponent
                    title='Election Ballots'
                    svg={<SVGIcon icon={'election_ballot'}/>}
                    className='dashboard-trend-main__election-ballots'
                >
                    {
                        trend.electionBallots.map(ballot => (
                            <ElectionBallotEngine
                                trend={trend}
                                ballot={ballot} isVoted={ballot.isVoted}
                                className='dashboard-trend-main__election-ballot'
                                typeInput={'checkbox'}
                            />))
                    }
                </CustomComponent>
            </div>
        </div>
    );
}

export function DashboardTrendComponent({className}) {
    return (
        <DashboardComponent className={`dashboard-trend-component ${className}`}>
            <DashboardTrendMain/>
        </DashboardComponent>
    );
}

function DashboardProfileMain() {
    const status = useSelector(state => state.status);
    const dispatch = useDispatch();

    const [gmail, setGmail] = useState(status.gmail);
    const [password, setPassword] = useState(status.password);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            gmail,
            password
        };
        const postUrl = `${process.env.REACT_APP_SERVER_URL}/profile/change`;
        await axios.post(postUrl, formData)
            .then(res => {
                dispatch({
                    type: 'RECEIVE_NOTIFICATION', payload: {
                        status: 'success',
                        title: res.data.title,
                        message: res.data.message
                    }
                });
                dispatch({
                    type: 'LOGIN',
                    payload: formData
                });
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
            });
    }
    return (
        <div className="dashboard-profile-main">
            <CustomForm
                className='dashboard-profile'
                onSubmit={handleSubmit}
            >
                <CustomComponent className='background-profile'>
                    <div className="background-profile__title">
                        {status.gmail.substring(0, 1).toUpperCase()}
                    </div>
                </CustomComponent>
                <InputEngine
                    typeInput={'input'}
                    title='Gmail'
                    placeholder='Type your username'
                    type='text'
                    value={gmail}
                    setValue={setGmail}
                    readOnly={true}
                />
                <InputEngine
                    typeInput={'input'}
                    title='Password'
                    placeholder='Type your username'
                    type='text'
                    value={password}
                    setValue={setPassword}
                />
                <button className="button-custom">Save</button>
            </CustomForm>
        </div>
    )
}

export function DashboardProfileComponent() {
    return (
        <DashboardComponent className={`dashboard-profile`}>
            <DashboardHeaderTop title={"Profile"} menuEngine={false}/>
            <DashboardProfileMain/>
        </DashboardComponent>
    );
}
