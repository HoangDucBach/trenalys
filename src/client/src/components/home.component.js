import {HeaderTop} from "./header.component";
import {useEffect, useState} from "react";
import {DashboardComponent, DashboardHomeComponent} from "./dashboard.component";
import "./home.component.scss";
import "./engine.component.scss";
import {LoginEngine, RegisterEngine} from "./engine.component";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

export function HomeDemoContent() {
    const location = useLocation();
    if (location.pathname === "/login") {
        return (
            <div className="home-demo-content">
                <LoginEngine/>
            </div>);
    }
    if (location.pathname === "/register") {
        return (
            <div className="home-demo-content">
                <RegisterEngine/>
            </div>
        );
    }
    return (
        <div className="home-demo-content">
            <div className="container-demo-extra-content">
                <svg width="190" height="6" viewBox="0 0 190 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 3L150 3.00001" stroke="#222222" strokeWidth="5" strokeLinecap="round"/>
                    <path d="M161 3H171" stroke="#222222" strokeWidth="5" strokeLinecap="round"/>
                    <path d="M182 3H187" stroke="#222222" strokeWidth="5" strokeLinecap="round"/>
                </svg>
                <p>Social Network</p>
            </div>
            <div className="container-demo-content-title">
                Vote <span>trending</span>, follow and analysis
            </div>
            <div className="container-demo-content">
                The free social network allows users to vote on social trends, monitor and make their choices based on
                <b> trenalys</b>' self-analysis and evaluation system.
            </div>
            <HomeDemoButtons/>
        </div>
    );

}

export function HomeDemoImage() {
    return (
        <div className="home-demo-image">
            <img src={'/img/trenalys-demo.png'} alt={'trenalys-demo'}/>
        </div>
    );
}

export function HomeDemoButtons() {
    return (
        <div className="home-demo-buttons">
            <Link to={'/login'} className="button-radius login-button">Login</Link>
            <Link to={'/register'} className="button-radius register-button">Register</Link>
        </div>
    );

}

export function HomeDemo() {
    return (
        <div className="home-demo">
            <HomeDemoContent/>
            <HomeDemoImage/>
        </div>
    );

}

export function HomeMain() {
    return (
        <div className="home-main">
            <HomeDemo/>
        </div>
    )
}

export function HomeComponent({signType}) {
    const isLogged = useSelector(state => state.status.isLogged);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLogged) {
            navigate("/dashboard/home");
        }
    }, [isLogged, navigate]);

    return (
        <div className="home-component">
            <HeaderTop />
            <HomeMain signType={signType} />
        </div>
    );
}