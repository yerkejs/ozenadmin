import React from 'react'
import * as fileUtil from '../utils/handleFile'
import Document from '../widgets/Document'

const doc_types = {
  "audio": "Аудиофайлы",
  "video": "Видео",
  "image": "Изображения"
}


const Section = (props) => {

  let { audioURL, metadata, audioTitle, documents, docType } = props
  let sectionData = documents.filter(obj => fileUtil.findDocType(obj.type) == docType)

  return (
    <div className="documents__layout">
        {sectionData.map((doc, i) =>
          <Document
            index={i}
            type={fileUtil.findDocType(doc.type)}
            name={doc.name}
            file={doc}
            onFileRemove={props.onFileRemove}
            audioURL={audioURL}
            audioTitle={audioTitle}
            metadata={metadata}
            onInputChange={props.onInputChange}
            onAudioEdited={props.onAudioEdited}
          />
      )}
    </div>
  )
}



export default class Documents extends React.Component {

  render () {
    let { documents, audioURL, audioTitle, metadata } = this.props
    if (documents.length > 0) {
      return (
        <div className="Documents">
            <h3>Документы</h3>
            <div className="sections_list">
                  {Object.keys(metadata).map((docType, k) =>  {
                    if (metadata[docType].length > 0) {
                      return (
                        <div className="sectionWrapper">
                            <h4>{doc_types[docType]}</h4>
                            <Section
                              docType={docType}
                              audioURL={audioURL}
                              audioTitle={audioTitle}
                              documents={documents}
                              metadata={metadata}
                              onInputChange={this.props.onInputChange}
                              onAudioEdited={this.props.onAudioEdited}
                              onFileRemove={this.props.onFileRemove}
                            />
                        </div>
                      )
                    } else {
                      return null
                    }
                  })}
            </div>
        </div>
      )
    } else {
      return null
    }
  }
}
