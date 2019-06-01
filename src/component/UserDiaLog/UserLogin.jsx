import React from 'react'
import { Input, Button, } from 'antd';
import {signIn} from '../../config/leancloud'

class UserLogin extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      acount: "",
      password: "",
      email: ""
    }
  }

  onChangeLogInUserName = (e) => {
    this.setState({
      acount: e.target.value
    })
  }

  onChangeLogInPassword = (e) => {
    this.setState({
      password: e.target.value
    })
  }

  signInSubmit = () => {
    let {acount,password} = this.state
    let success = (user)=>{
      this.props.userSignIn(user)
      console.log(user)
    }
    let error = (error)=>{
      switch(error.code){
        case 210:
          alert('用户名与密码不匹配')
          break
        default:
          alert(error)
          break
      }
    }
    signIn(acount,password,success,error)
  } 

  render(){
    const {acount,password} = this.state
    return(
      <div className="box logIn">
        <h1>ToDo-List</h1>
        <Input placeholder="请输入用户名" value={acount} onChange={this.onChangeLogInUserName}></Input>
        <Input placeholder="请输入密码" value={password} onChange={this.onChangeLogInPassword}></Input>
        <Button block={true} type="primary" onClick={this.signInSubmit}>登录</Button>
        <p>若没有账号请 <span onClick={this.props.selectSignUp}>注册</span></p>
      </div>
    )
  }
}

export default UserLogin