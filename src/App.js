import "./index.css";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Cutaway from "./Pages/Cutaway/Cutaway";
import Error404 from "./Pages/Error404/Error404";
import {privateRouters} from "./router/router";
import {useState} from "react";
import {MyHeaderContext} from './context/index';

function App() {
    const [activeLink, setActiveLink] = useState('primary');

    return (
        <div className="App">
            <MyHeaderContext.Provider
                value={{
                    activeLink,
                    setActiveLink
            }}>
                <BrowserRouter>
                    <Routes>
                        {privateRouters.map(route =>
                            <Route key={route.path} path={route.path} element={route.component}/>
                        )}
                        <Route path="*" element={<Error404/>}/>
                    </Routes>
                </BrowserRouter>
            </MyHeaderContext.Provider>
        </div>
    );
}

export default App;
