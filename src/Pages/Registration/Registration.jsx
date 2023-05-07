import React, {useContext, useState} from 'react';
import './Registration.scss'
import {register} from '../../images/images.js'
import MyInput from "../../components/UI/input/MyInput";
import MyButton from "../../components/UI/button/MyButton";
import {useNavigate} from "react-router-dom";
import {MyHeaderContext} from "../../context";

const Registration = () => {
    const [buttonTextLogin, setButtonTextLogin] = useState('Вход');
    const [pTextLogin, setPTextLogin] = useState('Нет аккаунта?');
    const [linkTextLogin, setLinkTextLogin] = useState('Зарегистрироваться')
    const [regInput, setRegInput] = useState('none');
    const navigate = useNavigate();
    const handlerLink = () => {
        if (buttonTextLogin === 'Вход') {
            setButtonTextLogin('Регистрация');
            setPTextLogin('Уже есть аккаунт?');
            setLinkTextLogin('Войти');
            setRegInput('inline')
        }
        else {
            setButtonTextLogin('Вход');
            setPTextLogin('Нет аккаунта?');
            setLinkTextLogin('Зарегистрироваться');
            setRegInput('none')
        }
    }

    const handlerButton = (e) => {
        e.preventDefault();
        navigate('/primary')
    }

    return (
        <div className="registr">
            <div className="block">
                <h1>JoinGroup</h1>
                <h2>Авторизация</h2>
                <MyInput type="text" placeholder="Твоё имя" image={register.user} disp={regInput}/>
                <MyInput type="text" placeholder="Твоя фамилия" image={register.user} disp={regInput}/>
                <MyInput type="text" placeholder="Твой email" image={register.mail}/>
                <MyInput type="text" placeholder="Твой пароль" image={register.pass}/>
                <div className="block__passFunc">
                    <div className="block__passFunc__remember">
                        <input type="checkbox"/>
                        <p>Запомнить меня</p>
                    </div>
                    <a href="">Забыл пароль?</a>
                </div>
                <MyButton onClick={handlerButton}>{buttonTextLogin}</MyButton>
                <div className="block__reg">
                    <p>{pTextLogin} <a href="#" onClick={handlerLink}>{linkTextLogin}</a></p>
                </div>
            </div>
        </div>
    );
};

export default Registration;
