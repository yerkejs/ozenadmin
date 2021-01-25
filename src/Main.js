import React from 'react'

// Routers
import {
  BrowserRouter as Router, Switch, Route
} from 'react-router-dom'
// Pages
import Auth from './pages/Auth';
import Home from './pages/Home'


import { Spinner } from './widgets/Spinner'
import { connect } from 'react-redux'
import {admin} from './backend'

class Main extends React.Component {
  constructor (props) {
    super(props)
    let self = this

    // user's state changed
    admin.auth().onAuthStateChanged(function (user) {
      console.log("user state", user)
      self.props.dispatch({ type: "SET_USER", user: user != null  })
    })
  }

  render () {
    if (this.props.loading || this.props.user == "LOADING")  {
      return (
        <Spinner/>
      )
    } else {
      return (
        <div
          className="App"
          style={{width: '100%', height: '100%'}}>
          <Router>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/auth' component={Auth}/>
            </Switch>
          </Router>
        </div>
      )
    }
  }
}



const mapStateToProps = (state) => {
  return {
    loading: state.system.loading,
    user: state.user.user
  };
}

export default connect(mapStateToProps)(Main)
