import React from 'react';
import TodoInput from './component/todolist/TodoInput'
import TodoItem from './component/todolist/TodoItem'
import UserDialog from './component/UserDiaLog/UserDiaLog'
import './App.css'
import {getCurrentUser,signOut,todoModel} from './config/leancloud'
import {Icon} from 'antd'

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      user: getCurrentUser()||{},
      todoList : [],
      newTodo : "",
      selected : "doing"
    }
    let user = getCurrentUser()
    if (user) {
      todoModel.getByUser(user, (todos) => {
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.todoList = todos
        this.setState(stateCopy)
      })
    }
  }

  inputValue = (e) => {
    this.setState({newTodo: e.target.value})
  }

  addTodo = (e) => {
    console.log(e)
    let newTodo = {
      description: e.target.value,
      completed: false,
      deleted: false
    }
    todoModel.create(newTodo,(id)=>{
      newTodo.id = id
      this.state.todoList.push(newTodo)
      this.setState({
        todoList: this.state.todoList,
        newTodo: '',
      })
    },(error)=>{
      console.log(error)
    })
  }

  userSignIn = (user) => {
    let stateCopy = JSON.parse(JSON.stringify(this.state)) 
    stateCopy.user = user
    this.setState(stateCopy)
  }

  signOut = ()=>{
    signOut()
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.user = {}
    this.setState(stateCopy)
  }

  get showTodo(){
    return this.state.todoList.filter(t=> !t.deleted && !t.completed)
  }

  get showcompleteTodo(){
    return this.state.todoList.filter(t=> !t.deleted && t.completed)
  }

  deleteTodo = (id)=>{
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    let newtodos = stateCopy.todoList.map((t)=>{
      if(t.id === id){
        todoModel.update({id:t.id,deleted:true})
        t.deleted = true
        return t
      }else{
        return t
      }
    })
    this.setState({todoList: newtodos})
  }

  completeTodo = (id)=>{
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    let newtodos = stateCopy.todoList.map((t)=>{
      if(t.id === id){
        todoModel.update({id:t.id,completed:true})
        t.completed = true
        return t
      }else{
        return t
      }
    })
    this.setState({todoList: newtodos})
  }

  render(){
    let select = this.state.selected === "doing" ? this.showTodo : this.showcompleteTodo
    let todo = select.map((todo,index) => {
      return(
        <li key={todo.id}>
          <TodoItem todo={todo} deleteTodo={this.deleteTodo.bind(this)} completeTodo={this.completeTodo.bind(this)}/>
        </li>
      )
    })

    return(
      <div className="App">
        {this.state.user.id ? null : <UserDialog userSignIn={this.userSignIn.bind(this)}/>}
        {this.state.user.id ?  
          <div id="todolist-container">
            <div className="header">
              <div className="logo">lazzben To-Do</div>
              <Icon className="logout" type="logout" onClick={this.signOut.bind(this)}/>
            </div>
            <div className="main">
              <div className="aside">
                <div className="user">{this.state.user.username}的待办</div>
                <div className="doing" onClick={()=>this.setState({selected: "doing"})}><Icon type="clock-circle" theme="twoTone"/> 进行中</div>
                <div className="completed" onClick={()=>this.setState({selected: "completed"})}><Icon type="check-circle" theme="twoTone"/> 已完成</div>
              </div>
              <div className="todo">
                <TodoInput content={this.state.newTodo} inputValue={this.inputValue.bind(this)} onSubmit={this.addTodo.bind(this)}/>
                <ul>
                  {todo}
                </ul>
              </div>
            </div>
          </div> : 
          null}
      </div>
    )
  }
}

export default App;
