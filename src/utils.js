const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const formatDate = (date) => {
  let d = new Date(date),
    month = "" + months[d.getMonth()],
    day = "" + d.getDate(),
    year = d.getFullYear();
  return month + " " + day + ", " + year;
};

const millisToMinutesAndSeconds = (millis) => {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const convertMsToTime = (ms) => {
  let seconds = Math.floor(ms / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  seconds = seconds % 60;
  minutes = minutes % 60;
  return `about ${hours !== 0 ? hours + " hr" : ""} ${minutes} min ${
    hours === 0 ? seconds + " sec" : ""
  }`;
};

const calculatePlaylistDuration = (items) => {
  let durations = items.map((item) => item.track.duration_ms);
  return convertMsToTime(durations.reduce((acc, val) => acc + val, 0));
};

const welcomingMessage = () => {
  let date = new Date();
  if (date.getHours() < 12) return "Good morning";
  if (date.getHours() < 17) return "Good afternoon";
  if (date.getHours() < 25) return "Good evening";
};

const navbarBreakpoint = (top) => {
  const path = document.location.pathname;
  if (
    path.startsWith("/playlist") ||
    path.startsWith("/artist") ||
    path === "/collection/tracks"
  ) {
    if (top >= 386 && !(top < 386)) {
      return { attribute: "song-list-header-stuck", value: true };
    } else if (top > 331) {
      return { attribute: "song-list-header-stuck", value: false };
    } else if (top >= 330) {
      return { attribute: "display-now-playing", value: true };
    } else if (top >= 300) {
      return { attribute: "navbar-opacity", value: 1 };
    } else if (top >= 200) {
      return { attribute: "navbar-opacity", value: 0.5 };
    } else if (top >= 150) {
      return { attribute: "navbar-opacity", value: 0 };
    } else {
      return { attribute: "display-now-playing", value: false };
    }
  } else {
    if (top >= 150) {
      return { attribute: "navbar-opacity", value: 1 };
    } else if (top >= 100) {
      return { attribute: "navbar-opacity", value: 0.5 };
    } else {
      return { attribute: "navbar-opacity", value: 0 };
    }
  }
};

export {
  formatDate,
  millisToMinutesAndSeconds,
  numberWithCommas,
  calculatePlaylistDuration,
  welcomingMessage,
  navbarBreakpoint,
};
