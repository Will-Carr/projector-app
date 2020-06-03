import React, { useState, useEffect } from "react";
import Clock from "../Clock";
import "./MainBar.css";

const MainBar = () => {
  const [currentComponentName] = useState("clock");
  const [currentComponent, setCurrentComponent] = useState();

  // Update which component we're displaying
  useEffect(() => {
    switch (currentComponentName) {
      case "clock":
      default:
        setCurrentComponent(<Clock />);
        break;
    }
  }, [currentComponentName, setCurrentComponent]);

  return (
    <div id="main-bar">
      <div id="content-container">{currentComponent}</div>
    </div>
  );
};

export default MainBar;
