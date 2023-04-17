import React, { useRef, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import styles from "./Player.module.css";
import Icon from "../UI/Icon";

const Player = () => {
  const audioPlayer = useRef();
  const [playing, setPlaying] = useState(false);
  const playTrack = () => {
    audioPlayer.current.audioEl.current.play();
    setPlaying(true);
  };
  const pauseTrack = () => {
    audioPlayer.current.audioEl.current.pause();
    setPlaying(false);
  };
  return (
    <div className={styles["player-wrapper"]}>
      <ReactAudioPlayer
        id="player"
        ref={audioPlayer}
        src={"/soolokisa.mp3"}
        width={0}
        height={0}
        playing={true}
        autoPlay={playing}
        controls={false}
        light={false}
        loop={false}
        playbackRate={1.0}
        volume={0.2}
        muted={false}
        onReady={(e) => console.log("onReady", e)}
        onStart={(e) => console.log("onStart", e)}
        onPlay={(e) => console.log("onPlay", e)}
        onEnablePIP={(e) => console.log("onEnablePIP", e)}
        onDisablePIP={(e) => console.log("onDisablePIP", e)}
        onPause={(e) => console.log("handlePause", e)}
        onBuffer={(e) => console.log("onBuffer", e)}
        onSeek={(e) => console.log("onSeek", e)}
        onEnded={(e) => console.log("onEnded", e)}
        onError={(e) => console.log("onError", e)}
        onProgress={(e) => console.log("onProgress", e)}
        onDuration={(e) => console.log("onDuration", e)}
      />
      <div className={styles["player-control-buttons"]}>
        <Icon
          name="player-shuffle"
          color="rgb(255, 255, 255, .7)"
          width={16}
          height={16}
        />
        <Icon
          name="player-skip-back"
          color="rgb(255, 255, 255, .7)"
          width={16}
          height={16}
        />
        <div
          className={styles["player-control-play"]}
          onClick={playing ? pauseTrack : playTrack}
        >
          {playing ? (
            <Icon name="player-pause" color="black" width={16} height={16} />
          ) : (
            <Icon name="player-play" color="black" width={16} height={16} />
          )}
        </div>
        <Icon
          name="player-skip-forward"
          color="rgb(255, 255, 255, .7)"
          width={16}
          height={16}
        />
        <Icon
          name="player-repeat"
          color="rgb(255, 255, 255, .7)"
          width={16}
          height={16}
        />
      </div>
      <div className={styles["player-control-bar"]}>
        <div className={styles["player-control-position"]}>7:51</div>
        <div className={styles["player-control-progress"]}>
          <input
            className={styles["player-control-progress-input"]}
            type="range"
            min={0}
            max={100}
            step={2}
            defaultValue={0}
          />
        </div>
        <div className={styles["player-control-duration"]}>9:40</div>
      </div>
    </div>
  );
};

export default Player;
