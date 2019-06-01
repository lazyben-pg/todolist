import React from 'react'
import {Input} from 'antd'

class TodoInput extends React.Component {
  onSubmit = (e) => {
    if(e.key === "Enter"){
      this.props.onSubmit(e)
    }
  }

  render(){
    return(
      <Input placeholder="在这里输入代办事项，按回车提交" type="text" value={this.props.content} onChange={this.props.inputValue} onKeyPress={this.onSubmit}/>
    )
  }
}

export default TodoInput