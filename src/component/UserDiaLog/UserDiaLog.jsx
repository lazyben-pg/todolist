import React from 'react'
import UserLogin from './UserLogin'
import UserLogup from './UserLogup'
import './UserDiaLog.css'

class UserDiaLog extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      selected: "SignIn"
    }
  }
  selectSignUp = () => {
    this.setState({
      selected: "SignUp"
    })
  }
  selectSignIn = () => {
    this.setState({
      selected: "SignIn"
    })
  }
  render(){
    return(
      <div className="userdialog">
        {this.state.selected === 'SignIn' ? 
        <UserLogin userSignIn={this.props.userSignIn} selectSignUp={this.selectSignUp.bind(this)}/> : 
        <UserLogup userSignIn={this.props.userSignIn} selectSignIn={this.selectSignIn.bind(this)}/>}
      </div>
    )
  }
}

export default UserDiaLog