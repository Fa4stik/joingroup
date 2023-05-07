import React, {useState} from 'react';
import './Primary.scss';
import MyHeader from "../../components/UI/navbar/MyHeader";
import {primary} from "../../images/images";
import PrimaryBlock from "../../components/PrimaryBlock/PrimaryBlock";
import TextArea from "../../components/UI/textarea/TextArea";
import PostItem from "../../components/PostItem/PostItem";
import CreatePost from "../../components/CreatePost/CreatePost";

const Primary = () => {
    const [descText, setDescText] = useState('Эта группа дает возможность связываться с друзьями и близкими людьми по всему миру. Здесь' +
        ' вы можете пообщаться с людьми, а также шарить фото и видео.' +
        ' Вы можете создавать беседы и конференции для более активного обмена информацией.')

    const [posts, setPosts] = useState([
        {body: 'Эта группа дает возможность связываться с друзьями и близкими людьми по всему миру.',
        img: primary.stockImg1},
    ]);

    const handleChange = (event) => {
        const inputValue = event.target.value;
        if (inputValue.length <= 216) {
            setDescText(inputValue);
        }
    };

    return (
        <div className="primary">
            <MyHeader className="myHeader"/>
            <div className="primary__info">
                <div className="cover"> {/* Поменять цвет */}
                    <button className="cover__button">
                        <img src={primary.download} alt="Download"/>
                    </button>
                </div>
                <div className="statistic">
                    <button className="statistic__avatar">
                        <div className="statistic__avatar__circle">
                            <img src={primary.download} alt="Download"/>
                        </div>
                    </button>
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
                    </div>
                    <div className="group__post">
                        <CreatePost posts={posts} setPosts={setPosts}/>
                        {posts.map((post, index) =>
                            <PostItem post={post} key={index+1}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Primary;