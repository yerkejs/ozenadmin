import React from 'react'
import {connect} from 'react-redux'
import '../css/Home.css'

// Components
import Menu from '../components/Menu'
import Posts from '../components/Posts'

class Home extends React.PureComponent {
  state = {
    showMenu: false
  }

  componentDidMount () {
    if (!this.props.user) {
      window.location.href = "/auth"
    }
  }

  setLoading = (value) => {
    this.props.dispatch({type: "SET_LOADING", loading: value})
  }
  render () {
    return (
      <div className="Home Page">
          <Posts
            showMenu={(showMenu)=>{
              this.setState({showMenu})
            }}
          />
          <Menu
            setLoading={this.setLoading}
            showMenu={this.state.showMenu}
            onClose={()=>this.setState({ showMenu: false })}
          />
      </div>
    )
  }
}



const mapStateToProps = (state) => {
  return {
    loading: state.system.loading,
    user: state.user.user
  };
}

export default connect(mapStateToProps)(Home)

