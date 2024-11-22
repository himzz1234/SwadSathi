function LoginStart(userCredentials: any) {
  type: "LOGIN_START";
}

function LoginSuccess(user: any) {
  type: "LOGIN_SUCCESS";
  payload: user;
}

function LoginFailure(error: any) {
  type: "LOGIN_FAILURE";
}

function Logout() {
  type: "LOGOUT";
}

export { LoginStart, LoginSuccess, LoginFailure, Logout };
