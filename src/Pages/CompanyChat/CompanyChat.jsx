import React, {useContext, useEffect, useRef, useState} from 'react';
import MyHeader from "../../components/UI/navbar/MyHeader";
import './CompanyChat.scss';
import {compChat} from "../../images/images";
import SearchInput from "../../components/UI/SearchInput/SearchInput";
import OutUser from "../../components/OutUser/OutUser";
import {useAuthRedirect} from "../../hooks/useAuthRedirect";
import {observer} from "mobx-react-lite";
import Loading from "../../components/Loading/Loading";
import {AuthContext} from "../../context";
import $api from '../../http/index'
import ActiveMessages from "./ActiveMessages/ActiveMessages";

const CompanyChat = () => {
    const { authStore, userStore } = useContext(AuthContext);

    useAuthRedirect();

    const [isClickFirstChat, setIsClickFirstChat] = useState(false);
    const [messages, setMessages] = useState([]);
    const [currentMsg, setCurrentMsg] = useState('');
    const [activeChat, setActiveChat] = useState('');

    const ws = useRef(null)
    const autoScrollDown = useRef(null);

    // Получение данных чатов и сообщений
    useEffect(() => {
        $api.get('/getChats', {
            params: {
                company_id: userStore.company_id
            }
        }).then((response) => {
            response.data.forEach((chat) => {
                $api.get('/getMessages', {
                    params: {
                        chat_id: chat.id
                    }
                }).then((response) => {
                    setMessages((mess) => [...mess, {...chat, messages: response.data}])
                })
            })
        })
        return () => {
            setMessages([])
        }
    }, [])

    // Подключение к WebSocket
    useEffect(()=> {
        ws.current = new WebSocket('ws://localhost:5000/ws/companyChat')
        ws.current.onopen = () => {
            console.log('WS connect')
        }
        ws.current.onmessage = (message) => {
            const newMessage = JSON.parse(message.data)
            setMessages(chats => (
                chats.map((chat) => {
                    if (chat.id === newMessage.chat_id) {
                        return {
                            ...chat,
                            messages: [...chat.messages, newMessage]
                        }
                    }
                    return chat;
                })
            ))
        }
        ws.current.onerror = () => {
            //
        }
        ws.current.onclose = () => {
            console.log('WS close')
        }
        return () => {
            ws.current.close()
        }
    }, [])

    // Обновление скролла вниз
    useEffect(() => {
        if (autoScrollDown.current) {
            autoScrollDown.current.scrollTop = autoScrollDown.current.scrollHeight;
        }
    }, [messages, activeChat])

    const handleSendMsg = async () => {
        $api.post('/sendMessage', {
            chat_id: activeChat.id,
            user_id: userStore.id,
            body: currentMsg,
            date: (new Date()).toLocaleString('ru-RU')
        }).then((response) => {
            setMessages(chats => (
                chats.map((chat) => {
                    if (chat.id === response.data.chat_id) {
                        return {
                            ...chat,
                            messages: [...chat.messages, response.data]
                        }
                    }
                    return chat
                })
            ))
            ws.current.send(JSON.stringify({
                event: 'message',
                ...response.data
            }))
        })
        setCurrentMsg('');
    };

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
                        {messages.map(chat => (
                            <OutUser
                                key={chat.id}
                                image={compChat.comp_01}
                                fullName={chat.title}
                                lastTimeMess={chat.messages.at(-1).date}
                                shortText={chat.messages.at(-1).body}
                                onClick={() => {
                                    setIsClickFirstChat(true);
                                    setActiveChat(chat);
                                }}
                            />
                        ))}
                    </div>
                    {isClickFirstChat ?
                        <div className="chat__active">
                            <div className="chat__active__header">
                                <img src={compChat.comp_01} alt="Logo company" className="chat__active__header__logo"/>
                                <p>Компания №1 / {activeChat.title}</p>
                                <img src={compChat.addUser} alt="Icon add user" className="chat__active__header__add"/>
                            </div>
                            <div className="chat__active__messages" ref={autoScrollDown}>
                                <ActiveMessages
                                    userStore={userStore}
                                    activeChat={activeChat}
                                    messages={messages}
                                />
                            </div>
                            <div className="chat__active__send">
                                <input type="text"
                                       placeholder={"Начните вводить сообщение"}
                                       onChange={(e) => setCurrentMsg(e.target.value)}
                                />
                                <button onClick={handleSendMsg}>
                                    <img src={compChat.send} alt="Send icon"/>
                                </button>
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