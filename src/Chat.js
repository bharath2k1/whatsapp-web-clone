import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, SearchOutlined, MoreVert } from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import React, { useEffect, useState } from "react";
import "./Chat.css";

function Chat() {
  const [seed, setseed] = useState("");

  useEffect(() => {
    setseed(Math.floor(Math.random() * 5000));
  }, []);

  return (
    <div className="chat">
      {/* header */}
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat__header-info">
          <h3>room name</h3>
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
        <p className={`chat__message ${true && "chat__receiver"}`}>
          <span className="chat__name">Bunny</span>
          hey bunny
          <span className="chat__timestamp">3:40</span>
        </p>
      </div>

      {/* chat footer */}

      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form>
          <input placeholder="Type a message" type="text" />
          <button type="submit">Send a messege</button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
