import {StatusNotificationComponent, SVGIcon, SVGLogo} from "./global.component";
import "./body.component.scss";
import {Link} from "react-router-dom";
import {UserStatusEngine} from "./engine.component";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {useMediaQuery} from "react-responsive";
import Select from "react-select";
import {ButtonToolbar, Dropdown} from "rsuite";
import DropdownItem from "rsuite/cjs/Dropdown/DropdownItem";

/*
* This is the main component that will be used to render the main body of the application.
* -- HeaderTop
* -- Footer
* -- Main
* -- Body
*/

export function HeaderTop() {
    const isTabletOrMobile = useMediaQuery({query: '(max-width: 600px)'});

    return (
        <div className="header-top">
            <Link to={'/'} className="header-top__container-logo">
                <div className="header-top__container-logo--img">
                    <SVGLogo/>
                </div>
                <div className="header-top__container-logo--title">
                    Trenalys
                </div>
            </Link>
            <div className="container-menu">
            </div>
            <div className="container-status">
                <UserStatusEngine/>
            </div>
        </div>
    );
}


export function Footer() {
    return (
        <section className="footer">
            <div className="footer__logo">
                <SVGIcon
                    icon={'trenalys'}
                    color={'#6946CB'}
                />
                <h2>Trenalys</h2>
            </div>
            <div className="footer__contact-me">
                <h3>CONTACT ME</h3>
                <div className="footer__contact-me__container">
                    <div className="footer__contact-me__container-item">
                        <a href={'https://linkedin.com/in/hoàng-đức-bách-261a6a270'}>
                            <SVGIcon
                                icon={'linkedin'}
                                color={'#FFFBF3'}
                            />
                        </a>
                    </div>
                    <div className="footer__contact-me__container-item">
                        <a href={'https://www.facebook.com/bach.ok.33/'}>
                            <SVGIcon
                                icon={'facebook'}
                                color={'#FFFBF3'}
                            />
                        </a>
                    </div>
                    <div className="footer__contact-me__container-item">
                        <a href={'https://github.com/HoangDucBach'}>
                            <SVGIcon
                                icon={'github'}
                                color={'#FFFBF3'}
                            />
                        </a>
                    </div>

                    <div className="footer__contact-me__container-item">
                        <a href={'mailto:hoangbach0985@gmail.com'}>
                            <SVGIcon
                                icon={'gmail'}
                                color={'#FFFBF3'}
                            />
                        </a>
                    </div>
                </div>
            </div>
            <div className="footer__license">
                <div className="footer__license-project">
                    A project by <span>Hoang Duc Bach</span>
                </div>
                <div className="footer__license-web">
                    Copyright ©2024 by <b>Hoang Duc Bach</b>
                </div>
            </div>
        </section>
    );
}

export function Main({
                         children
                     }) {
    return (
        <div className="main">
            {children}
        </div>
    )
}

export function Body({
                         children
                     }) {
    const status = useSelector(state => state.status);
    const dispatch = useDispatch();

    useEffect(() => {
        if (status.notification.isAvailable) {
            const timer = setTimeout(() => {
                dispatch({type: 'CLEAR_NOTIFICATION'});
            }, 3000);
            return () => {
                clearTimeout(timer);
            };
        }
    }, []);
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
            <Footer/>
        </div>
    )
}