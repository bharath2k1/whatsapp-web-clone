import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChatIcon from "@material-ui/icons/Chat";
import SearchIcon from "@material-ui/icons/Search";
import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import SidebarChat from "./SidebarChat";
import db from "./firebase.js";
import { useStateValue } from "./StateProvider";

function Sidebar() {
  const [room, setroom] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe = db.collection("rooms").onSnapshot((snapshot) => {
      setroom(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
    });
    return () => [unsubscribe()];
  }, []);

  return (
    <div className="sidebar">
      {/* header */}
      <div className="sidebar__header">
        <Avatar src={user?.photoURL} />

        <div className="sidebar__header-icons">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>

          <IconButton>
            <ChatIcon />
          </IconButton>

          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__searchbox">
        <div className="sidebar__searchcontainer">
          <SearchIcon />
          <input placeholder="Search or start a new chat" type="text" />
        </div>
      </div>

      {/* search */}
      <div className="sidebar__chats">
        <SidebarChat addNewChat />

        {room.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
      {/* chat */}
    </div>
  );
}

export default Sidebar;
