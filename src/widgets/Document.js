import React from 'react'
import '../css/CreatePost.css'

const docType = {
  "audio": "Аудиофайл",
  "video": "Видео",
  "image": "Фотография"
}



const ImageFile = (props) => (
  <img
    className="file__img"
    src={props.url}
  />
)
export const VideoFile = (props) => (
  <video
    className="file__img"
    src={props.url}
    controls
  />
)
const AudioFile = (props) => (
  <div className="audio__file">
    <div className="row__start">
        <div className="icon">
            <img
              src="https://image.flaticon.com/icons/svg/2948/2948124.svg"
            />
        </div>
        <label className="audio__name">{props.name}</label>
    </div>
    <AudioDetails
      audioURL={props.audioURL}
      audioTitle={props.audioTitle}
      onInputChange={props.onInputChange}
      onAudioEdited={props.onAudioEdited}
      name={props.name}
      isEdited={props.isEdited}
    />
  </div>
)

const AudioDetails = (props) => {
  if (props.isEdited) {
    return (
      <div className="audio__details">
        <label>{props.audioTitle}</label>
        <label>{props.audioURL}</label>
      </div>
    )
  } else {
    return (
      <div className="audio__details">
        <input
          placeholder="Название"
          value={props.audioTitle}
          onChange={(e)=>props.onInputChange("audioTitle", e.target.value)}
        />
        <input
          placeholder="Ссылка"
          value={props.audioURL}
          onChange={(e)=>props.onInputChange("audioURL", e.target.value)}
        />
        <button onClick={()=>{
          var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
          var regex = new RegExp(expression);
          if (props.audioURL.match(regex) && props.audioTitle != "") {
            props.onAudioEdited(props.name)
          } else {
            alert("Введите корректные данные")
          }
        }}>Готово</button>
      </div>
    )
  }
}


class Document extends React.Component {

  renderDocFile = (type, file, audioOptions) => {
    if (type == "image") {
      return <ImageFile url={URL.createObjectURL(file)}/>
    } else if (type == "video"){
      return <VideoFile url={URL.createObjectURL(file)}/>
    } else {
      let currentAudio = audioOptions.metadata["audio"].filter(obj => obj.name == file.name)[0]
      let isEdited = currentAudio.isEdited
      return <AudioFile
                audioTitle={audioOptions.audioTitle}
                audioURL={audioOptions.audioURL}
                onInputChange={audioOptions.onInputChange}
                name={file.name}
                isEdited={isEdited}
                onAudioEdited={audioOptions.onAudioEdited}
              />
    }
  }

  render () {
    let {name, type, file, index, audioURL, audioTitle, metadata, onInputChange, onAudioEdited} = this.props

    return (
      <div
        style={{
          marginLeft: index == 0 ? 0 : 20,
        }}
        className="document">
          <div className="document__controller row__space">
            <label>{docType[type]}</label>
            <img
              className="post__close"
              src={require('../media/icon__close.png')}
              onClick={()=>{
                this.props.onFileRemove(index, type, name)
              }}/>
          </div>
          {this.renderDocFile(type, file, {audioURL, audioTitle, metadata, onInputChange, onAudioEdited} )}
      </div>
    )
  }
}
export default Document;
