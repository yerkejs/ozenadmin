import React from 'react'
import CreatePost from './CreatePost'
import Select from './Select'
import Notifications from './Notifications'
import '../css/CreatePost.css'

class Menu extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            isPost: true
        }
    }

    render () { 
        let {isPost} = this.state
        return (
            <div className={this.props.showMenu ? "Menu Menu-show" : "Menu"}>
                <div
                    style={{marginBottom: 8}} 
                    className="row__space">
                    <Select
                        currentItem={isPost ? "Добавить пост" : "Уведомления"}
                        onSelectItem={(item) => this.setState({ isPost: item == "Добавить пост" }) }
                    />
                    <img
                        className="icon__close" 
                        onClick={this.props.onClose}
                        src={require('../media/icon__close.png')}/>
                </div>
                {isPost ? 
                    <CreatePost/> 
                     : 
                    <Notifications
                        setLoading={this.props.setLoading}
                    />    
                }
            </div>
        )
    }
}

export default Menu;