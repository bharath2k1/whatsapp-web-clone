import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, SearchOutlined, MoreVert } from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Chat.css";
import db from "./firebase";
import firebase from "firebase";
import { useStateValue } from "./StateProvider";

function Chat() {
  const [seed, setseed] = useState("");
  const [input, setinput] = useState("");
  const { roomid } = useParams();
  const [roomname, setroomname] = useState("");
  const [messages, setmessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (roomid) {
      console.log("this is ", roomid);
      db.collection("rooms")
        .doc(roomid)
        .onSnapshot((snapshot) => setroomname(snapshot.data().name));

      db.collection("rooms")
        .doc(roomid)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setmessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomid]);

  useEffect(() => {
    setseed(Math.floor(Math.random() * 5000));
  }, [roomid]);

  const sendmessage = (e) => {
    e.preventDefault();
    db.collection("rooms").doc(roomid).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setinput("");
  };
  return (
    <div className="chat">
      {/* header */}
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat__header-info">
          <h3>{roomname}</h3>
          <p>Last seen...</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>

          <IconButton>
            <AttachFile />
          </IconButton>

          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      {/* chat body */}
      <div className="chat__body">
        {messages.map((message) => (
          <p
            className={`chat__message ${
              message.name === user.displayName && "chat__receiver"
            }`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>

      {/* chat footer */}

      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form>
          <input
            value={input}
            onChange={(e) => setinput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={sendmessage} type="submit">
            Send a messege
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
