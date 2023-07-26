export default function LoginStart(userCredentials) {
  type: "LOGIN_START";
}

export default function LoginSuccess(user){
    type: "LOGIN_SUCCESS"
    payload: user
}

export default function LoginFailure(error){
    type: "LOGIN_FAILURE"
}

export default function Logout(){
    type: "LOGOUT"
}
