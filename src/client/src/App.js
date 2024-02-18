import logo from './logo.svg';
import { HomeComponent } from "./components/home.component";
import './scss/_global.scss';

import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    Outlet,
} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <div>
                            <Outlet />
                        </div>
                    }
                >
                    <Route path="/" element={<HomeComponent signType="login" />} />
                    <Route path="login" element={<HomeComponent signType="login" />} />
                    <Route path="register" element={<HomeComponent signType="register" />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
