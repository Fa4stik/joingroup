import React, {useContext, useEffect, useRef, useState} from 'react';
import MyHeader from "../../components/UI/navbar/MyHeader";
import './UserChat.scss';
import MyTag from "../../components/UI/tag/MyTag";
import {compChat, userChat} from '../../images/images';
import SearchInput from "../../components/UI/SearchInput/SearchInput";
import OutUser from "../../components/OutUser/OutUser";
import {observer} from "mobx-react-lite";
import {useAuthRedirect} from "../../hooks/useAuthRedirect";
import Loading from "../../components/Loading/Loading";
import {AuthContext} from "../../context";
import ActiveMessages from "../CompanyChat/ActiveMessages/ActiveMessages";
import Recipient from "../../components/Recipient/Recipient";
import Sender from "../../components/Sender/Sender";
import $api from "../../http";

const UserChat = () => {
    const { authStore, userStore } = useContext(AuthContext);

    useAuthRedirect();

    const [isFirstClickChat, setIsFirstClickChat] = useState(false)
    const [currMess, setCurrMess] = useState('')
    const [activeChat, setActiveChat] = useState('')
    const [messages, setMessages] = useState([])
    const [chats, setChats] = useState([])

    const ws = useRef(null)
    const chatColumn = useRef(null)
    const activeChatRef = useRef(null);
    const messagesRef = useRef(null);

    // Получение всех чатов
    useEffect(() => {
        $api.post('/msg/getChats', {...userStore})
            .then((response) => {
                setChats(response.data.map((mess) => {
                    if (mess.lastMess.length > 17)
                        return {
                            ...mess,
                            lastMess: mess.lastMess.slice(0, 14) + '...'
                        }
                    return mess;
                }))
            })
        return () => {
            setChats([])
        }
    }, [])

    // Получение переписки по чату
    useEffect(() => {
        $api.post('/msg/getHistory', {...userStore, peer_id: activeChat.id, tag: activeChat.tag})
            .then((response) => {
                setMessages(response.data)
            })
        activeChatRef.current = activeChat;
        return () => {
            setMessages([])
        }
    }, [activeChat])

    // Инит сообщений для сокета
    useEffect(() => {
        messagesRef.current = messages;
    }, [messages])

    // Подключение WS
    useEffect(() => {
        const params = {
            userId: userStore.id,
            companyId: userStore.company_id,
        }
        const queryString = Object.keys(params).map((key) => `${key}=${encodeURIComponent(params[key])}`).join('&')
        ws.current = new WebSocket('ws://localhost:5000/ws/msgChat?'+queryString)
        ws.current.onopen = () => {
            console.log('US/ws: CONNECT')
        }
        ws.current.onmessage = (msg) => {
            const mess = JSON.parse(msg.data);
            console.log(mess)
            switch (mess.tag) {
                case 'tg':
                    setChats(prevState => {
                        if (!prevState.some((chat) => chat.id === mess.tg_user_id)) {
                            return [...prevState, {
                                id: mess.tg_user_id,
                                tag: mess.tag,
                                lastMess: mess.text,
                                firstName: mess.firstName,
                                date: mess.date
                            }]
                        }
                        return prevState.map((chat) => {
                            if (chat.id === mess.tg_user_id) {
                                return {
                                    id: mess.tg_user_id,
                                    tag: mess.tag,
                                    lastMess: mess.text,
                                    firstName: mess.firstName,
                                    date: mess.date
                                }
                            }
                            return chat
                        })
                    })
                    if (activeChatRef.current.id == mess.tg_user_id) {
                        setMessages(prevState => {
                            if (!prevState.some((message) => message.id === mess.id))
                                return [...prevState, {
                                    id: mess.id,
                                    out: 0,
                                    date: mess.date,
                                    text: mess.text
                                }]
                            return prevState
                        })
                    }
                    break;
                case 'vk':
                    setChats(prevState => {
                        if (!prevState.some((chat) => chat.id === mess.chat_id)) {
                            return [...prevState, {
                                id: mess.chat_id,
                                tag: mess.tag,
                                lastMess: mess.text,
                                firstName: mess.firstName,
                                date: mess.date
                            }]
                        }
                        return prevState.map((chat) => {
                            if (chat.id === mess.chat_id) {
                                return {
                                    id: mess.chat_id,
                                    tag: mess.tag,
                                    lastMess: mess.text,
                                    firstName: mess.firstName,
                                    lastName: mess.lastName,
                                    date: mess.date
                                }
                            }
                            return chat
                        })
                    })
                    if (activeChatRef.current.id == mess.chat_id) {
                        setMessages(prevState => {
                            if (!prevState.some((message) => message.id === mess.id))
                                return [...prevState, {
                                    id: mess.id,
                                    out: 0,
                                    date: mess.date,
                                    text: mess.text
                                }]
                            return prevState
                        })
                    }
                    break;
                default:
                    console.error('Not found mess')
            }
        }
        ws.current.close = () => {
            console.log('US/ws: CLOSE')
        }
        return () => {
            ws.current.close()
        }
    }, [])

    // Скролл вниз при изменении chatColumn
    useEffect(() => {
        if (chatColumn.current) {
            chatColumn.current.scrollTop = chatColumn.current.scrollHeight;
        }
    }, [chatColumn, messages])

    const handleSendMess = (e) => {
        e.preventDefault()
        // date, id, out, text
        $api.post('/msg/sendMessage', {...userStore, text: currMess, peer_id: activeChat.id, tag: activeChat.tag})
            .then((response) => {
                setMessages(prevState => [...prevState, {
                    id: response.id,
                    date: Date.now(),
                    out: 1,
                    text: currMess
                }])
                setCurrMess('')
            })
    };

    return (
        authStore.isLoading ?
            <Loading/>
            :
            <div className="userChat">
                <MyHeader className="myHeader"/>
                <div className="chat">
                    <div className="chat__column">
                        <div className="chat__column__mainUserInfo">
                            <img src={userChat.usAvatarMain} alt="Аватар пользователя"/>
                            <p>{userStore.name} {userStore.lastname}</p>
                        </div>
                        <div className="chat__column__inputSearch">
                            <SearchInput placeholder="Введите текст для поиска"/>
                        </div>
                        <div className="chat__column__chats">
                            {chats.map((chat) => (
                                <OutUser
                                    key={chat.id}
                                    image={userChat.usAvatarMain}
                                    fullName={`${chat.firstName} ${chat?.lastName ?? ''}`}
                                    shortText={chat.lastMess}
                                    nameTag={chat.tag}
                                    lastTimeMess={chat.date}
                                    onClick={() => {
                                        setIsFirstClickChat(true)
                                        setActiveChat(chat)
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                    {isFirstClickChat ?
                        <div className="chat__active">
                            <div className="chat__active__header">
                                <img src={userChat.usAvatarMain} alt="User photo"/>
                                <div className="chat__active__header__info">
                                    <h4>{activeChat.firstName} {activeChat.lastName ?? ''}</h4>
                                    <MyTag>{activeChat.tag}</MyTag>
                                </div>
                            </div>
                            <div className="chat__active__messSend">
                                <div className="chat__active__messSend__messages" ref={chatColumn}>
                                    {messages.map((mess) => {
                                        if (mess.out === 1)
                                            return <Sender key={mess.id}>
                                                {mess.text}
                                        </Sender>
                                        return <Recipient key={mess.id}
                                                          recipient={`${activeChat.firstName} ${activeChat?.lastName ?? ''}`}>
                                            {mess.text}
                                        </Recipient>
                                    })}
                                </div>
                                <div className="chat__active__messSend__send">
                                    <input type="text"
                                           value={currMess}
                                           onChange={(e) => setCurrMess(e.target.value)}
                                    />
                                    <button onClick={handleSendMess}>
                                        <img src={compChat.send} alt="Send"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="chat__dialog">
                            <img src={userChat.messGray} alt="Message"/>
                            <p>Выберите пользователя, с которым хотите начать чат</p>
                        </div>
                    }
                </div>
            </div>
    );
};

export default observer(UserChat);