import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./SidebarChat.css";

function SidebarChat({ addNewChat }) {
  const [seed, setseed] = useState("");

  useEffect(() => {
    setseed(Math.floor(Math.random() * 5000));
  }, []);

  const createchat = () => {
    const roomname = prompt("please enter name for chat");
    if (roomname) {
    }
  };
  return !addNewChat ? (
    <div className="sidebarchat">
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
      <div className="sidebarchat__info">
        <h4>Room name</h4>
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
