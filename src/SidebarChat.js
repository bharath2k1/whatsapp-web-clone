import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./SidebarChat.css";
import db from "./firebase";
import { Avatar } from "@material-ui/core";

function SidebarChat({ id, name, addNewChat }) {
  const [seed, setseed] = useState("");
  const [messages, setmessages] = useState("");

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setmessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  useEffect(() => {
    setseed(Math.floor(Math.random() * 5000));
  }, []);

  const createchat = () => {
    const roomname = prompt("please enter a name for chat room");
    if (roomname) {
      db.collection("rooms").add({
        name: roomname,
      });
    }
  };
  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarchat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarchat__info">
          <h4>{name}</h4>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createchat} className="sidebarchat">
      <h3>Add New chat</h3>
    </div>
  );
}

export default SidebarChat;
