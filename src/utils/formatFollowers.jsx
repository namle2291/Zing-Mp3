import React from "react";

export default function formatFollowers(total = 0) {
  const str = total.toString();
  if (str.length === 6) {
    return str.slice(0, 3) + "K";
  } else if (str.length === 5) {
    return str.slice(0, 2) + "K";
  } else if (str.length === 7) {
    return str.slice(0, 1) + "M";
  }
  return str;
}
