import React, {useState} from 'react';
import TextArea from "../UI/textarea/TextArea";
import {primary} from "../../images/images";
import PrimaryBlock from "../PrimaryBlock/PrimaryBlock";
import './CreactePost.scss';

const CreatePost = ({posts, setPosts, ...props}) => {
    const [body, setBody] = useState('');

    const addNewPost = (e) => {
        e.preventDefault();
        const newPost = {
            id: Date.now(),
            body,
        }
        setPosts([...posts, newPost]);
    }

    return (
        <PrimaryBlock header="Создать пост">
            <TextArea
                value={body}
                placeholder="Введите здесь текст для поста"
                onChange={(e) => setBody(e.target.value)}
            />
            <div className="group__post__action">
                <button className="group__post__action__download">
                    <img src={primary.sendDownload} alt="Send download"/>
                    <p>Photo / Video</p>
                </button>
                <button className="group__post__action__send"
                        onClick={addNewPost}
                >
                    Отправить
                </button>
            </div>
        </PrimaryBlock>
    );
};

export default CreatePost;