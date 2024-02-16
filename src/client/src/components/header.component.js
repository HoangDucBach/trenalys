import {SVGLogo} from "./global.component";
import "./header.component.scss";

export function HeaderTop() {
    return (
        <div className="header-top">
            <div className="container-logo">
                <div className="logo-img">
                    <SVGLogo/>
                </div>
                <div className="logo-title">
                    Trenalys
                </div>
            </div>
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
        </div>
    );
}
export function HeaderLeft() {
    return (
        <div className="header-left">
            <div className="container-logo">
                <div className="logo-img">
                    <img src={'/img/logo50.png'} alt={'logo-image'}/>
                </div>
            </div>
            <div className="container-menu">
                <div className="menu-item">
                    <a href={'/'}>Home</a>
                </div>
                <div className="menu-item">
                    <a href={'/about'}>Profile</a>
                </div>
                <div className="menu-item">
                    <a href={'/about'}>Alert</a>
                </div>
            </div>
            <div className="container-logout">

            </div>
        </div>
    );
}