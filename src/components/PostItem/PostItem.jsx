import React from 'react';
import './PostItem.scss';
import {primary} from "../../images/images";
import MyTag from "../UI/tag/MyTag";

const PostItem = ({post, ...props}) => {
    return (
        <div className="group__post__item">
            <div className="group__post__item__header">
                <img src={primary.avatar} alt="Avatar"/>
                <div className="group__post__item__header__info">
                    <span>Имя Фамилия</span>
                    <p>{post.publication}</p>
                </div>
                <div className="group__post__item__header__mess">
                    <MyTag>VK</MyTag>
                    <MyTag>INSTAGRAM</MyTag>
                    <MyTag>TG</MyTag>
                </div>
            </div>
            <div className="group__post__item__desc">
                <p>{post.body}</p>
            </div>
            {post.img ?
                <div className="group__post__item__photo">
                    <img src={post.img} alt="Image"/>
                </div>
                :
                null
            }
            <div className="group__post__item__statistic">
                <img src={primary.like} alt="Like"/>
                <p>1050</p>
                <img src={primary.comment} alt="Comment"/>
                <p>75</p>
                <img src={primary.share} alt="Share"/>
                <p>30</p>
            </div>
        </div>
    );
};

export default PostItem;