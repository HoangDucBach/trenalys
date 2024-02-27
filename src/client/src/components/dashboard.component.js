import './dashboard.component.scss';
import {
    InputEngine,
    SearchEngine,
    SortEngine,
    SurveyEngine,
    TrendCardEngine,
    TrendTag,
    TrendTagAdd, TrendTagAddEngine
} from "./engine.component";
import axios from "axios";
import {useEffect, useState} from "react";
import RequireAuth from "./require.component";
import {CustomComponent} from "./component.component";
export function DashboardComponent({children}) {
    return (
        <RequireAuth>
            <div className="dashboard">
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
            <div className="container-menu">
                <div className="container-menu-item">
                    <div className="menu-item-img">
                        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M6.98398 19.0233V15.9656C6.98398 15.1851 7.65492 14.5523 8.48256 14.5523H11.508C11.9055 14.5523 12.2866 14.7012 12.5677 14.9662C12.8487 15.2313 13.0066 15.5908 13.0066 15.9656V19.0233C13.0041 19.3478 13.139 19.6599 13.3814 19.8902C13.6239 20.1205 13.9537 20.25 14.2978 20.25H16.3619C17.3259 20.2523 18.2513 19.8928 18.9339 19.2508C19.6164 18.6088 20 17.737 20 16.8278V8.11685C20 7.38246 19.6548 6.68584 19.0575 6.21467L12.0358 0.925869C10.8144 -0.00143817 9.06433 0.0285022 7.87936 0.996979L1.01791 6.21467C0.392359 6.67195 0.0184761 7.37063 0 8.11685V16.8189C0 18.7138 1.62882 20.25 3.63808 20.25H5.65504C6.36971 20.25 6.95052 19.7062 6.9557 19.0322L6.98398 19.0233Z"
                                fill="#222222"/>
                        </svg>
                    </div>
                </div>

                <div className="container-menu-item">
                    <div className="menu-item-img">
                        <svg width="20" height="26" viewBox="0 0 20 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7.31058 17.1873C9.11017 17.0423 10.918 17.0423 12.7176 17.1873C13.6976 17.2444 14.6729 17.367 15.6374 17.5543C17.7245 17.9769 19.0871 18.6664 19.6711 19.7785C20.1096 20.6464 20.1096 21.6797 19.6711 22.5476C19.0871 23.6597 17.7786 24.3937 15.6158 24.7718C14.652 24.9661 13.6765 25.0925 12.696 25.1499C11.7876 25.25 10.8792 25.25 9.96003 25.25H8.30547C7.95942 25.2055 7.62419 25.1833 7.29977 25.1833C6.31922 25.1328 5.34346 25.0102 4.37997 24.8163C2.29285 24.4159 0.930279 23.7042 0.346319 22.5921C0.120889 22.1613 0.0020426 21.68 0.000130272 21.1908C-0.00443039 20.6986 0.110822 20.2131 0.335505 19.7785C0.90865 18.6664 2.27122 17.9435 4.37997 17.5543C5.3477 17.3643 6.3268 17.2417 7.31058 17.1873ZM10.0033 0.25C13.6286 0.25 16.5674 3.27228 16.5674 7.00045C16.5674 10.7286 13.6286 13.7509 10.0033 13.7509C6.37801 13.7509 3.43914 10.7286 3.43914 7.00045C3.43914 3.27228 6.37801 0.25 10.0033 0.25Z"
                                fill="#222222"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function DashboardHomeMain() {
    const [trends, setTrends] = useState([]);

    useEffect(() => {
        async function getTrends() {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/dashboard/home/get-trends`);
                console.log('data:', response.data.data);
                setTrends(response.data.data);
            } catch (error) {
                console.error('Error fetching trends:', error);
            }
        }

        getTrends().then(res => console.log('trends:', trends));
    }, []);
    return (
        <div className="dashboard-home-main">
            <div className="container-trend-card-engine">
                {trends && trends.map(trend => {
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



export function DashboardHomeComponent({children}) {
    return (
        <DashboardComponent>
            <DashboardHeaderTop title={"Home"} menuEngine={true}/>
            <DashboardHomeMain/>
        </DashboardComponent>
    );
}

export function DashboardCreateTrendFormMain() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [trendTags, setTrendTags] = useState([]);
    const [newTag, setNewTag] = useState('');
    const handleAddTag = (e) => {
        e.preventDefault();
        if (trendTags.length >= 4) return;
        setTrendTags([...trendTags, [<TrendTag tag={'Edit new tag'} isDemo={true}/>]]);
    };
    const handleShortDescriptionChange = (e) => {
        const inputValue = e.target.value;
        if (inputValue.length <= 150) {
            setShortDescription(inputValue);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            trendTitle: title,
            trendDescription: description,
            trendTimeCreated: new Date().toISOString(),
            trendTags: trendTags.map(tag => tag[0].props.tag),
        };

        try {
            const postUrl = `${process.env.REACT_APP_SERVER_URL}/dashboard/home/create-trend-form`;
            const response = await axios.post(postUrl, formData);
            console.log('Form submitted successfully:', response.data);
            await window.location.reload();
        } catch (error) {
            console.error('Error submitting form:', error.message);
        }
    }
    useEffect(() => {
        console.log('trendTags:', trendTags);
    }, [trendTags]);
    return (
        <div className="dashboard-create-trend-form-main">
            <form
                className="container-create-trend-form"
                onSubmit={handleSubmit}
            >
                <CustomComponent
                    title='Detail'
                    description='Create a trend to survey opinions'
                    svg={
                        <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect y="0.5" width="25" height="25" rx="5" fill="#222222"/>
                            <circle cx="12.5" cy="8" r="2.5" fill="#FDFDFD"/>
                            <rect x="10" y="11.5" width="5" height="10" rx="2.5" fill="#FDFDFD"/>
                        </svg>
                    }
                >
                    <InputEngine
                        typeInput={'input'}
                        title='Title'
                        placeholder='Type your trend title'
                        type='text'
                        id='create-trend-form__input--title'
                        value={title}
                        setValue={setTitle}
                    />
                    <InputEngine
                        typeInput={'textarea'}
                        title='Short description'
                        placeholder='Type your short description ( max 10 characters )'
                        type='text'
                        id='create-trend-form__input--title'
                        value={shortDescription}
                        setValue={setShortDescription}
                    />
                    <InputEngine
                        typeInput={'textarea'}
                        title='Description'
                        placeholder='Type your description'
                        type='text'
                        id='create-trend-form__input--description'
                        value={description}
                        setValue={setDescription}
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
                <div className="container-create-trend-form__button">
                    <button className="button-custom" id='create-trend-form__button--cancel'>Cancel</button>
                    <button type='submit' className="button-custom" id='create-trend-form__button--create'>Create
                    </button>
                </div>
            </form>
        </div>
    );
}

export function DashboardCreateTrendFormComponent() {
    return (
        <DashboardComponent>
            <DashboardHeaderTop title={"Create Trend Form"} menuEngine={false}/>
            <DashboardCreateTrendFormMain/>
        </DashboardComponent>
    );
}