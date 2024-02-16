import {HeaderTop} from "./header.component";
import {useState} from "react";
import {DashboardComponent} from "./dashboard.component";
import axios from "axios";
import {SVGLogo} from "./global.component";
import "./home.component.scss";
export function HomeIntroductionContent() {
    return (
        <div className="home-introduction-content">
            <div className="container-introduction-extra-content">
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

export function HomeLogin({ setToken }){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async () => {
        try {
            const response = await axios.post(
                'http://localhost:8000',
                {
                    username: username,
                    password: password
                },
                {
                    withCredentials: true, // Gửi cookie và thông tin xác thực
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log('Login response:', response);
            const token = response.data.token;
            setToken(token);

        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="home-login">
            <div className="container-login">
                <div className="login-content">
                    <input
                        type="text"
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="container-login-and-register">
                        <button onClick={loginUser} >Log in</button>
                        <button>Register</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export function HomeComponent() {
    const [token, setToken] = useState();
    if (!token) {
        return (
            <div className="home-component">
                <HeaderTop/>
                <HomeIntroductionContent/>
                <HomeLogin setToken={setToken}/>
            </div>
        );
    }
    return (
        <DashboardComponent/>
    )
    return (
        <div className="home">
            <HeaderTop/>
            <HomeIntroductionContent/>
            <HomeLogin/>
        </div>
    );
}