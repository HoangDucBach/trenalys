import {HomeComponent} from "./components/home.component";
import './scss/_global.scss';
import {Provider, useDispatch, useSelector} from "react-redux";
import {store} from "./redux/store";
import {
    BrowserRouter,
    Routes,
    Route,
    Outlet,
} from "react-router-dom";
import {DashboardComponent, DashboardHomeComponent} from "./components/dashboard.component";
import RequireLoginComponent from "./components/require.component";
import {NotFoundComponent} from "./components/global.component";
import axios from "axios";
import {connect, disconnect} from "./redux/actions/status.action";
import {useEffect} from "react";

function App() {
    const dispatch = useDispatch();
    const status = useSelector(state => state.status);
    const testConnect = () => {
        axios.post(`${process.env.REACT_APP_SERVER_URL}/`, {}, {withCredentials: true})
            .then(res => {
                dispatch(connect());
            })
            .catch(err => {
                dispatch(disconnect());
            });
    };
    useEffect(() => {
        const intervalId = setInterval(testConnect, 5000);
        return () => clearInterval(intervalId);
    }, []);
    if (!status.isConnected) {
        return (
            <NotFoundComponent/>
        )
    }
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Outlet/>}
                >
                    <Route path="/" element={<HomeComponent signType="login"/>}/>
                    <Route path="login" element={<HomeComponent signType="login"/>}/>
                    <Route path="register" element={<HomeComponent signType="register"/>}/>

                    <Route path="dashboard/*" element={<RequireLoginComponent>
                        <Outlet/>
                    </RequireLoginComponent>}>
                        <Route path="home" element={<DashboardHomeComponent/>}/>
                    </Route>
                    <Route path="*" element={<NotFoundComponent/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
