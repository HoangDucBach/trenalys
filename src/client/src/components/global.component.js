import {Body, HeaderTop} from "./body.component";
import {Outlet} from "react-router-dom";
import {LoginEngine, RegisterEngine} from "./engine.component";
import './global.component.scss'

export function SVGLogo() {
    return(
        <div className="svg-logo">
            <svg width="56" height="52" viewBox="0 0 56 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M28.25 38.5V45.0067C28.25 47.2279 25.5695 48.3461 23.9911 46.7832L4.7854 27.7677C3.80079 26.7929 3.79684 25.2032 4.77658 24.2234L13.7322 15.2678C14.7085 14.2915 16.2915 14.2915 17.2678 15.2678L38.7322 36.7322C39.7085 37.7085 41.2915 37.7085 42.2678 36.7322L51.2234 27.7766C52.2032 26.7968 52.1992 25.2071 51.2146 24.2323L32.0089 5.21678C30.4305 3.65394 27.75 4.77205 27.75 6.99332V13.5" stroke="#222222" stroke-width="8" stroke-linecap="round"/>
            </svg>

        </div>
    )
}
export function NotFoundComponent() {
    return (
        <div className="not-found">
            <h1>404</h1>
            <p>Page Not Found</p>
        </div>
    );
}

export function LoginComponent() {
 return(
     <div className='login-component'>
         <LoginEngine/>
     </div>
 )
}
export function RegisterComponent() {
    return(
        <div className='login-component'>
            <RegisterEngine/>
        </div>
    )
}