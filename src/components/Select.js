import React from 'react'
import '../css/Notifications.css'

class Select extends React.PureComponent {
    state = {
        open: false
    }

    render () {
        return (
            <div     
                className="select">
                <div 
                    onClick={()=>this.setState({open: !this.state.open})}
                    className="current__item">
                    <h2>{this.props.currentItem}</h2>
                    <img 
                        className={this.state.open ? "icon__down icon__down__open" : "icon__down"}
                        src={require("../media/down.png")}
                        onClick={()=>this.setState({open: !this.state.open})}/>
                </div>
                {this.state.open ? 
                    <div className="select__options">
                        {["Добавить пост", "Уведомления"].map((name, i) => 
                         <label 
                            key={i}
                            className="select__option"
                            onClick={()=>{
                                this.setState({ open: false })
                                this.props.onSelectItem(name)
                            }}>
                            {name}
                        </label>
                        )}
                    </div> : null
                }
            </div>
        )
    }
}


export default Select