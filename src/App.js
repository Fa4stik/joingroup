import "./index.css";
import styles from "./App.module.scss";

import Header from "./components/header/Header"
import Main from "./components/main/Main"
import Footer from "./components/footer/Footer"
import {dividerClasses} from "@mui/material";

function App() {

    return (
        <div className="App">
            <div className={styles.mainElement}>
                <Header/>
                <Main/>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    );
}

export default App;
