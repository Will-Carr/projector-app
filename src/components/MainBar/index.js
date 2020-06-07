// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import Clock from "../Clock";
import Weather from "../Weather";
import "./MainBar.css";

const MainBar = () => {
  const [currentComponentName] = useState("weather");
  const [currentComponent, setCurrentComponent] = useState();

  // Update which component we're displaying
  useEffect(() => {
    switch (currentComponentName) {
      case "weather":
        setCurrentComponent(<Weather />);
        break;
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
