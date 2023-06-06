import React, {useContext} from 'react';
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
                        />
                    </div>
                    <div className="chat__dialog">
                        <img src={compChat.messGray} alt="Message"/>
                        <p>Выберите пользователя, с которым хотите начать чат</p>
                    </div>
                </div>
            </div>
    );
};

export default observer(CompanyChat);