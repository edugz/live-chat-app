import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("message", (data) => {
      setChat((prev) => [...prev, data]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const joinRoom = () => {
    if (username && room) {
      socket.emit("join_room", { room, username });
      setJoined(true);
    }
  };

  const sendMessage = () => {
    if (message) {
      socket.emit("send_message", message);
      setMessage("");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      {!joined ? (
        <>
          <h2>Join Chat</h2>
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            placeholder="Room"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={joinRoom}>Join</button>
        </>
      ) : (
        <>
          <h2>Room: {room}</h2>
          <div
            style={{
              border: "1px solid #ccc",
              padding: 10,
              height: 300,
              overflowY: "scroll",
            }}
          >
            {chat.map((msg, idx) => (
              <div key={idx}>
                <strong>{msg.user}:</strong> {msg.text}
              </div>
            ))}
          </div>
          <input
            placeholder="Message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>Send</button>
        </>
      )}
    </div>
  );
}

export default App;
