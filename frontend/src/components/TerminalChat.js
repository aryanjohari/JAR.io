import { useEffect } from "react";

function TerminalChat() {
  useEffect(() => {
    // TODO: Initialize xterm.js
    console.log("TerminalChat mounted");
  }, []);

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold text-white mb-4">Our Secure Chat</h2>
      <div
        id="terminal"
        className="bg-terminal-bg text-terminal-text p-4 rounded h-96"
      ></div>
      <div className="mt-4 flex">
        <input
          type="text"
          className="flex-grow p-2 border rounded-l"
          placeholder="Type a message..."
        />
        <button className="bg-sakshi-pink text-white p-2 rounded-r">
          Send
        </button>
      </div>
    </div>
  );
}

export default TerminalChat;
