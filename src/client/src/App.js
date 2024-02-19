import logo from './logo.svg';
import {HomeComponent} from "./components/home.component";
import './scss/_global.scss';
import {Provider} from "react-redux";
import {store} from "./redux/store";
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    Outlet,
} from "react-router-dom";

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <div>
                                <Outlet/>
                            </div>
                        }
                    >
                        <Route path="/" element={<HomeComponent signType="login"/>}/>
                        <Route path="login" element={<HomeComponent signType="login"/>}/>
                        <Route path="register" element={<HomeComponent signType="register"/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
