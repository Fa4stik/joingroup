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
                    <span>{post.owner}</span>
                    <p>{post.publication}</p>
                </div>
                <div className="group__post__item__header__mess">
                    {post.isIg && <MyTag>INSTA</MyTag>}
                    {post.isVk && <MyTag>VK</MyTag>}
                    {post.isTg && <MyTag>TG</MyTag>}
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
                <p>{post.like}</p>
                <img src={primary.comment} alt="Comment"/>
                <p>{post.comment}</p>
                <img src={primary.share} alt="Share"/>
                <p>{post.share}</p>
            </div>
        </div>
    );
};

export default PostItem;