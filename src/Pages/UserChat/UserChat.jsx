import React from 'react';
import MyHeader from "../../components/UI/navbar/MyHeader";
import './UserChat.scss';
import MyTag from "../../components/UI/tag/MyTag";
import {userChat} from '../../images/images';
import SearchInput from "../../components/UI/SearchInput/SearchInput";
import OutUser from "../../components/OutUser/OutUser";

const UserChat = () => {
    return (
        <div className="userChat">
            <MyHeader className="myHeader"/>
            <div className="chat">
                <div className="chat__column">
                    <div className="chat__column__mainUserInfo">
                        <img src={userChat.usAvatarMain} alt="Аватар пользователя"/>
                        <p>Имя Фамилия</p>
                    </div>
                    <div className="chat__column__inputSearch">
                        {/*<input type="text" alt="Search" placeholder="text for search"/>*/}
                        <SearchInput/>
                    </div>
                    <OutUser
                        image={userChat.user_01}
                        fullName="Bella Mirrow"
                        shortText="Увидимся завтра"
                        nameTag="VK"
                        lastTimeMess="05/04/2023"
                    />
                    <OutUser
                        image={userChat.user_02}
                        fullName="Stella Hill"
                        shortText="Спасибо большое!"
                        nameTag="INSTAGRAM"
                        lastTimeMess="11/02/2023"
                    />
                    <OutUser
                        image={userChat.user_03}
                        fullName="Rupert Peterson"
                        shortText="Увидимся завтра"
                        nameTag="TG"
                        lastTimeMess="23/08/2023"
                    />
                </div>
                <div className="chat__dialog">
                    <img src={userChat.messGray} alt="Message"/>
                    <p>Выберите пользователя, с которым хотите начать чат</p>
                </div>
            </div>
        </div>
    );
};

export default UserChat;