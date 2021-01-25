import React from 'react'
import { firestore, auth } from '../backend'
import Post from './Post'
import '../css/Post.css'


const limitPosts = 5

class Posts extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      news: [],
      loading: false,
      lastDocument: null,
      w: window.innerWidth,
      showMenu: false
    }
  }
  componentDidMount () {
    this.loadPosts()
    window.addEventListener('resize', this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions = () => {
    this.setState({ w: window.innerWidth });
  }

  loadPosts = () => {
    if (this.state.lastDocument === null) {
      this.loadInitialPosts()
    } else if (this.state.lastDocument !== false){
      this.loadMorePosts() 
    }
  }
  loadInitialPosts = async () => {
    console.log("[Posts] load initial")
    this.setState({ loading: true })
    try {
      const res = await firestore.loadPosts(limitPosts)
      if (res.docs.length > 0) {
        var news = []
        res.docs.forEach(doc => {
          var object = doc.data()
          object.id = doc.id
          news.push(object)
        })
        this.setState({ news, loading: false, lastDocument: res.docs[res.docs.length - 1] })
      }
    } catch (e) {
      alert(e.message)
      this.setState({ loading: false })
    }
  }
  loadMorePosts = async () => {
    console.log("[Posts] load more")
    this.setState({ loading: true })
    try {
      const res = await firestore.loadMorePosts(limitPosts, this.state.lastDocument)
      if (res.docs.length > 0) {
        var news = this.state.news
        res.docs.forEach(doc => {
          var object = doc.data()
          object.id = doc.id
          news.push(object)
        })
        this.setState({ news, loading: false, lastDocument: res.docs[res.docs.length - 1] })
      } else {
        this.setState({ lastDocument: false })
      }
    } catch (e) {
      alert(e.message)
      this.setState({ loading: false })
    }
  }
  onRemovePost = (postID, index) => {
    let confirm = window.confirm("Вы точно хотите удалить эту новость ?")
    if (confirm) {
      this.removePost(postID, index)
    }
  }
  removePost = async (postID, index) => {
    this.setState({ loading: true })
    try {
      const res = await firestore.removePost(postID)
      let news = this.state.news
      news.splice(index, 1)
      this.setState({ news, loading: false })
    } catch (e) {
      this.setState({ loading: false })
      alert(e.message)
    }
  }

  onSignOut = async () => {
    this.setState({ loading: true })
    try {
      const res = await auth.signOut()
      window.location.href = "/auth"
    } catch (e) {
      this.setState({ loading: false })
      alert(e.message)
    }
  }
  
  render () {
    let itemWidth = (this.state.width * 0.6 - 50) / 2 - 40
    return (
      <div className="Posts">
        <h1>Õzen.Лента</h1>
        <button 
          onClick={()=>this.props.showMenu(true)}
          className="add__button">
          Добавить
        </button>
        {this.state.lastDocument === false ? 
          null :
          <div className="loadmore__btn">
            <button 
              onClick={this.loadPosts}>
                Загрузить еще
            </button>
          </div>
        }
        <div className="posts">
          {this.state.news.map((news, i) => 
            <Post 
              width={this.state.w}
              news={news}
              index={i}
              onRemovePost={this.onRemovePost}
            />
          )}
        </div>
        <div className="logout__view">
          <img 
            onClick={this.onSignOut}
            src={require('../media/out.png')}
            className="logout__icon"/>
        </div>
      </div>
    )
  }
}

export default Posts;
