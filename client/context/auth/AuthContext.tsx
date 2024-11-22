import React, { createContext, ReactNode, useReducer, Dispatch } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE: AuthState = {
  auth: null,
  role: null,
  isFetching: false,
  error: false,
};

export const AuthContext = createContext<AuthContextType>({
  auth: null,
  role: null,
  isFetching: false,
  error: false,
  dispatch: () => {},
});

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        auth: state.auth,
        role: state.role,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
