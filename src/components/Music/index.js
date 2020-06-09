// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import "./Music.css";

const Music = ({ song, artist, artUrl }) => {
  return (
    <div id="music">
      <div id="album-art">
        <img src={artUrl} />
      </div>
      <div id="song-artist">
        <div>
          <span>{song}</span>
        </div>
        <div>
          <span>{artist}</span>
        </div>
      </div>
    </div>
  );
};

export default Music;
