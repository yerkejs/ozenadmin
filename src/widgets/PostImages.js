import React from 'react'
import '../css/Post.css'

class PostImages extends React.Component {
    render () {
        if (this.props.images.length === 0) {
            return null
        } else {
            return (
                <div className="post__images">
                    {this.props.images.map((data, i) => 
                        <img
                            className="post__image"
                            src={data.link}
                            style={{ 
                                marginLeft: i == 0 ? 0 : 16,
                                width: this.props.images.length == 1 ? '100%' : '60%' 
                            }}
                        />
                    )}
                </div>
            )
        }
    }
}
export default PostImages