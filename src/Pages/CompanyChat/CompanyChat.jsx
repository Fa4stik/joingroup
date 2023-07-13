import React, {useContext, useRef, useState} from 'react';
import MyHeader from "../../components/UI/navbar/MyHeader";
import './CompanyChat.scss';
import {compChat} from "../../images/images";
import SearchInput from "../../components/UI/SearchInput/SearchInput";
import OutUser from "../../components/OutUser/OutUser";
import {useAuthRedirect} from "../../hooks/useAuthRedirect";
import {observer} from "mobx-react-lite";
import Loading from "../../components/Loading/Loading";
import {AuthContext} from "../../context";

const CompanyChat = () => {
    const { authStore } = useContext(AuthContext);

    useAuthRedirect();

    const [isClickFirstChat, setIsClickFirstChat] = useState(false);

    const handleClickOutUser = () => {
        setIsClickFirstChat(true);
    }

    return (
        authStore.isLoading ?
            <Loading/>
            :
            <div className="compChat">
                <MyHeader className="myHeader"/>
                <div className="chat">
                    <div className="chat__column">
                        <div className="chat__column__mainUserInfo">
                            <img src={compChat.usAvatarMain} alt="Аватар пользователя"/>
                            <p>Имя Фамилия</p>
                        </div>
                        <div className="chat__column__inputSearch">
                            <SearchInput placeholder="Введите текст для поиска"/>
                        </div>
                        <OutUser
                            image={compChat.comp_01}
                            fullName="Компания №1"
                            shortText="Увидимся завтра"
                            lastTimeMess="05/04/2023"
                            onClick={handleClickOutUser}
                        />
                    </div>
                    {isClickFirstChat ?
                        <div className="chat__active">
                            <div className="chat__active__header">
                                <img src={compChat.comp_01} alt="Logo company" className="chat__active__header__logo"/>
                                <p>Компания №1</p>
                                <img src={compChat.addUser} alt="Icon add user" className="chat__active__header__add"/>
                            </div>
                            <div className="chat__active__msgSend">
                                <div className="chat__active__msgSend__messages">
                                    <div>Message</div>
                                    <div>Message</div>
                                    <div>Message</div>
                                    <div>Message</div>
                                    <div>Message</div>
                                </div>
                                <div className="chat__active__msgSend__send">
                                    <input type="text" placeholder={"Начните вводить сообщение"}/>
                                    <button>
                                        <img src={compChat.send} alt="Send icon"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    :
                        <div className="chat__dialog">
                            <img src={compChat.messGray} alt="Message"/>
                            <p>Выберите пользователя, с которым хотите начать чат</p>
                        </div>}
                </div>
            </div>
    );
};

export default observer(CompanyChat);