// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import "./Clock.css";

const Clock = () => {
  const [currentTime, setCurrentTime] = useState("00:00:00");

  useEffect(() => {
    // Function to get the current time
    const getCurrentTime = () => {
      const date = new Date();
      const hours = date.getHours() % 12 === 0 ? 12 : date.getHours() % 12;
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const seconds = date.getSeconds().toString().padStart(2, "0");
      return `${hours}:${minutes}:${seconds}`;
    };

    // Initialize with the time
    setCurrentTime(getCurrentTime());

    // Every second, update
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);

    // Destroy the interval on cleanup
    return () => {
      clearInterval(interval);
    };
  }, [setCurrentTime]);

  return (
    <div id="clock">
      <span>{currentTime}</span>
    </div>
  );
};

export default Clock;
