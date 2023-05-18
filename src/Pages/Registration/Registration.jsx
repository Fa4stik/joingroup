import React, {useContext, useState} from 'react';
import './Registration.scss'
import {register} from '../../images/images.js'
import MyInput from "../../components/UI/input/MyInput";
import MyButton from "../../components/UI/button/MyButton";
import {useNavigate} from "react-router-dom";
import {AuthContext, MyHeaderContext} from "../../context";
import {observer} from "mobx-react-lite";

const Registration = () => {
    const [buttonTextLogin, setButtonTextLogin] = useState('Вход');
    const [pTextLogin, setPTextLogin] = useState('Нет аккаунта?');
    const [linkTextLogin, setLinkTextLogin] = useState('Зарегистрироваться')
    const [regInput, setRegInput] = useState('none');
    const [showPassword, setShowPassword] = useState('password');

    const [isCorrectData, setIsCorrectData] = useState('none');
    const [errorText, setErrorText] = useState('');

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [title, setTitle] = useState('Авторизация');
    const [dispPassword, setDispPassword] = useState('')

    const { store } = useContext(AuthContext);

    const navigate = useNavigate();
    const handlerLink = () => {
        setIsCorrectData('none');
        if (buttonTextLogin === 'Вход') {
            setButtonTextLogin('Регистрация');
            setPTextLogin('Уже есть аккаунт?');
            setLinkTextLogin('Войти');
            setRegInput('inline')
            setTitle('Авторизация');
        }
        if (buttonTextLogin === 'Регистрация') {
            setButtonTextLogin('Вход');
            setPTextLogin('Нет аккаунта?');
            setLinkTextLogin('Зарегистрироваться');
            setRegInput('none')
        } else {
            if (linkTextLogin === 'Зарегистрироваться') {
                setButtonTextLogin('Регистрация');
                setPTextLogin('Уже есть аккаунт?');
                setLinkTextLogin('Войти');
                setRegInput('inline')
                setTitle('Авторизация');
                setDispPassword('');
                setTitle('Авторизация')
            } else {
                setButtonTextLogin('Вход');
                setPTextLogin('Нет аккаунта?');
                setLinkTextLogin('Зарегистрироваться');
                setRegInput('none')
                setDispPassword('');
                setTitle('Авторизация')
            }
        }
    }

    const handlerBtnLogin = async (e) => {
        e.preventDefault();
        if (buttonTextLogin === 'Вход') {
            const response = await store.login(email, password)
            if (store.isAuth) {
                setIsCorrectData('none')
                navigate('/primary')
            } else {
                setErrorText(response);
                setIsCorrectData('block')
            }
        } else {
            const response = await store.registration(name, lastName, email, password);
            if (store.isAuth) {
                setIsCorrectData('none');
                navigate('/primary');
            } else {
                setErrorText(response);
                setIsCorrectData('block');
            }
        }
        // navigate('/primary')
    }

    const handlerBtnPassword = (e) => {
        e.preventDefault()
        showPassword === 'password' ? setShowPassword('text') : setShowPassword('password')
    }

    const handleResetPassword = (e) => {
        e.preventDefault();
        setTitle('Ввостановление пароля');
        setRegInput('none');
        setDispPassword('none');
        setButtonTextLogin('Отправить письмо');
    }

    return (
        <div className="registr">
            <div className="block">
                <h1>JoinGroup</h1>
                <h2>{title}</h2>
                <MyInput type="text"
                         placeholder="Твоё имя"
                         image={register.user}
                         disp={regInput}
                         onChange={(e) => setName(e.target.value)}
                />
                <MyInput type="text"
                         placeholder="Твоя фамилия"
                         image={register.user}
                         disp={regInput}
                         onChange={(e) => setLastName(e.target.value)}
                />
                <MyInput type="text"
                         placeholder="Твой email"
                         image={register.mail}
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}
                />
                <MyInput type={showPassword}
                         placeholder="Твой пароль"
                         value={password}
                         disp={dispPassword}
                         onChange={(e) => setPassword(e.target.value)}
                />
                <button className="block__passwordBtn"
                        style={{display: dispPassword}}
                        onClick={handlerBtnPassword}
                >
                    <img src={register.pass} alt="Password"/>
                </button>
                <div className="block__notCorrect" style={{display: isCorrectData}}>
                    <p>{errorText}</p>
                </div>
                <div className="block__passFunc"
                     style={{display: dispPassword}}
                >
                    <div className="block__passFunc__remember">
                        <input type="checkbox"/>
                        <p>Запомнить меня</p>
                    </div>
                    <a href="#"
                       onClick={handleResetPassword}
                    >Забыл пароль?</a>
                </div>
                <MyButton onClick={handlerBtnLogin}>{buttonTextLogin}</MyButton>
                <div className="block__reg">
                    <p>{pTextLogin} <a href="#" onClick={handlerLink}>{linkTextLogin}</a></p>
                </div>
            </div>
        </div>
    );
};

export default observer(Registration);
