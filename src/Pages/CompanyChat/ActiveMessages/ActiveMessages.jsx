import React from 'react';
import Sender from "../../../components/Sender/Sender";
import Recipient from "../../../components/Recipient/Recipient";

const ActiveMessages = ({messages, activeChat, userStore}) => {
    return (
        <>
            {messages.map(chat => {
                if (chat.id === activeChat.id) {
                    return chat.messages.map(message => {
                        if (message.user_id === userStore.id)
                            return (
                                <Sender key={message.id}>
                                    {message.body}
                                </Sender>
                            )
                        return (
                            <Recipient recipient={`${message.name} ${message.lastname}`} key={message.id}>
                                {message.body}
                            </Recipient>
                        )
                    })
                }
            })}
        </>
    );
};

export default ActiveMessages;