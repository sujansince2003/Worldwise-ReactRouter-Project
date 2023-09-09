import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();
const initialstate = {
  user: null,
  isAuthenticated: false,
};

// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialstate);
  const { user, isAuthenticated: IA } = state;

  function login(email, pass) {}

  function logout() {}

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error(" context is used outside the cityProvider function");
  return context;
}

export { AuthProvider, useAuth };
