import {StatusNotificationComponent, SVGLogo} from "./global.component";
import "./body.component.scss";
import {Link} from "react-router-dom";
import {UserStatusEngine} from "./engine.component";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

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
    const status = useSelector(state => state.status);
    const dispatch = useDispatch();
    useEffect(() => {
        if (status.notification.isAvailable) {
            const timer = setTimeout(() => {
                dispatch({
                    type: 'CLEAR_NOTIFICATION'
                });
            }, 3000);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [status.notification.isAvailable]);
    return (
        <div className="body">
            <HeaderTop/>
            <StatusNotificationComponent
                isAvailable={status.notification.isAvailable}
                status={status.notification.status}
                title={status.notification.title}
                message={status.notification.message}
            />
            <div className="main">
                {children}
            </div>
        </div>
    )
}