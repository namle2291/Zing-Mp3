import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import smoothScrollIntoView from "smooth-scroll-into-view-if-needed";

export default function ItemLyric({ data, isShow }) {
  const { played } = useSelector((state) => state.setting);

  const liRef = useRef(null);

  const scrollActive = useCallback(() => {
    setTimeout(() => {
      if (!liRef.current) return;
      smoothScrollIntoView(liRef.current, {
        block: "center",
        behavior: "smooth",
      });
    }, 50);
  }, []);

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
    <li
      ref={liRef}
      className={`text-[var(--text-primary)] text-[20px] ${
        active ? "text-yellow-300" : ""
      } ${over ? "text-gray-500" : ""}`}
    >
      {" "}
      {text}{" "}
    </li>
  );
}
