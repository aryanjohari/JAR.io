import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function TerminalChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch("http://localhost:5000/chat/messages", {
          credentials: "include",
        });
        if (res.status === 401) {
          navigate("/login");
          return;
        }
        if (!res.ok) throw new Error("Failed to fetch messages");
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMessages();
    // Poll every 2 seconds for new messages
    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, [navigate]);

  const handleSend = async () => {
    if (!input) return;
    try {
      const res = await fetch("http://localhost:5000/chat/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
        credentials: "include",
      });
      if (res.status === 401) {
        navigate("/login");
        return;
      }
      if (!res.ok) throw new Error("Failed to send message");
      const data = await res.json();
      setMessages([...messages, data]);
      setInput("");
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold text-white mb-4">
        Our Secure Chat, Suar!
      </h2>
      <div
        id="terminal"
        className="bg-terminal-bg text-terminal-text p-4 rounded h-96 overflow-y-auto font-mono"
      >
        {messages.length === 0 && <p>No messages yet, Sakshi!</p>}
        {messages.map((msg, idx) => (
          <p key={idx}>
            {msg.user}: {msg.message}
          </p>
        ))}
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <div className="mt-4 flex">
        <input
          id="message-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow p-2 border rounded-l"
          placeholder="Type a message, Sakshi..."
        />
        <button
          onClick={handleSend}
          className="bg-sakshi-pink text-white p-2 rounded-r"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default TerminalChat;
