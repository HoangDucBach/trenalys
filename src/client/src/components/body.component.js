import {SVGLogo} from "./global.component";
import "./body.component.scss";
import {Link} from "react-router-dom";
import {UserStatusEngine} from "./engine.component";

export function HeaderTop() {
    return (
        <div className="header-top">
            <Link to={'/'} className="container-logo">
                <div className="logo-img">
                    <SVGLogo/>
                </div>
                <div className="logo-title">
                    Trenalys
                </div>
            </Link>
            <div className="container-menu">
                <div className="menu-item">
                    <a href={'/'}>Home</a>
                </div>
                <div className="menu-item">
                    <a href={'/about'}>About</a>
                </div>
                <div className="menu-item">
                    <a href={'/contact'}>Contact</a>
                </div>
            </div>
            <div className="container-status">
                <UserStatusEngine/>
            </div>
        </div>
    );
}


export function Footer() {
    return (
        <div className="footer"></div>
    )
}

export function Main({children}) {
    return (
        <div className="main">
            {children}
        </div>
    )
}

export function Body({children}) {
    return (
        <div className="body">
            <HeaderTop/>
            <div className="main">
                {children}
            </div>
        </div>
    )
}