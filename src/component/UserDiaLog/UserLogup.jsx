import React from 'react'
import { Input, Button, } from 'antd';
import {signUp} from '../../config/leancloud'

class UserLogUp extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      acount: "",
      password: "",
      email: ""
    }
  }

  onChangeLogUpUserName = (e) => {
    this.setState({
      acount: e.target.value
    })
  }

  onChangeLogUpPassword = (e) => {
    this.setState({
      password: e.target.value
    })
  }

  signUpSubmit = () => {
    let {acount,password} = this.state
    let success = (user)=>{
      this.props.userSignIn(user)
    }
    let error = (error)=>{
      switch(error.code){
        case 202:
          alert('用户名已被占用')
          break
        default:
          alert(error)
          break
      }
    }
    signUp(acount,password,success,error)
  }

  render(){
    const {acount,password} = this.state
    return(
      <div className="box logUp">
        <h1>ToDo-List</h1>
        <Input placeholder="请输入用户名" value={acount} onChange={this.onChangeLogUpUserName}></Input>
        <Input placeholder="请输入密码" value={password} onChange={this.onChangeLogUpPassword}></Input>
        <Button block={true} type="primary" onClick={this.signUpSubmit}>注册</Button>
        <p>若已有账号请 <span onClick={this.props.selectSignIn}>登录</span></p>
      </div>
    )
  }
}

export default UserLogUp