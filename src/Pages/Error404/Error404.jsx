import React from 'react';
import './Error404.scss'
import {Link} from "react-router-dom";

const Error404 = () => {
    return (
        <div id="notfound">
            <div className="notfound">
                <div className="notfound-404">
                    <h1>404</h1>
                    <h2>Страницы нет</h2>
                </div>
                <Link to="/">Вернуться назад</Link>
            </div>
        </div>
    );
};

export default Error404;