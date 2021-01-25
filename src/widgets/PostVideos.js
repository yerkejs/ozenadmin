import React from 'react'
import '../css/Post.css'

const Video = ({video, fullscreen}) => (
    <video 
        style={{width: fullscreen ? '100%':'80%'}}
        className="post__video" 
        src={video.link}/>
)
const VideoLink = ({video, fullscreen}) => (
    <iframe
        className="post__video" 
        style={{width: fullscreen ? '100%':'80%'}}
        id="ytplayer" type="text/html" width="100%" height="200"
        src={video.link}
        frameborder="0"/>
)

class PostVideo extends React.Component {
    render () {
        let {data} = this.props
        let fullscreen = data.length == 1
        if (data.length == 0) {
            return null
        } else {
            return (
                <div className="post__videos">
                    {data.map((video , i) => {
                        if (video.type === "embed") {
                            return <VideoLink 
                                        fullscreen={fullscreen}
                                        video={video}/>
                        } else {
                            return <Video   
                                        fullscreen={fullscreen}
                                        video={video}/>
                        }
                    })}
                </div>
            )
        }
    }
}

export default PostVideo