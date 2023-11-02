import React from "react";
import { useSelector } from "react-redux";

export default function ItemLyric({ data, isShow }) {
  const { played } = useSelector((state) => state.setting);

  let text = "";
  let e = data.words;

  let startTime = e[0].startTime / 1000;
  let endTime = e[e.length - 1].endTime / 1000;

  let active = played >= startTime && played < endTime;
  let over = played > endTime;

  data.words.forEach((e) => {
    text += e.data + " ";
  });

  return (
    <div
      className={`text-[var(--text-primary)] md:text-[30px] ${
        active ? "text-yellow-300" : ""
      } ${over ? "text-gray-500" : ""}`}
    >
      {text}{" "}
    </div>
  );
}
