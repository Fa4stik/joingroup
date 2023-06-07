import React, {useContext, useEffect, useRef, useState} from 'react';
import './Primary.scss';
import MyHeader from "../../components/UI/navbar/MyHeader";
import {primary} from "../../images/images";
import PrimaryBlock from "../../components/PrimaryBlock/PrimaryBlock";
import TextArea from "../../components/UI/textarea/TextArea";
import PostItem from "../../components/PostItem/PostItem";
import CreatePost from "../../components/CreatePost/CreatePost";
import {useAuthRedirect} from "../../hooks/useAuthRedirect";
import {AuthContext} from "../../context";
import Loading from "../../components/Loading/Loading";
import {observer} from "mobx-react-lite";
import MsgServices from "../../services/MsgServices";
import convertTimestamp from "../../Convert/convertTimestamp";
import numeral from 'numeral';
import BlockNotification from "../../components/BlockNotification/BlockNotification";

const Primary = () => {
    const { authStore, userStore } = useContext(AuthContext);

    useAuthRedirect();

    const [posts, setPosts] = useState([]);
    const [groupInfo, setGroupInfo] = useState({});

    useEffect(() => {

    }, [userStore]);

    useEffect(() => {
        (async () => {
            let msgPosts = await MsgServices.getPosts(userStore);
            let msgGroupInfo = await MsgServices.getGroupInfo(userStore);

            setGroupInfo({
                name: msgGroupInfo?.data.name,
                avatar: msgGroupInfo?.data.avatar,
                cover: msgGroupInfo?.data.cover,
                site: msgGroupInfo?.data.site,
                address: msgGroupInfo?.data.address,
                description: msgGroupInfo?.data.description,
                membersCount: msgGroupInfo?.data.membersCount,
                postsCount: msgPosts?.data.length,
                storiesCount: msgGroupInfo?.data.storiesCount,
                videoCount: msgGroupInfo?.data.videoCount,
            })

            console.log(groupInfo);

            msgPosts.data.map((post) => {
                setPosts((prevPosts) => [...prevPosts, {
                    owner: `${post.owner_first} ${post.owner_last}`,
                    publication: convertTimestamp(post.date),
                    body: post.text,
                    isVk: post.vk,
                    isTg: post.tg,
                    isIg: post.ig,
                    img: post.images,
                    like: post.likeCount,
                    comment: post.commentCount,
                    share: post.repostCount
                }]);
            })
        })();
    }, [])

    const handleDesc = (e) => {
        e.preventDefault();
        const description = e.target.value;
        if (description.length <= 216) {
            setGroupInfo({...groupInfo, description})
        }
    };

    const handleSite = (e) => {
        e.preventDefault();
        const site = e.target.value;
        if (site.length <= 30) {
            setGroupInfo({...groupInfo, site})
        }
    }

    const handlePhone= (e) => {
        e.preventDefault();
        const phone = e.target.value;
        if (phone.length <= 12) {
            setGroupInfo({...groupInfo, phone})
        }
    }

    const handleAddress= (e) => {
        e.preventDefault();
        const address = e.target.value;
        if (address.length <= 80) {
            setGroupInfo({...groupInfo, address})
        }
    }

    const handleImageCover = (e) => {
        e.preventDefault();
        if (e.target.files[0]) {
            const cover = e.target.files[0];
            const cover_prev = e.target.files[0];
            setGroupInfo({...groupInfo, cover, cover_prev});
        }
    }

    const handleImageStatistic = (e) => {
        e.preventDefault();
        if (e.target.files[0]) {
            const avatar = e.target.files[0];
            const avatar_prev = e.target.files[0];
            setGroupInfo({...groupInfo, avatar, avatar_prev});
        }
    }

    const handleSaveGroupInfo = async (e) => {
        e.preventDefault();
        const response = await MsgServices.setGroupInfo(userStore, groupInfo);
        setGroupInfo({...groupInfo, cover_prev: null, avatar_prev: null})
        console.log(response)
    }

    return (
        authStore.isLoading ?
            <Loading/>
            :
            <div className="primary">
                <MyHeader className="myHeader"/>
                <div className="primary__info">
                    <div className="cover">
                        <button className="cover__button"
                                onClick={() => document.getElementById('coverImageUpload').click()}
                        >
                            {groupInfo?.cover ?
                                <img src={URL.createObjectURL(groupInfo.cover)} className="cover__button__image" alt="Cover image"/>
                                :
                                <img src={primary.download} className="cover__button__nanImage" alt="Download"/>
                            }
                        </button>
                        <input id="coverImageUpload"
                               type="file"
                               accept="image/*"
                               style={{display: 'none'}}
                               onChange={handleImageCover}
                        />
                    </div>
                    <div className="statistic">
                        <button className="statistic__avatar"
                                onClick={() => document.getElementById('statisticImageUpload').click()}
                        >
                            <div className="statistic__avatar__circle">
                                {groupInfo?.avatar ?
                                    <img src={URL.createObjectURL(groupInfo.avatar)} className="statistic__avatar__circle__image" alt="Download"/>
                                    :
                                    <img src={primary.download} className="statistic__avatar__circle__nanImage"
                                         alt="Download"/>
                                }
                            </div>
                        </button>
                        <input id="statisticImageUpload"
                               type="file"
                               accept="image/*"
                               style={{display: 'none'}}
                               onChange={handleImageStatistic}
                        />
                        <div className="statistic__infoGroup">
                            <h3>{groupInfo?.name || 'Название группы'}</h3>
                            <p>{groupInfo?.address || 'Город, адрес'}</p>
                        </div>
                        <div className="statistic__subscribe">
                            <h3>{numeral(groupInfo?.membersCount).format('0a')}</h3>
                            <p>Подписчиков</p>
                        </div>
                        <div className="statistic__posts">
                            <h3>{numeral(groupInfo?.postsCount).format('0a')}</h3>
                            <p>Постов</p>
                        </div>
                        <div className="statistic__audio">
                            <h3>{numeral(groupInfo?.videoCount).format('0a')}</h3>
                            <p>Аудиозаписей</p>
                        </div>
                        <div className="statistic__story">
                            <h3>{numeral(groupInfo?.storiesCount).format('0a')}</h3>
                            <p>Сторис</p>
                        </div>
                    </div>
                    <div className="group">
                        <div className="group__settings">
                            <PrimaryBlock header={"Основная информация"} description={"Описание"}>
                                <TextArea placeholder="Введите здесь описание"
                                          value={groupInfo?.description}
                                          onChange={handleDesc}
                                />
                            </PrimaryBlock>
                            <PrimaryBlock header="Дополнительная информация">
                                <h4>Сайт</h4>
                                <input type="text"
                                       value={groupInfo?.site}
                                       onChange={handleSite}
                                />
                                <h4>Телефон</h4>
                                <input type="text"
                                       onChange={handlePhone}
                                />
                                <h4>Город</h4>
                                <input type="text"
                                       value={groupInfo?.address}
                                       onChange={handleAddress}
                                />
                            </PrimaryBlock>
                            <button className="group__settings__save"
                                    onClick={handleSaveGroupInfo}
                            >
                                Сохранить
                            </button>
                        </div>
                        <div className="group__post">
                            <CreatePost posts={posts} setPosts={setPosts}/>
                            {posts.map((post, index) => <PostItem post={post} key={index + 1}/>
                            )}
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default observer(Primary);