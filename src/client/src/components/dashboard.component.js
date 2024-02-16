import {HeaderLeft} from "./header.component";
import {Bar} from "react-chartjs-2";

export function TrendTag(tag) {
    return (
        <div className="trend-tag">
            <p>{tag}</p>
        </div>
    );

}
export function TrendCard({trend,user}) {
    const id = trend.id;
    const title = trend.title;
    const description = trend.description;
    const trendTags = trend.trendTags;
    const numberOfVotes = trend.numberOfVotes;
    const timeCreated = trend.timeCreated;

    const isFollowed = user.followedTrends.includes(id);

    return (
        <div className="trend-card">
            <div className="container-trend-graph"></div>
            <div className="container-trend-tags"></div>
            <div className="container-trend-id"></div>
            <div className="container-trend-content"></div>
            <div className="container-trend-time"></div>
            <div className="container-trend-vote"></div>
        </div>
    );

}

export function DashboardComponent() {
    return (
        <div className="dashboard">
            <HeaderLeft/>

        </div>
    );
}