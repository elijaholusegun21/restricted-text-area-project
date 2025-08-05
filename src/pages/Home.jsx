import { useContext } from 'react';
import { AuthContext } from '../features/auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { state, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  const goToRestricted = () => {
    navigate('/restricted');
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#f3e8ff] via-[#e0f2fe] to-[#fce7f3] flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-xl w-full text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-gray-800">
            🌟 Welcome, <span className="text-purple-600">{state.user.name}</span>!
          </h1>
          <p className="text-md text-gray-500">
            You're logged in as <span className="font-semibold text-blue-600">{state.user.role}</span>
          </p>
        </div>

        <div className="flex flex-col gap-4 mt-8">
          <button
            onClick={goToRestricted}
            className="w-full py-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white text-lg rounded-xl font-semibold shadow-md hover:scale-105 transition duration-200"
          >
            🚀 Go to Restricted Page
          </button>

          <button
            onClick={handleLogout}
            className="w-full py-3 bg-white border border-gray-300 text-gray-700 rounded-xl text-lg font-medium hover:bg-gray-100 transition"
          >
            🔓 Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
