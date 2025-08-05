import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../features/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const profanityList = ['fuck', 'shit', 'bitch', 'asshole', 'nigga', 'bastard', 'damn'];
const wordLimit = 100;
const allowedChars = /^[a-zA-Z0-9\s.,?!'"-]*$/;

const Restricted = () => {
  const { state } = useContext(AuthContext);
  const { user } = state;
  const navigate = useNavigate();

  const [message, setMessage] = useState('');
  const [submittedMessages, setSubmittedMessages] = useState([]);
  const [error, setError] = useState('');

  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('messages')) || [];
    const filtered = isAdmin ? stored : stored.filter((msg) => msg.user === user.username);
    setSubmittedMessages(filtered);
  }, [isAdmin, user]);

  const hasProfanity = (text) => {
    const words = text.toLowerCase().split(/\s+/);
    return profanityList.some((word) => words.includes(word));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const words = message.trim().split(/\s+/);
    const timestamp = new Date().toLocaleString();

    if (!message.trim()) return;

    if (hasProfanity(message)) {
      setError('Profanity detected. Please clean your message.');
      return;
    }

    if (!allowedChars.test(message)) {
      setError('Message contains invalid characters.');
      return;
    }

    if (words.length > wordLimit) {
      setError(`Maximum word count of ${wordLimit} reached.`);
      return;
    }

    const newEntry = {
      text: message.trim(),
      user: user.username,
      timestamp,
    };

    const updatedMessages = [...submittedMessages, newEntry];
    localStorage.setItem('messages', JSON.stringify(updatedMessages));
    setSubmittedMessages(updatedMessages);
    setMessage('');
    setError('');
  };

  const currentWordCount = message.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-50 flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-3xl p-8 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-800">🛡 Admin Message Panel</h2>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition transform hover:scale-105"
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <textarea
            className={`w-full h-36 p-4 border ${
              error ? 'border-red-500' : 'border-gray-300'
            } rounded-xl resize-none focus:outline-none focus:ring-4 focus:ring-purple-300 bg-purple-50 text-gray-800 placeholder:text-gray-400`}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              setError('');
            }}
            placeholder={
              isAdmin
                ? 'Type your message here...'
                : 'You are not allowed to submit messages'
            }
            disabled={!isAdmin}
          />
          <div className="flex justify-between items-center mt-1 text-sm">
            <span
              className={`${
                currentWordCount > wordLimit ? 'text-red-500' : 'text-gray-600'
              }`}
            >
              {currentWordCount} / {wordLimit} words
            </span>
            {error && <span className="text-red-600 font-semibold">{error}</span>}
          </div>

          {isAdmin ? (
            <button
              type="submit"
              className="mt-4 w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:from-purple-700 hover:to-blue-700 transition duration-200"
            >
              🚀 Submit Message
            </button>
          ) : (
            <p className="mt-4 text-red-500 font-semibold">Only admins can submit messages.</p>
          )}
        </form>

        {submittedMessages.length > 0 && (
          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">📬 Submitted Messages:</h3>
            <ul className="space-y-2 max-h-60 overflow-y-auto pr-2">
              {submittedMessages.map((msg, index) => (
                <li
                  key={index}
                  className="bg-gradient-to-r from-purple-100 to-blue-100 border border-gray-200 p-3 rounded-md text-sm text-gray-700 shadow-sm"
                >
                  <p className="font-medium">{msg.text}</p>
                  <p className="text-xs text-gray-500 mt-1">📅 {msg.timestamp}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="text-xs text-gray-500 pt-2 border-t border-gray-200">
          🔒 Note: This app runs entirely on the client. Do not store sensitive information. Real-world apps need server-side validation and security.
        </p>
      </div>
    </div>
  );
};

export default Restricted;