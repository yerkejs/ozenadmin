import React from 'react'
import '../css/AuthForm.css'


const AuthInput = (props) => (
  <div className="input_wrapper">
      <label>{props.hint}</label>
      <input
        placeholder={props.placeholder}
        required
        type={props.type}
        onChange={ (e) => {
          props.onChange(props.type, e.target.value)
        }}
        value={props.value}
      />
  </div>
)

class AuthForm extends React.Component {
  render () {
    let { inputs, values, onChange, onSubmit } = this.props

    return (
      <form
        onSubmit={onSubmit}
        className="AuthForm">
        <h1>Войти</h1>
        <label className="des">Введите логин и пароль чтобы получить доступ к админскому панелю</label>
        <div className="input__container">
          {inputs.map((inputMap, i) =>
            <AuthInput
              key={i}
              placeholder={inputMap.placeholder}
              type={inputMap.type}
              value={values[i]}
              onChange={onChange}
              hint={inputMap.hint}
            />
          )}
        </div>
        <button>Готово</button>
      </form>
    )
  }
}


export default AuthForm;
