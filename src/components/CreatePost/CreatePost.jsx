import React, {useContext, useEffect, useRef, useState} from 'react';
import TextArea from "../UI/textarea/TextArea";
import {primary} from "../../images/images";
import PrimaryBlock from "../PrimaryBlock/PrimaryBlock";
import './CreactePost.scss';
import ToggleSwitch from "../UI/ToggleSwitch/ToggleSwitch";
import {AuthContext, CompContext} from "../../context";
import {observer} from "mobx-react-lite";
import VkServices from "../../services/VkServices";
import TgServices from "../../services/TgServices";
import IgServices from "../../services/IgServices";
import BlockNotification from "../BlockNotification/BlockNotification";

const CreatePost = ({posts, setPosts, ...props}) => {
    const [body, setBody] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [nameUploadFile, setNameUploadFile] = useState(null);
    const { compStore } = useContext(CompContext);
    const { userStore } = useContext(AuthContext);

    const [notification, setNotification] = useState({isNotification: false, message: ''});
    const timeoutId = useRef(null);

    const addNewPost = async (e) => {
        e.preventDefault();

        if (compStore.ig && !selectedImage) {
            handleNotification("Для отправки поста в инстаграм прикрепите изображение")
        } else {
            const date = new Date();
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const seconds = date.getSeconds().toString().padStart(2, '0');
            const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;

            let resVk;
            let resTg;
            let resIG;

            if (compStore.vk) {
                resVk = await VkServices.createPost(userStore, body, selectedImage);
            }

            if (compStore.tg) {
                resTg = await TgServices.createPost(userStore, body, selectedImage);
            }

            if (compStore.ig) {
                resIG = await IgServices.createPost(userStore, body, selectedImage);
            }

            console.log(resVk)
            console.log(resTg)
            console.log(resIG)

            const newPost = {
                id: Date.now(),
                owner: `${userStore.name} ${userStore.lastname}`,
                body,
                isVk: compStore.vk,
                isTg: compStore.tg,
                isIg: compStore.ig,
                img: URL.createObjectURL(selectedImage),
                publication: formattedDate,
            }
            setPosts([newPost, ...posts]);
        }
    }

    const handleDownloadImage = (e) => {
        e.preventDefault()
        if (e.target.files[0]) {
            let nmFile = e.target.files[0].name;
            if (nmFile.length > 20) {
                const first10 = nmFile.substring(0, 10);
                const last6 = nmFile.substring(nmFile.length-6, nmFile.length);
                nmFile = first10 + '...' + last6;
            }
            setNameUploadFile(nmFile);
            setSelectedImage(e.target.files[0])
        }
    }

    const handleNotification = (message) => {
        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
        }

        setNotification({ isNotification: true, message: message });
        timeoutId.current = setTimeout(() => {
            setNotification({ isNotification: false, message: '' });
        }, 5000);
    }

    return (
        <PrimaryBlock header="Создать пост">
            <TextArea
                value={body}
                placeholder="Введите здесь текст для поста"
                onChange={(e) => setBody(e.target.value)}
            />
            <div className="group__post__toggle">
                <ToggleSwitch nameMess="INSTA"
                              contextMess={compStore.ig}
                              setContextMess={compStore.setIg}
                />
                <ToggleSwitch nameMess="VK"
                              contextMess={compStore.vk}
                              setContextMess={compStore.setVk}
                />
                <ToggleSwitch nameMess="TG"
                              contextMess={compStore.tg}
                              setContextMess={compStore.setTg}
                />
            </div>
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
            {notification.isNotification &&
                <BlockNotification message={notification.message} timeout={5000}/>
            }
        </PrimaryBlock>
    );
};

export default observer(CreatePost);