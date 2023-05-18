import "./index.css";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Error404 from "./Pages/Error404/Error404";
import {privateRouters} from "./router/router";
import React, {useState} from "react";
import {MyHeaderContext, AuthContext, UserContext} from './context/index';
import AuthStore from "./store/AuthStore";
import {observer} from "mobx-react-lite";
import UserStore from "./store/UserStore";
import SubscribeStore from "./store/SubscribeStore";
import AnimatedCursor from "react-animated-cursor";

function App() {
    const [activeLink, setActiveLink] = useState('primary');
    const authStore = new AuthStore();
    const userStore = new UserStore();
    const subscribeStore = new SubscribeStore();
    return (
        <div className="App">
            <AuthContext.Provider
                value={{
                    authStore,
                    userStore,
                    subscribeStore
                }}
            >
                <MyHeaderContext.Provider
                    value={{
                        activeLink,
                        setActiveLink
                    }}>
                    <AnimatedCursor
                        innerSize={8}
                        outerSize={8}
                        color='193, 11, 111'
                        outerAlpha={0.2}
                        innerScale={0.7}
                        outerScale={5}
                        clickables={[
                            'a',
                            'input[type="text"]',
                            'input[type="email"]',
                            'input[type="password"]',
                            'input[type="number"]',
                            'input[type="submit"]',
                            'input[type="image"]',
                            'label[for]',
                            'select',
                            'textarea',
                            'button',
                            '.link'
                        ]}
                    />
                    <BrowserRouter>
                        <Routes>
                            {privateRouters.map(route =>
                                <Route key={route.path} path={route.path} element={route.component}/>
                            )}
                            <Route path="*" element={<Error404/>}/>
                        </Routes>
                    </BrowserRouter>
                </MyHeaderContext.Provider>
            </AuthContext.Provider>
        </div>
    );
}

export default observer(App);
