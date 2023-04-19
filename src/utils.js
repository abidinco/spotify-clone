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

const triggerBreakpoints = (top) => {
  const path = document.location.pathname;
  const body = document.body;
  if (
    path.startsWith("/playlist") ||
    path.startsWith("/artist") ||
    path === "/collection/tracks" ||
    path.startsWith("/album")
  ) {
    top >= 330
      ? body.setAttribute("display-now-playing", true)
      : body.setAttribute("display-now-playing", false);
    top > 380
      ? body.setAttribute("song-list-header-stuck", true)
      : body.setAttribute("song-list-header-stuck", false);
    top >= 300
      ? body.setAttribute("navbar-opacity", 1)
      : top >= 200
      ? body.setAttribute("navbar-opacity", 0.5)
      : body.setAttribute("navbar-opacity", 0);
  } else {
    top >= 150
      ? body.setAttribute("navbar-opacity", 1)
      : top >= 100
      ? body.setAttribute("navbar-opacity", 0.5)
      : body.setAttribute("navbar-opacity", 0);
  }
};

const getRandomRGB = (max) => {
  return `rgb(${Math.floor(Math.random() * max)},${Math.floor(
    Math.random() * max
  )},${Math.floor(Math.random() * max)})`;
};

const convertFloatToTime = (time) => {
  let minutes = Math.floor(Math.trunc(time) / 60);
  let seconds = Math.trunc(time) % 60;
  return `${minutes.length > 1 ? minutes : "0" + minutes}:${
    seconds.length > 0 ? seconds : seconds.toString().padStart(2, "0")
  }`;
};

export {
  formatDate,
  millisToMinutesAndSeconds,
  numberWithCommas,
  convertFloatToTime,
  convertMsToTime,
  calculatePlaylistDuration,
  welcomingMessage,
  triggerBreakpoints,
  getRandomRGB,
};
