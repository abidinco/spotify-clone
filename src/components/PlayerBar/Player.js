import React, { useRef, useState, useContext } from "react";
import ReactAudioPlayer from "react-audio-player";
import styles from "./Player.module.css";
import Icon from "../UI/Icon";
import { convertFloatToTime } from "../../utils";
import AppContext from "../../store";

const Player = () => {
  const audioPlayer = useRef();
  const appCtx = useContext(AppContext);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [durationValue, setDurationValue] = useState(0);

  const playTrack = () => {
    audioPlayer.current.audioEl.current.play();
    setPlaying(true);
  };
  const pauseTrack = () => {
    audioPlayer.current.audioEl.current.pause();
    setPlaying(false);
  };
  const onPlaying = () => {
    const duration = audioPlayer.current.audioEl.current.duration;
    const currentTime = audioPlayer.current.audioEl.current.currentTime;
    const durationValue = (currentTime / duration) * 100;
    setDurationValue(durationValue);
    setCurrentTime(currentTime);
  };
  const endTrack = () => {
    setPlaying(false);
  };
  return (
    <div className={styles["player-wrapper"]}>
      <ReactAudioPlayer
        ref={audioPlayer}
        src={"/soolokisa.mp3"}
        width={0}
        height={0}
        playing={true}
        controls={false}
        light={false}
        loop={false}
        muted={appCtx.playerMuted}
        volume={appCtx.playerVolume}
        // onVolumeChanged={(e) => console.log("onVolumeChanged", e)}
        // onReady={(e) => console.log("onReady", e)}
        onStart={(e) => console.log("onStart", e)}
        // onPlay={onPlaying}
        onListen={onPlaying}
        listenInterval={500}
        // onEnablePIP={(e) => console.log("onEnablePIP", e)}
        // onDisablePIP={(e) => console.log("onDisablePIP", e)}
        // onPause={(e) => console.log("handlePause", e)}
        // onBuffer={(e) => console.log("onBuffer", e)}
        onSeeked={(e) => e}
        onEnded={endTrack}
        onError={(e) => console.log("onError", e)}
        // onProgress={onPlaying}
        // onDuration={(e) => console.log("onDuration", e)}
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
        <div className={styles["player-control-position"]}>
          {convertFloatToTime(currentTime)}
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
