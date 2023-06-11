import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  volume: 0.5,
  muted: false,
  looped: false,
  trackSrc: "/soolokisa.mp3",
  isPlaying: false,
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setVolume: (state, action) => {
      state.volume = action.payload.volume;
    },
    play: (state) => {
      state.isPlaying = true;
    },
    pause: (state) => {
      state.isPlaying = false;
    },
    mute: (state, action) => {
      state.muted = action.payload.mute;
    },
    loop: (state, action) => {
      state.looped = action.payload.loop;
    },
    changeTrack: (state, action) => {
      return (state = {
        isPlaying: action.payload.isPlaying,
        trackSrc: action.payload.trackSrc,
      });
    },
  },
});

export const { setVolume, play, pause, mute, loop, changeTrack } =
  playerSlice.actions;
export default playerSlice.reducer;
