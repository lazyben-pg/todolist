import React from 'react';
import TodoInput from './component/todolist/TodoInput'
import TodoItem from './component/todolist/TodoItem'

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      todoList : [
        {id:"1",description:"第一个待办",completed:"flase",deleted:"false"},
        {id:"2",description:"第二个待办",completed:"flase",deleted:"false"},
        {id:"3",description:"第三个待办",completed:"flase",deleted:"false"}
      ],
      newTodo : ""
    }
  }

  render(){
    let todo = this.state.todoList.map((todo,index) => {
      return(
        <li>
          <TodoItem todo={todo}/>
        </li>
      )
    })

    return(
      <div className="App">
        <div className="header">
          <h1>我的待办</h1>
        </div>
        <div className="inputwrapper">
          <TodoInput content={this.state.newTodo}/>
        </div>
        <ol>
          {todo}
        </ol>
      </div>
    )
  }
}

export default App;
