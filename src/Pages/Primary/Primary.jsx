import React, {useContext, useState} from 'react';
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

const Primary = () => {
    const { authStore } = useContext(AuthContext);

    useAuthRedirect();


    const [descText, setDescText] = useState('Эта группа дает возможность связываться с друзьями и близкими людьми по всему миру. Здесь' +
        ' вы можете пообщаться с людьми, а также шарить фото и видео.' +
        ' Вы можете создавать беседы и конференции для более активного обмена информацией.')

    const [posts, setPosts] = useState([
        {
            body: 'Эта группа дает возможность связываться с друзьями и близкими людьми по всему миру.',
            img: primary.stockImg1,
            publication: '16.06.2016 23:11:53',
        },
    ]);

    const [imageCover, setImageCover] = useState(null);
    const [imageStatistic, setImageStatistic] = useState(null);

    if (authStore.isLoading) {
        return (
            <Loading/>
        );
    }

    const handleChange = (event) => {
        const inputValue = event.target.value;
        if (inputValue.length <= 216) {
            setDescText(inputValue);
        }
    };

    const handleImageCover = (e) => {
        e.preventDefault();
        if (e.target.files[0]) {
            setImageCover(URL.createObjectURL(e.target.files[0]));
        }
    }

    const handleImageStatistic = (e) => {
        e.preventDefault();
        if (e.target.files[0]) {
            setImageStatistic(URL.createObjectURL(e.target.files[0]));
        }
    }

    return (
        <div className="primary">
            <MyHeader className="myHeader"/>
            <div className="primary__info">
                <div className="cover">
                    <button className="cover__button"
                            onClick={() => document.getElementById('coverImageUpload').click()}
                    >
                        {imageCover ?
                            <img src={imageCover} className="cover__button__image" alt="Cover image"/>
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
                            {imageStatistic ?
                                <img src={imageStatistic} className="statistic__avatar__circle__image" alt="Download"/>
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
                        <h3>Название группы</h3>
                        <p>Город, адрес</p>
                    </div>
                    <div className="statistic__subscribe">
                        <h3>100k</h3>
                        <p>Подписчиков</p>
                    </div>
                    <div className="statistic__posts">
                        <h3>1k</h3>
                        <p>Постов</p>
                    </div>
                    <div className="statistic__audio">
                        <h3>15k</h3>
                        <p>Аудиозаписей</p>
                    </div>
                    <div className="statistic__story">
                        <h3>50</h3>
                        <p>Сторис</p>
                    </div>
                </div>
                <div className="group">
                    <div className="group__settings">
                        <PrimaryBlock header={"Основная информация"} description={"Описание"}>
                            <TextArea placeholder="Введите здесь описание"
                                      value={descText}
                                      onChange={handleChange}
                            />
                        </PrimaryBlock>
                        <PrimaryBlock header="Дополнительная информация">
                            <h4>Сайт</h4>
                            <input type="text"/>
                            <h4>Телефон</h4>
                            <input type="text"/>
                            <h4>Город</h4>
                            <input type="text"/>
                        </PrimaryBlock>
                        <button className="group__settings__save">Сохранить</button>
                    </div>
                    <div className="group__post">
                        <CreatePost posts={posts} setPosts={setPosts}/>
                        {posts.map((post, index) =>
                            <PostItem post={post} key={index + 1}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Primary;