import { useContext, useState } from 'react';
import { AuthContext } from '../features/auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [role, setRole] = useState('user'); 

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username.trim()) return;

    const user = { name: username, role };
    dispatch({ type: 'LOGIN', payload: user });
    navigate('/Home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center px-4">
      <div className="max-w-3xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Side (Image / Logo) */}
        <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600 text-white p-8">
          <h2 className="text-3xl font-bold mb-4">🚀 GreatMind Admin</h2>
          <p className="text-center text-sm opacity-90">
            Manage messages and users with style. Login to continue.
          </p>
        </div>

        {/* Right Side (Form) */}
        <div className="p-8 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Sign In</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm text-gray-600">Username</label>
              <input
                type="text"
                placeholder="e.g. peter_paul"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300 bg-blue-50 text-gray-800"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-600">Select Role</label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 bg-purple-50 text-gray-800"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transition duration-200"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
