// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useCallback } from "react";
import Clock from "../Clock";
import Weather from "../Weather";
import "./MainBar.css";

const MainBar = () => {
  const componentOrderEnum = {
    clock: 1,
    weather: 2,
  };

  const [activeComponents, setActiveComponents] = useState([
    "clock",
    "weather",
  ]);

  // Add an active component to our list
  // eslint-disable-next-line no-unused-vars
  const addComponent = useCallback(
    (component) =>
      setActiveComponents((currentActiveComponents) =>
        // Append the new component and sort
        currentActiveComponents
          .concat(component)
          .sort((a, b) => componentOrderEnum[a] > componentOrderEnum[b])
      ),
    [setActiveComponents, componentOrderEnum]
  );

  // Remove an active component from our list
  // eslint-disable-next-line no-unused-vars
  const removeComponent = useCallback(
    (component) =>
      setActiveComponents((currentActiveComponents) =>
        // Append the new component and sort
        currentActiveComponents.filter(
          (activeComponent) => activeComponent !== component
        )
      ),
    [setActiveComponents]
  );

  return (
    <div id="main-bar">
      <div
        id="content-container"
        className={`grid-${activeComponents.length}-items`}
      >
        {/* Used for grid spacing */}
        <div></div>
        {activeComponents.map((component) => {
          let returnComponent;
          switch (component) {
            case "clock":
              returnComponent = <Clock key={component} />;
              break;
            case "weather":
              returnComponent = <Weather key={component} />;
              break;
            default:
          }
          return returnComponent;
        })}
        {/* Used for grid spacing */}
        <div></div>
      </div>
    </div>
  );
};

export default MainBar;
