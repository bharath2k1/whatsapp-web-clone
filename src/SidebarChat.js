import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import db from "./firebase";

function SidebarChat({ id, name, addNewChat }) {
  const [seed, setseed] = useState("");

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
    <div className="sidebarchat">
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
      <div className="sidebarchat__info">
        <h4>{name}</h4>
        <p>Lastname...</p>
      </div>
    </div>
  ) : (
    <div onClick={createchat} className="sidebarchat">
      <h3>Add New chat</h3>
    </div>
  );
}

export default SidebarChat;
