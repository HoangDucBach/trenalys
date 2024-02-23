import {HeaderLeft} from "./header.component";
import './dashboard.component.scss';
import {Bar} from "react-chartjs-2";
import {SearchEngine, SortEngine, SurveyEngine, TrendCardEngine} from "./engine.component";
import axios from "axios";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import RequireLoginComponent from "./require.component";

export function DashboardHeaderTop({title}) {
    return (
        <div className="dashboard-header-top">
            <div className="dashboard-title">
                {title}
            </div>
            <div className="container-dashboard-engine">
                <SearchEngine/>
                <SortEngine/>
                <SurveyEngine/>
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
                <TrendCardEngine
                    trend={{
                        id: 12345,
                        name: "Trend Title",
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
                        numberOfVotes: 0,
                        timeCreated: "2021-08-21",
                        trendTags: [
                            'tag1',
                            'tag2',
                            'tag3',
                            'tag456'
                        ]
                    }}
                />
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

export function DashboardComponent({children}) {
    return (
        <RequireLoginComponent>
            <div className="dashboard">
                <HeaderLeft/>
                <div className="dashboard-main">
                    {children}
                </div>
            </div>
        </RequireLoginComponent>
    );
}

export function DashboardHomeComponent() {
    return (
        <DashboardComponent>
            <DashboardHeaderTop title={"Home"}/>
            <DashboardHomeMain/>
        </DashboardComponent>
    );
}