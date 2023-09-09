import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();
const initialstate = {
  user: null,
  isAuthenticated: false,
};

function render(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      console.log("default");
  }
}
const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialstate);
  const { user, isAuthenticated: IA } = state;

  function login(email, pass) {
    if (email === FAKE_USER.email && pass === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        IA,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error(" context is used outside the cityProvider function");
  return context;
}

export { AuthProvider, useAuth };
