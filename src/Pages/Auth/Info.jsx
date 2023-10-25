import React from "react";
import { useSelector } from "react-redux";
import PlayListItem from "../../Component/PlayLists/PlayListItem";

export default function Info() {
  const { userInfo, token } = useSelector((state) => state.auth);
  const { favouriteSongs } = useSelector((state) => state.playNow);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col align-items-center">
        <div
          className="w-[152px] h-[152px] overflow-hidden rounded-full"
          style={{ border: "4px solid var(--purple-primary)" }}
        >
          <img
            src={`${
              token &&
              userInfo.avatar !== "https://files.fullstack.edu.vn/f8-tiktok/"
                ? userInfo.avatar
                : "https://avatar.talk.zdn.vn/default"
            }`}
            alt=""
            className="w-full object-cover"
          />
        </div>
        <h5 className="text-[var(--text-primary)] mt-2">{userInfo.email}</h5>
      </div>
      <div className="grid grid-cols-1">
        {favouriteSongs &&
          favouriteSongs.map((item, index) => (
            <div className="" key={index}>
              <PlayListItem liked hasIcon data={item} />
            </div>
          ))}
      </div>
    </div>
  );
}
