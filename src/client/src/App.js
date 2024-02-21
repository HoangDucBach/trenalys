import {HomeComponent} from "./components/home.component";
import './scss/_global.scss';
import {Provider} from "react-redux";
import {store} from "./redux/store";
import {
    BrowserRouter,
    Routes,
    Route,
    Outlet,
} from "react-router-dom";
import {DashboardComponent, DashboardHomeComponent} from "./components/dashboard.component";

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={<Outlet/>}
                    >
                        <Route path="/" element={<HomeComponent signType="login"/>}/>
                        <Route path="login" element={<HomeComponent signType="login"/>}/>
                        <Route path="register" element={<HomeComponent signType="register"/>}/>

                        <Route path="dashboard" element={<Outlet/>}>
                            <Route path="home" element={<DashboardHomeComponent/>}/>
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
