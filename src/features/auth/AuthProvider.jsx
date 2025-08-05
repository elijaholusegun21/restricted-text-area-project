
import { useReducer } from 'react';
import AuthReducer, { initialAuthState } from './AuthReducer';
import { AuthContext } from './AuthContext';

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialAuthState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
