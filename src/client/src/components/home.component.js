import {HeaderTop} from "./header.component";

export function HomeIntroductionContent() {
    return (
        <div className="home-introduction-content">
            <div className="container-introduction-content">
                <svg width="190" height="6" viewBox="0 0 190 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 3L150 3.00001" stroke="#222222" stroke-width="5" stroke-linecap="round"/>
                    <path d="M161 3H171" stroke="#222222" stroke-width="5" stroke-linecap="round"/>
                    <path d="M182 3H187" stroke="#222222" stroke-width="5" stroke-linecap="round"/>
                </svg>
                <p>Social Network</p>
            </div>
            <div className="container-introduction-content">
                Vote <span>trending</span>, follow and analysis
            </div>
        </div>
    );

}

export function HomeLogin() {
    return (
        <div className="home-login">
            <div className="container-login">
                <div className="login-content">
                    <input type="text" placeholder="username"/>
                    <input type="password" placeholder="password"/>
                    <div className="container-login-and-register">
                        <button>Log in</button>
                        <button>Register</button>
                    </div>
                </div>
            </div>
        </div>
    );

}

export function HomeComponent() {
    return (
        <div className="home">
            <HeaderTop/>
            <HomeIntroductionContent/>
            <HomeLogin/>
        </div>
    );
}