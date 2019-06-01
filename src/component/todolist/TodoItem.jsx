import React from 'react'
import {Checkbox, Icon} from 'antd'
import './TodoItem.css'

class TodoItem extends React.Component {
  onChange(id) {
    this.props.completeTodo(id)
  }

  render(){
    return(
      <div className="todoitem">
        <Checkbox onChange={()=>this.onChange(this.props.todo.id)}>{this.props.todo.description}</Checkbox>
        <Icon type="close-circle" style={{color:"rgb(24,114,255)",cursor:"pointer"}} onClick={()=>this.props.deleteTodo(this.props.todo.id)}/>
      </div>
      
    )
  }
}

export default TodoItem