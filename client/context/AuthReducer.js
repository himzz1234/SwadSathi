export default function AuthReducer(state, action) {
  switch (action.type) {
    case "LOGIN_START":
      return {
        auth: null,
        role: null,
        isFetching: true,
        error: false,
      };

    case "LOGIN_SUCCESS":
      return {
        auth: action.payload.auth,
        role: action.payload.role,
        isFetching: false,
        error: false,
      };

    case "LOGIN_FAILURE":
      return {
        user: null,
        role: null,
        isFetching: false,
        error: true,
      };

    case "LOGOUT":
      return {
        user: null,
        role: null,
        isFetching: false,
        error: false,
      };

    case "PROFILE_UPDATE":
      // Update the user's profile information
      return {
        auth: { ...state.auth, ...action.payload.auth },
        role: action.payload.role,
        isFetching: false,
        error: false,
      };

    default:
      return state;
  }
}
