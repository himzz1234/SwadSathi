type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: { auth: any; role: string } }
  | { type: "LOGIN_FAILURE"; payload: { error: boolean } }
  | { type: "LOGOUT" };

interface AuthState {
  auth: any;
  role: string | null;
  isFetching: boolean;
  error: boolean;
}

interface AuthContextType extends AuthState {
  dispatch: Dispatch<AuthAction>;
}
