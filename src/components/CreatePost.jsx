import React from 'react'
import Documents from './Documents'
import Links from './Links'
import { Spinner } from '../widgets/Spinner'
import PostTextInput from '../widgets/PostTextInput'
import Select from '../components/Select'
import { firestore } from '../backend'
import * as fileUtil from '../utils/handleFile'

import '../css/CreatePost.css'

class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      loading: false,
      videoLink: "",
      content: "",
      title: "",
      metadata: {
        "image": [],
        "audio": [],
        "video": []
      },
      links: [],
      postDate: Date.now(),
      downloadURLs: [],
      audioTitle: "",
      audioURL: "",
      w: window.innerWidth
    }
  }

  // VIEW LIFE CYCLE
  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }
  handleResize = () => this.setState({
    w: window.innerWidth
  });



  // adding new file
  handleFileUpload = (e) => {
    let file = e.target.files[0]
    if (this.state.files.filter(object => object.name == file.name).length == 0)  {
      this.setState({ files: this.state.files.concat(file) })
      var metadata = this.state.metadata
      let file_type = fileUtil.findDocType(file.type)
      metadata[file_type].push({
        name: file.name
      })
      if (file_type == "audio") {
        this.setState({
          audioTitle: "",
          audioURL: ""
        })
        metadata[file_type][metadata[file_type].length - 1].title = ""
        metadata[file_type][metadata[file_type].length - 1].url = ""
        metadata[file_type][metadata[file_type].length - 1].isEdited = false
      }
      e.target.value = null
      this.setState({ metadata }, () => {
        console.log("init", metadata)
      })
    }
  }
  onFileRemove = (index, type, name) => {
    var files = this.state.files

    let fileIndex = files.indexOf(files.filter(obj => obj.name == name)[0])
    files.splice(fileIndex, 1)
    var metadata = this.state.metadata
    let doc = metadata[type].filter(obj => obj.name == name)[0]
    let i = metadata[type].indexOf(doc)
    metadata[type].splice(i, 1)
    this.setState({ metadata, files })
  }
  onRemoveURL = (url) => {
    var links = this.state.links
    let linkIndex = links.indexOf(url)
    var metadata = this.state.metadata
    var current = metadata["video"].filter(obj => obj.link == url)[0]
    let index = metadata["video"].indexOf(current)
    metadata["video"].splice(index, 1)
    links.splice(linkIndex, 1)
    this.setState({ metadata, links })
  }

  onInputChange = (name, value) => {
    this.setState({ [name]: value })
  }
  onAddLinkToVideo = (url) => {
    if (!this.state.links.includes(url)) {
      var links = this.state.links
      links.push(url)

      let videoObject = { link: url, type: "embed" }
      var metadata = this.state.metadata
      metadata["video"].push(videoObject)
      this.setState({ metadata, links })
    }
  }
  onSubmit = () => {
    if (this.state.files.length != 0) {
      this.uploadFiles()
    } else if (this.state.links.length != 0 || (this.state.title != "" && this.state.content != "")) {
      this.sendToDB()
    }
  }

  uploadFiles = () => {
    var postDate = Date.now()
    this.setState({ loading: true, postDate })
    this.state.files.forEach(async (file, i) => {
      var result = await fileUtil.uploadFiles(postDate, file, "File" + (i + 1))
      if (result.status == "error") {
        this.setState({ loading: false })
        alert(result.message)
      } else {
        var downloadURLs = this.state.downloadURLs
        if (this.state.downloadURLs.length + 1 == this.state.files.length) {
          downloadURLs.push(result)
          this.setState({downloadURLs: downloadURLs})
          this.handleOutputMetadata(downloadURLs, postDate)
        } else {
          downloadURLs.push(result)
          this.setState({downloadURLs: downloadURLs})
        }
      }
    });
  }
  handleOutputMetadata = (results, postDate) => {
    var metadata = this.state.metadata
    results.forEach((item, i) => {
      var file_type = fileUtil.findDocType(item.type)

      var currentObject = metadata[file_type].filter(obj => obj.name == item.name)[0]
      let index = metadata[file_type].indexOf(currentObject)
      // adding link
      currentObject["link"] = item.link
      metadata[file_type][index] = currentObject
    });
    this.setState({ metadata })
    this.sendToDB(postDate)
    console.log("allocated", metadata)
  }
  sendToDB = async (postID) => {
    let self = this
    var post_id = postID || Date.now()
    var post = {}
    var createdDate = post_id
    if (this.state.links.length != 0 || this.state.metadata.length != 0) {
      post["metadata"] = this.state.metadata
    }
    if (this.state.title != "") {
      post["title"] = this.state.title
    }
    if (this.state.content != "") {
      post["content"] = this.state.content
    }
    post["date"] = createdDate
    try {
      const response = await firestore.setPost(post_id, post)
      this.setState({
            files: [],
            loading: false,
            videoLink: "",
            content: "",
            title: "",
            metadata: {
              "image": [],
              "audio": [],
              "video": []
            },
            links: []
          })
    } catch (e) {
      this.setState({ loading: false })
      alert(e.message)
    }
  }
  onAudioEdited = (name) => {

    let metadata = this.state.metadata
    let currentAudioData = metadata["audio"].filter(obj => obj.name == name)[0]
    let index = metadata["audio"].indexOf(currentAudioData)
    metadata["audio"][index].title = this.state.audioTitle
    metadata["audio"][index].isEdited = true
    metadata["audio"][index].url = this.state.audioURL
    console.log("audio", metadata)
    this.setState({
      metadata
    })
  }

  render () {
    return (
      <div className="CreatePost">
        {this.state.loading ? 
          <Spinner/> : null
        }
        <PostTextInput
          handleFileUpload={this.handleFileUpload}
          videoLink={this.state.videoLink}
          content={this.state.content}
          title={this.state.title}
          onInputChange={this.onInputChange}
          onAddLinkToVideo={this.onAddLinkToVideo}
        />
        <Links
          links={this.state.links}
          onRemoveURL={this.onRemoveURL}
        />
        <Documents
          w={this.state.w}
          documents={this.state.files}
          onFileRemove={this.onFileRemove}
          audioTitle={this.state.audioTitle}
          audioURL={this.state.audioURL}
          onInputChange={this.onInputChange}
          onAudioEdited={this.onAudioEdited}
          metadata={this.state.metadata}
        />
        {this.state.files.length > 0 || this.state.links.length > 0 ?
          <button
            className="send_button"
            onClick={this.onSubmit}>Готово</button> : null
        }
      </div>
    )
  }
}
export default CreatePost;
