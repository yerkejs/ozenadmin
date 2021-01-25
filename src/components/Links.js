import React from 'react'

const VideoEmbed = (props) => (
  <div className="video__frame">
    <button
      onClick={()=>props.onRemoveURL(props.url)}
      className="button_control">
      Удалить
    </button>
    <iframe src={props.url}/>
  </div>
)

class Links extends React.Component {
   render () {
     if (this.props.links.length > 0) {
       return (
         <div className="section">
            <h3>Ссылки</h3>
            <div className="links__layout">
              {this.props.links.map((link, i) =>
                <VideoEmbed url={link}
                  onRemoveURL={this.props.onRemoveURL}
                />
              )}
            </div>
         </div>
       )
     } else {
       return null
     }
   }
}
export default Links
