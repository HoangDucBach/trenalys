import "./home.component.scss";
import "./engine.component.scss";

export function HomeDemoButtons() {
    return (
        <div className="home-demo-buttons">
            <button className="button-custom" id='button-explore'>Explore now
                <div className="button-custom__icon">
                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M4.44978 2.17906C8.40978 -0.46094 13.6888 0.06006 17.0698 3.41906C18.9588 5.31006 20.0088 7.86906 19.9989 10.5391C19.9798 15.2991 16.5988 19.3891 11.9288 20.3101C7.24878 21.2301 2.56978 18.7191 0.758781 14.3101C-1.06122 9.90906 0.479781 4.82906 4.44978 2.17906ZM13.4988 6.74906C13.3698 6.68906 13.2188 6.66906 13.0798 6.71906L8.13878 8.27906C7.96878 8.32906 7.83878 8.46906 7.78978 8.63906L6.21878 13.5791C6.18878 13.6791 6.18878 13.7891 6.21878 13.8891C6.25878 14.0291 6.35978 14.1491 6.48978 14.2191C6.62878 14.2991 6.77978 14.3101 6.91878 14.2691L11.8598 12.7091C12.0298 12.6591 12.1598 12.5291 12.2188 12.3591L13.7688 7.41906C13.8098 7.31006 13.8098 7.18906 13.7688 7.07906C13.7298 6.93906 13.6288 6.81906 13.4988 6.74906Z"
                            fill="#FDFDFD"/>
                    </svg>
                </div>
            </button>
        </div>
    )
}

export function HomeSectionOpen() {
    return (
        <section id='open' className="home-section-open">
            <div className="container-tagline">
                <p>Social Network</p>
            </div>
            <div className="container-title">
                <h1>Survey trending,
                    vote, follow and analysis</h1>
            </div>
            <div className="container-description">
                The free social network allows users to vote on social trends, monitor and make their choices based on
                <b> trenalys</b>' self-analysis and evaluation system.
            </div>
            <button className="button-custom" id='button-explore'>Explore now
                <div className="button-custom__icon">
                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M4.44978 2.17906C8.40978 -0.46094 13.6888 0.06006 17.0698 3.41906C18.9588 5.31006 20.0088 7.86906 19.9989 10.5391C19.9798 15.2991 16.5988 19.3891 11.9288 20.3101C7.24878 21.2301 2.56978 18.7191 0.758781 14.3101C-1.06122 9.90906 0.479781 4.82906 4.44978 2.17906ZM13.4988 6.74906C13.3698 6.68906 13.2188 6.66906 13.0798 6.71906L8.13878 8.27906C7.96878 8.32906 7.83878 8.46906 7.78978 8.63906L6.21878 13.5791C6.18878 13.6791 6.18878 13.7891 6.21878 13.8891C6.25878 14.0291 6.35978 14.1491 6.48978 14.2191C6.62878 14.2991 6.77978 14.3101 6.91878 14.2691L11.8598 12.7091C12.0298 12.6591 12.1598 12.5291 12.2188 12.3591L13.7688 7.41906C13.8098 7.31006 13.8098 7.18906 13.7688 7.07906C13.7298 6.93906 13.6288 6.81906 13.4988 6.74906Z"
                            fill="#FDFDFD"/>
                    </svg>
                </div>
            </button>
        </section>
    );

}

export function HomeMain() {
    return (
        <div className="home-main">
            <HomeSectionOpen/>
        </div>
    )
}

export function HomeComponent() {
    return (
        <div className="home-component">
            <HomeMain/>
        </div>
    );
}