import React from 'react'
import '../css/Post.css'
import Post from '../components/Post'


const Music = ({music}) => (
    <div className="post__audio"> 
        <img 
            className="icon__music"
            src={require("../media/play.png")}
        />
        <div className="post__audio__content">
            <label>{music.title || music.name}</label>
            <caption>Аудио</caption>
        </div>
    </div>
)

class PostAudios extends React.Component {
    render () {
        let {data} = this.props
        if (data.length == 0) {
            return null
        } else {
            return (
                <div className="post__audios">
                    {data.map((music) =>
                        <Music music={music}/>
                    )}
                </div>
            )
        }
    }
}

export default PostAudios