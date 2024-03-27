import {AboutComponent, HomeComponent} from "./components/home.component";
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
    DashboardHomeComponent, DashboardHomeMain, DashboardProfileComponent, DashboardTrendComponent
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
    axios.interceptors.response.use(
        response => {
            return response;
        },
        error => {
            if (error.response && error.response.status === 404) {
                dispatch(disconnect());
            }
            return Promise.reject(error);
        }
    );
    useEffect(() => {
        let intervalId;
        if (!status.isConnected) {
            intervalId = setInterval(() => {
                testConnect();
            }, 10000);
        }
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [status.isConnected]);
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
                    <Route path="/profile" element={<RequireAuth><DashboardProfileComponent></DashboardProfileComponent></RequireAuth>}/>
                    <Route path={"/about"} element={<AboutComponent/>}/>
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

                    <Route path="/trend/:id" element={
                        <RequireAuth>
                            <DashboardTrendComponent/>
                        </RequireAuth>
                    }/>

                    <Route path="*" element={<NotFoundComponent/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
        ;
}

export default App;
