import React, {useContext, useEffect, useRef, useState} from 'react';
import MyHeader from "../../components/UI/navbar/MyHeader";
import './Settings.scss';
import SearchInput from "../../components/UI/SearchInput/SearchInput";
import {AuthContext} from "../../context";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import BlockNotification from "../../components/BlockNotification/BlockNotification";
import Loading from "../../components/Loading/Loading";
import {useAuthRedirect} from "../../hooks/useAuthRedirect";

const Settings = () => {
    useAuthRedirect();

    const { authStore, userStore, subscribeStore } = useContext(AuthContext);
    const navigate = useNavigate();

    const [userData, setUserData] = useState(userStore);
    const [subscribeData, setSubscribeData] = useState(subscribeStore);
    const [notification, setNotification] = useState({isNotification: false, message: ''});

    const [password, setPassword] = useState('');
    const [imgAvatar, setImgAvatar] = useState(null);
    const [timeout, setTimeoutState] = useState(8000);

    const timeoutId = useRef(null);

    useEffect(() => {
        setUserData(userStore);
    }, [userStore]);

    useEffect(() => {
        (async () => {
            setSubscribeData(await subscribeStore.getSubscribeById(userStore.idsubscribe));
        })();
    }, [subscribeStore]);

    useEffect(() => {
        setTimeoutState(8000);
    }, [notification]);

    const handleLogout = async () => {
        await authStore.logout()
        navigate('/registration')
    }

    const handleSaveData = async () => {
        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
        }

        const requestData = { ...userData };

        if (password) {
            requestData.password = password;
        }

        let avatarData;
        if (imgAvatar) {
            avatarData = imgAvatar;
        }

        const response = await userStore.updateUser(requestData, avatarData);
        setNotification({ isNotification: false, message: '' });

        setTimeout(() => {
            if (response?.message) {
                setNotification({ isNotification: true, message: response.message });
            } else {
                setNotification({ isNotification: true, message: 'Данные сохранены успешно' });
            }

            timeoutId.current = setTimeout(() => {
                setNotification({ isNotification: false, message: '' });
            }, timeout);
        }, 0);
    };

    const handleDownloadAvatar = (e) => {
        e.preventDefault();
        if (e.target.files[0]) {
            setImgAvatar(e.target.files[0]);
        }
    }

    const dateObject = new Date(userData.timestartsubscribe);
    dateObject.setSeconds(dateObject.getSeconds() + subscribeStore.timeofactionday);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    return (
        authStore.isLoading ?
            <Loading/>
            :
            <div className="settingsDisplay">
                <MyHeader className="myHeader"/>
                <div className="settings">
                    <div className="settings__avatar">
                        <button onClick={() => document.getElementById('userAvatar').click()}
                                className="hideButton"
                        >
                            <img src={userStore.avatar} alt="User avatar"/>
                            <input type="file"
                                   id="userAvatar"
                                   accept="image/*"
                                   style={{display: 'none'}}
                                   onChange={handleDownloadAvatar}
                            />
                        </button>
                        <div className="settings__avatar__razdel"/> {/* Разделитель */}
                        <p>Размер аватара не может превышать 200x200 и не более чем 1мб</p>
                        <button
                            onClick={handleSaveData}
                        >
                            Сохранить
                        </button>
                        <button
                            onClick={handleLogout}
                        >
                            Выход
                        </button>
                    </div>
                    <div className="settings__group">
                        <div className="settings__group__private">
                            <h2>Личная информация</h2>
                            <div className="settings__group__private__field">
                                <div className="settings__group__private__field__item">
                                    <p>Твоё имя</p>
                                    <SearchInput
                                        placeholder="Имя"
                                        value={userData?.name || ""}
                                        onChange={(e) => setUserData({...userData, name: e.target.value})}
                                    />
                                </div>
                                <div className="settings__group__private__field__item">
                                    <p>Твоя фамилия</p>
                                    <SearchInput
                                        placeholder="Фамилия"
                                        value={userData?.lastname || ""}
                                        onChange={(e) => setUserData({...userData, lastname: e.target.value})}
                                    />
                                </div>
                                <div className="settings__group__private__field__item">
                                    <p>Твоя почта</p>
                                    <SearchInput
                                        placeholder="Почта"
                                        disabled
                                        value={userData?.email || ""}
                                        onChange={(e) => setUserData({...userData, email: e.target.value})}
                                    />
                                    {userStore.isactivated ?
                                        <p className="mailConfirmYes">Почта подтверждена</p>
                                        :
                                        <p className="mailConfirmNo">Подтвердите почту!</p>
                                    }
                                </div>
                                <div className="settings__group__private__field__item">
                                    <p>Введите новый пароль</p>
                                    <SearchInput
                                        placeholder="Новый пароль"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="settings__group__subscribe">
                            <h2>Подписка на сервис</h2>
                            <div className="settings__group__subscribe__field">
                                <div className="settings__group__subscribe__field__item">
                                    <p>Название подписки</p>
                                    <SearchInput
                                        placeholder="Подписка"
                                        disabled
                                        value={subscribeData?.name || ""}
                                    />
                                </div>
                                <div className="settings__group__subscribe__field__item">
                                    <p>Дата окончания подписки</p>
                                    <SearchInput
                                        placeholder="Дата"
                                        disabled
                                        value={formattedDate}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="settings__token">
                        <h2>Токены авторизации</h2>
                        <div className="settings__token__field">
                            <div className="settings__token__field__item">
                                <div className="settings__token__field__item__token">
                                    <p>Токен авторизации ВК</p>
                                    <SearchInput
                                        width="400px"
                                        placeholder="Токен ВК"
                                        value={userData?.tokenvk === "null" ? "" : userData?.tokenvk}
                                        onChange={(e) => setUserData({...userData, tokenvk: e.target.value})}
                                    />
                                </div>
                                <div className="settings__token__field__item__domain">
                                    <p>Короткое имя группы ВК</p>
                                    <SearchInput
                                        width="260px"
                                        placeholder="Короткое имя ВК"
                                        value={userData?.domainvk === "null" ? "" : userData?.domainvk}
                                        onChange={(e) => setUserData({...userData, domainvk: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className="settings__token__field__item">
                                <div className="settings__token__field__item__token">
                                    <p>Токен авторизации ТГ</p>
                                    <SearchInput
                                        width="400px"
                                        placeholder="Токен ТГ"
                                        value={userData?.tokentg === "null" ? "" : userData?.tokentg}
                                        onChange={(e) => setUserData({...userData, tokentg: e.target.value})}
                                    />
                                </div>
                                <div className="settings__token__field__item__domain">
                                    <p>Имя канала ТГ</p>
                                    <SearchInput
                                        width="260px"
                                        placeholder="Имя канала ТГ"
                                        value={userData?.tokentg === "null" ? "" : userData?.domaintg}
                                        onChange={(e) => setUserData({...userData, domaintg: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className="settings__token__field__item">
                                <div className="settings__token__field__item__token">
                                    <p>Логин для инстаграм</p>
                                    <SearchInput
                                        width="400px"
                                        placeholder="Логин инстаграм"
                                        value={userData?.tokeninst === "null" ? "" : userData?.loginig}
                                        onChange={(e) => setUserData({...userData, loginig: e.target.value})}
                                    />
                                </div>
                                <div className="settings__token__field__item__password">
                                    <p>Пароль для инстаграм</p>
                                    <SearchInput
                                        width="260px"
                                        placeholder="Пароль для инстаграм"
                                        // value={userData?.tokeninst === "null" ? "" : userData?.passig}
                                        onChange={(e) => setUserData({...userData, passig: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {notification.isNotification &&
                    <BlockNotification message={notification.message} timeout={timeout}/>
                }
            </div>
    );
};

export default observer(Settings);