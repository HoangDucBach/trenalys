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
import RequireAuth from "./components/require.component";
import {LoginComponent, NotFoundComponent, RegisterComponent} from "./components/global.component";
import axios from "axios";
import {connect, disconnect} from "./redux/actions/status.action";
import {useEffect} from "react";
import {Body, HeaderTop} from "./components/body.component";
import {
    DashboardComponent,
    DashboardCreateTrendFormComponent, DashboardCreateTrendFormMain,
    DashboardHomeComponent, DashboardHomeMain
} from "./components/dashboard.component";

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
                    element={
                        <Body>
                            <Outlet/>
                        </Body>
                    }>
                    <Route path="/" element={<HomeComponent/>}/>
                    <Route path="login" element={<LoginComponent/>}/>
                    <Route path="register" element={<RegisterComponent/>}/>

                    <Route
                        path="dashboard"
                        element={
                            <RequireAuth>
                                <Outlet/>
                            </RequireAuth>}>
                        <Route
                            path="home"
                            element={<DashboardHomeComponent/>
                            }>
                        </Route>
                        <Route path="create-trend-form" element={<DashboardCreateTrendFormComponent/>}/>
                    </Route>
                    <Route path="*" element={<NotFoundComponent/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
        ;
}

export default App;
