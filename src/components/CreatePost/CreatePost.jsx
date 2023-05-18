import React, {useState} from 'react';
import TextArea from "../UI/textarea/TextArea";
import {primary} from "../../images/images";
import PrimaryBlock from "../PrimaryBlock/PrimaryBlock";
import './CreactePost.scss';

const CreatePost = ({posts, setPosts, ...props}) => {
    const [body, setBody] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [nameUploadFile, setNameUploadFile] = useState(null);

    const addNewPost = (e) => {
        e.preventDefault();

        const date = new Date();
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;

        const newPost = {
            id: Date.now(),
            body,
            img: selectedImage,
            publication: formattedDate,
        }
        setPosts([newPost, ...posts]);
    }

    const handleDownloadImage = (e) => {
        e.preventDefault()
        if (e.target.files[0]) {
            setNameUploadFile(e.target.files[0].name);
            setSelectedImage(URL.createObjectURL(e.target.files[0]))
        }
    }

    return (
        <PrimaryBlock header="Создать пост">
            <TextArea
                value={body}
                placeholder="Введите здесь текст для поста"
                onChange={(e) => setBody(e.target.value)}
            />
            <div className="group__post__action">
                <button className="group__post__action__download"
                        onClick={() => document.getElementById('downloadImage').click()}
                >
                    <img src={primary.sendDownload} alt="Send download"/>
                    {nameUploadFile ? <p>{nameUploadFile}</p> : <p>Фотография</p>}
                </button>
                <input
                    id="downloadImage"
                    type="file"
                    accept="image/*"
                    style={{display: 'none'}}
                    onChange={handleDownloadImage}
                />
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