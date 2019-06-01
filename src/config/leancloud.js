import AV from 'leancloud-storage'

var APP_ID = 'LDkpdb4bwEXfkKvfMgS6lfWo-gzGzoHsz'
var APP_KEY = 'f6BMgzFyGAxnT95EFbSpwkfC'
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
})

export default AV

export const todoModel = {
  getByUser(user, successfn, errorfn){
    let query = new AV.Query('Todo')
    query.find().then((response)=>{
      console.log(response)
      let array = response.map((t)=>{
        return {id:t.id,...t.attributes}
      })
      successfn.call(null,array)
    },(error)=>{
      errorfn && errorfn.call(null,error)
    })
  },

  create({description, completed, deleted}, successFn, errorFn){
    let Todo = AV.Object.extend('Todo')
    let todo = new Todo()
    todo.set('description', description)
    todo.set('completed', completed)
    todo.set('deleted', deleted)
    let acl = new AV.ACL()
    acl.setPublicReadAccess(false)
    acl.setWriteAccess(AV.User.current(), true)
    acl.setReadAccess(AV.User.current(), true)
    todo.setACL(acl);
    todo.save().then(function (response) {
      successFn.call(null, response.id)
    }, function (error) {
      errorFn && errorFn.call(null, error)
    });
  },

  update({id, title, completed, deleted}, successFn, errorFn){
    let todo = AV.Object.createWithoutData('Todo', id)
    title !== undefined && todo.set('title', title)
    completed !== undefined && todo.set('completed', completed)
    deleted !== undefined && todo.set('deleted', deleted)
    todo.save().then((response) => {
      successFn && successFn.call(null)
    }, (error) => errorFn && errorFn.call(null, error))
  },

  destroy(todoId, successFn, errorFn){
    let todo = AV.Object.createWithoutData('Todo', todoId)
    todo.destroy().then(function (response) {
      successFn && successFn.call(null)
    }, function (error) {
      errorFn && errorFn.call(null, error)
    });
  }
}


export function signUp(username, password,successFn, errorFn){
  var user = new AV.User()
  user.setUsername(username)
  user.setPassword(password)
  user.signUp().then(function (loginedUser) {
    let user = getUserFromAVUser(loginedUser)
    successFn.call(null, user)
  }, function (error) {
    errorFn.call(null, error)
  })

  return undefined
}

export function signIn(username, password, successFn, errorFn){
  AV.User.logIn(username, password).then(function (loginedUser) {
    let user = getUserFromAVUser(loginedUser)
    successFn.call(null, user)
  }, function (error) {
    errorFn.call(null, error)
  })
}

export function getCurrentUser(){
  let user = AV.User.current()
  if(user){
    return getUserFromAVUser(user)
  }else{
    return null
  }
}

export function signOut(){
  AV.User.logOut()
  return undefined
}

function getUserFromAVUser(AVUser){
  return {
    id: AVUser.id,
    ...AVUser.attributes
  }
}