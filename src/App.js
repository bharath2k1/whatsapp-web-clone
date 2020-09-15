import React from "react";

import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";

function App() {
  return (
    <div className="App">
      <div className="app__body">
        {/* sidebar */}
        <Sidebar />
        {/* chat */}
        <Chat />
      </div>
    </div>
  );
}

export default App;
