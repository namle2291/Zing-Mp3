import React, { useState } from "react";

import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import { SearchIcon } from "../../../Icon/Icon";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);

function Search() {
  const [text, setText] = useState("");

  const navigate = useNavigate();

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (!text.startsWith(" ") && text !== "") {
        navigate("/search/" + text);
      }
    }
  };
  return (
    <div className={cx("wrapper")}>
      <span>
        <SearchIcon />
      </span>
      <input
        className="text-[13px]"
        type="text"
        value={text}
        placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
        onKeyPress={handleKeyPress}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
}

export default Search;
