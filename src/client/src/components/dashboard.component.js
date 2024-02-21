import {HeaderLeft} from "./header.component";
import './dashboard.component.scss';
import {Bar} from "react-chartjs-2";
import {SearchEngine, SortEngine, SurveyEngine, TrendCardEngine} from "./engine.component";

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
    return (
        <div className="dashboard-home-main">
            <div className="container-trend-card-engine">
                <TrendCardEngine
                    trend={{
                        id:12345,
                        title: "Trend Title",
                        description: `
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Suspendisse varius enim in eros elementum tristique.
                        `,
                        numberOfVotes: 0,
                        timeCreated: "2021-08-21",
                        trendTags:[
                            'tag1',
                            'tag2',
                            'tag3',
                            'tag456'
                        ]
                    }}
                />
            </div>
        </div>
    );

}

export function DashboardComponent({children}) {
    return (
        <div className="dashboard">
            <HeaderLeft/>
            <div className="dashboard-main">
                {children}
            </div>
        </div>
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