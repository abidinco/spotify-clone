import React, { useRef, useState, useContext } from "react";
import ReactAudioPlayer from "react-audio-player";
import AppContext from "../../store";
import { convertFloatToTime } from "../../utils";
import Icon from "../UI/Icon";
import styles from "./Player.module.css";

const Player = () => {
  const audioPlayer = useRef();
  const appCtx = useContext(AppContext);
  const [currentTime, setCurrentTime] = useState(0);
  const [durationValue, setDurationValue] = useState(0);

  const onPlaying = () => {
    const duration = audioPlayer.current.audioEl.current.duration;
    const currentTime = audioPlayer.current.audioEl.current.currentTime;
    const durationValue = (currentTime / duration) * 100;
    setDurationValue(durationValue);
    setCurrentTime(currentTime);
  };

  return (
    <div className={styles["player-wrapper"]}>
      <ReactAudioPlayer
        id="audio-player"
        controls={false}
        light={false}
        height={0}
        width={0}
        ref={audioPlayer}
        src={appCtx.playerTrackSrc}
        playing={appCtx.playerIsPlaying}
        loop={appCtx.playerLooped}
        muted={appCtx.playerMuted}
        volume={appCtx.playerVolume}
        // onVolumeChanged={(e) => console.log("onVolumeChanged", e)}
        // onReady={(e) => console.log("onReady", e)}
        onStart={appCtx.handlePlayerPlay}
        onListen={onPlaying}
        listenInterval={500}
        // onEnablePIP={(e) => console.log("onEnablePIP", e)}
        // onDisablePIP={(e) => console.log("onDisablePIP", e)}
        // onPause={(e) => console.log("handlePause", e)}
        // onBuffer={(e) => console.log("onBuffer", e)}
        onSeeked={(e) => e}
        onEnded={() => appCtx.handlePlayerPause()}
        onError={(e) => console.log("onError", e)}
        // onProgress={onPlaying}
        // onDuration={(e) => console.log("onDuration", e)}
      />
      <div className={styles["player-control-buttons"]}>
        <div className={styles["hover-white"]}>
          <Icon
            name="player-shuffle"
            color="rgb(255, 255, 255, .7)"
            width={16}
            height={16}
          />
        </div>
        <div className={styles["hover-white"]}>
          <Icon
            name="player-skip-back"
            color="rgb(255, 255, 255, .7)"
            width={16}
            height={16}
          />
        </div>
        <div
          className={styles["player-control-play"]}
          onClick={
            appCtx.playerIsPlaying
              ? appCtx.handlePlayerPause
              : appCtx.handlePlayerPlay
          }
        >
          {appCtx.playerIsPlaying ? (
            <Icon name="player-pause" color="black" width={16} height={16} />
          ) : (
            <Icon name="player-play" color="black" width={16} height={16} />
          )}
        </div>
        <div className={styles["hover-white"]}>
          <Icon
            name="player-skip-forward"
            color="rgb(255, 255, 255, .7)"
            width={16}
            height={16}
          />
        </div>
        <div onClick={() => appCtx.handlePlayerLoop(!appCtx.playerLooped)}>
          <Icon
            name={`player-repeat${appCtx.playerLooped ? "-active" : ""}`}
            color="rgb(255, 255, 255, .7)"
            width={16}
            height={16}
          />
        </div>
      </div>
      <div className={styles["player-control-bar"]}>
        <div className={styles["player-control-position"]}>
          {convertFloatToTime(currentTime)}
          { console.log(currentTime) }
        </div>
        <div className={styles["player-control-progress"]}>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={durationValue}
            onChange={(e) => {
              const duration = audioPlayer.current.audioEl.current.duration;
              audioPlayer.current.audioEl.current.currentTime =
                (e.target.value * duration) / 100;
              setDurationValue(e.target.value);
            }}
          />
        </div>
        <div className={styles["player-control-duration"]}>
          {convertFloatToTime(
            audioPlayer.current
              ? audioPlayer.current.audioEl.current.duration
              : "0.0"
          )}
        </div>
      </div>
    </div>
  );
};

export default Player;
