import React from 'react'
import {findDifference} from '../utils/dayFormatter'

import PostImages from '../widgets/PostImages'
import PostVideo from '../widgets/PostVideos'
import PostAudios from '../widgets/PostAudios'
import '../css/Post.css'

const PostHeader = ({date, title}) => (
    <div className="post__header">
        <img
            className="post__logo"
            src={require("../media/logo_black.jpg")}
        />
        <div className="post__header__content">
            <label className="post__title">
                Õzen.Stream <span>{title ? findDifference(date) : ""}</span>
            </label>
            <label className="post__date">
                {title || findDifference(date)}
            </label>
        </div>  
    </div>
)


class Post extends React.Component {
    render () {
        let { news, width, index } = this.props
        let post_width = width > 760 ? (width > 1112 ? (width * 0.6 - 50) / 2 - 40 : (width * 0.6 - 50) - 36) : (width - 90)
        return (
            <div
                style={{ width: post_width }}
                className="Post">
                <PostHeader
                    date={news.date}
                    title={news.title}
                />
                {news.content != "" ? 
                    <p>{news.content}</p> 
                        : 
                    null}
                <PostImages
                    images={news.metadata.image}
                />
                <PostVideo
                    data={news.metadata.video}
                />
                <PostAudios
                    data={news.metadata.audio}
                />
                <button 
                    onClick={()=>this.props.onRemovePost(news.id, index)}
                    className="delete__btn">
                    Удалить
                </button>

            </div>
        )
    }
}

export default Post;