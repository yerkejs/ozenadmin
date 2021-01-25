import React from 'react'


class PostTextInput extends React.Component {
  render () {
    return (
      <div className="RichTextInput">
        <input
          className="file__input"
          type="file"
          accept=".jpg, .jpeg, .png, .mp4, .wav, .mp3, .gif"
          onChange={this.props.handleFileUpload}/>
        <input
          className="title__input"
          placeholder="Название"
          onChange={(e)=>this.props.onInputChange("title", e.target.value)}
        />
        <textarea
          className="content__input"
          placeholder="Описание"
          value={this.props.content}
          onChange={(e)=>this.props.onInputChange("content",e.target.value)}
        />
        <div className="links__div">
          <input
            value={this.props.videoLink}
            placeholder="Ссылка на видео"
            onChange={(e)=>this.props.onInputChange("videoLink",e.target.value)}
          />
          <button onClick={() => {
            if (this.props.videoLink) {
              this.props.onAddLinkToVideo(this.props.videoLink)
            }
          }}>Добавить</button>
        </div>
      </div>
    )
  }
}
export default PostTextInput;
