function formatTimes(duration) {
  const minutes = Math.floor((duration / 60) % 60);
  const seconds = Math.floor(duration - minutes * 60);
  return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}

export default formatTimes;
