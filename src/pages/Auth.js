import React from 'react';
import '../css/Auth.css'
import {connect} from 'react-redux'
import { auth } from '../backend'
// Widgets
import AuthForm from '../components/AuthForm'

const inputs = [
  {
    hint: "Электронная почта",
    placeholder: "john@mail.com",
    value: "email",
    type: "email"
  },
  {
    hint: "Пароль",
    placeholder: "******",
    value: "password",
    type: "password"
  }
]


class Auth extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    }
  }

  componentDidMount () {
    if (this.state.user) {
      window.location.href = "/"
    }
  }

  handleInputChange = (stateName, value) => {
    this.setState({
      [stateName]: value
    })
  }
  onSignIn = async (e) => {
    e.preventDefault()
    this.props.dispatch({ type: "SET_LOADING", loading: true })
    try {
      let { email, password } = this.state
      const response = await auth.signIn(email, password)
      this.props.dispatch({type: "SET_LOADING", loading: false})
    } catch (e) {
      this.props.dispatch({type: "SET_LOADING", loading: false})
      alert(e.message)
    }
  }

  render () {
    if (this.props.user != false) {
      window.location.href = "/"
    }
    let { email, password } = this.state
    return (
      <div className="Page Auth">
        <AuthForm
          inputs={inputs}
          values={[email, password]}
          onChange={this.handleInputChange}
          onSubmit={this.onSignIn}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user
  };
}


export default connect(mapStateToProps)(Auth)
