import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './features/auth/AuthContext';
import Login from './pages/Login';
import Home from './pages/Home';
import Restricted from './pages/Restricted';

function App() {
  const { state } = useContext(AuthContext);

  const PrivateRoute = ({ children }) => {
    return state.isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/restricted"
          element={
            <PrivateRoute>
              <Restricted />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
