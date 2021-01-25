import React from 'react'
import { functions } from '../backend'


import '../css/Notifications.css'



class Notifications extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            title: "",
            body: "",
            url: "",
            img_link: ""
        }
    }
    onSubmit = () => {
        if (this.state.title != "" && this.state.body != "") {
            let confirm = window.confirm("Вы уверены ? Отменить это действие невозможно")
            if (confirm) {
                this.onSendNotification()
            }
        } else {
            alert("Заполните поля 'Название' и 'Краткое описание'")
        }
    }
    onSendNotification = async () => {
        let {title, body, url, img_link} = this.state
        this.props.setLoading(true)
        try {
            const response = await functions.sendMessage(title, body, url, img_link)
            this.props.setLoading(false)
            if (response.status === "error") {
                alert(response.error)
            } else {
                alert("Успешно")
            }
        } catch (e) {
            this.props.setLoading(false)
            alert(e.message)
        }
    }

    render () {
        let { title, body, url, img_link } = this.state
        return (
            <div className="Notifications">
                <input
                    placeholder="Название"
                    value={title}
                    onChange={(e)=>this.setState({ title: e.target.value })}
                />
                <textarea 
                    placeholder="Краткое описание"
                    value={body}
                    onChange={(e)=>this.setState({ body: e.target.value })}
                />
                <input
                    placeholder="Ссылка"
                    value={url}
                    onChange={(e)=>this.setState({ url: e.target.value })}
                />
                <input
                    placeholder="Ссылка на картинку"
                    value={img_link}
                    onChange={(e)=>this.setState({ img_link: e.target.value })}
                />
                <button 
                    onClick={this.onSubmit}
                    className="submit">
                    Готово
                </button>
            </div>
        )
    }
}

export default Notifications;