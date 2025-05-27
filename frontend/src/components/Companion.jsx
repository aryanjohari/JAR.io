import React, { useState, useEffect, useRef } from 'react';
import { API } from 'aws-amplify';

const Companion = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState('');
  const chatContainerRef = useRef(null);

  const fetchHistory = async () => {
    try {
      const response = await API.get('JARioAPI', '/companion/history');
      console.log('Fetched history:', response);
      setMessages(response);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch history');
      console.error('History error:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) {
      setError('Message cannot be empty');
      return;
    }

    try {
      const response = await API.post('JARioAPI', '/companion/send', {
        body: { message: newMessage },
      });
      console.log('Send response:', response);
      const newMsg = {
        PK: 'companion',
        SK: `message#${response.messageId}`,
        type: 'companion',
        user_message: response.userMessage,
        companion_response: response.companionResponse,
        timestamp: response.timestamp,
      };
      setMessages((prev) => [...prev, newMsg]);
      setNewMessage('');
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send message');
      console.error('Send error:', err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-black">JAR.io Companion</h1>
        <p className="text-dusky mt-2">Chat with your partner</p>
      </header>
      <main className="max-w-4xl mx-auto">
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded mb-6">
            {error}
          </div>
        )}
        <div
          ref={chatContainerRef}
          className="bg-white p-4 rounded-lg shadow-md mb-4 h-96 overflow-y-auto"
        >
          {messages.length === 0 ? (
            <p className="text-dusky text-center">Start the conversation!</p>
          ) : (
            messages.flatMap((msg) => [
              msg.user_message && (
                <div key={`${msg.SK}-user`} className="mb-4 flex justify-end">
                  <div className="max-w-xs p-3 rounded-lg bg-dusky text-white">
                    <p>{msg.user_message}</p>
                    <p className="text-xs mt-1 opacity-75">
                      {new Date(msg.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ),
              msg.companion_response && (
                <div key={`${msg.SK}-companion`} className="mb-4 flex justify-start">
                  <div className="max-w-xs p-3 rounded-lg bg-gray-100 text-dusky">
                    <p>{msg.companion_response}</p>
                    <p className="text-xs mt-1 opacity-75">
                      {new Date(msg.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ),
            ])
        )
          }
        </div>
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center">
            <input
              type="text"
              className="flex-1 p-2 border border-dusky rounded-l text-dusky"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              type="submit"
              className="bg-dusky text-white px-4 py-2 rounded-r hover:bg-black transition"
            >
              Send
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Companion;