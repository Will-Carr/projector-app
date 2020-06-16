// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useCallback } from "react";
import Clock from "../Clock";
import Music from "../Music";
import Weather from "../Weather";
import "./MainBar.css";

const MainBar = () => {
  const componentOrderEnum = {
    clock: 1,
    weather: 2,
    music: 3,
  };

  const [activeComponents, setActiveComponents] = useState([
    "clock",
    "weather",
    "music",
  ]);

  // Add an active component to our list
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
  const removeComponent = useCallback(
    (component) =>
      setActiveComponents((currentActiveComponents) =>
        // Remove the component
        currentActiveComponents.filter(
          (activeComponent) => activeComponent !== component
        )
      ),
    [setActiveComponents]
  );

  // Variables related to music playing
  // Ideally this would be in the Music component, but it's pretty tied to the state of the bar
  const spotifyUrl = "http://localhost:5000/api/spotify";
  const [song, setSong] = useState("");
  const [artist, setArtist] = useState("");
  const [artUrl, setArtUrl] = useState("");
  const [musicPlaying, setMusicPlaying] = useState(false);

  // Every 5 seconds, get what song is playing on spotify
  useEffect(() => {
    const getSongData = () => {
      // eslint-disable-next-line no-undef
      fetch(spotifyUrl)
        .then((resp) => {
          if (!resp.ok) {
            throw new Error("Bad fetch");
          }
          return resp.json();
        })
        .then(({ name, artist: artistName, art }) => {
          // If we got all the data, show it
          if (name && artistName && art) {
            setSong(name);
            setArtist(artistName);
            setArtUrl(art);

            // Signal that the song data should be showing
            setMusicPlaying(true);
          } else {
            // Signal that the song data should not be showing
            setMusicPlaying(false);
          }
        })
        .catch(() => {
          setMusicPlaying(false);
        });
    };

    // Initialize with the data
    getSongData();

    // Refresh every 5 seconds
    const interval = setInterval(() => {
      getSongData();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [spotifyUrl, setSong, setArtist, setArtUrl, setMusicPlaying]);

  // Check if music is currently playing
  useEffect(() => {
    musicPlaying ? addComponent("music") : removeComponent("music");
    // Adding the functions to the dependencies breaks everything
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [musicPlaying]);

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
            case "music":
              returnComponent = (
                <Music
                  key={component}
                  song={song}
                  artist={artist}
                  artUrl={artUrl}
                />
              );
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
