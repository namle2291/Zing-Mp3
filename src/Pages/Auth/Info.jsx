import React from "react";
import { useSelector } from "react-redux";

export default function Info() {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      {Object.keys(userInfo).length > 0 && (
        <div className="flex flex-col">
          <div className="flex flex-col align-items-center">
            <div
              className="w-[152px] h-[152px] overflow-hidden rounded-full"
              style={{ border: "4px solid var(--purple-primary)" }}
            >
              <img
                src={`${
                  Object.keys(userInfo).length > 0 &&
                  userInfo.avatar !==
                    "https://files.fullstack.edu.vn/f8-tiktok/"
                    ? userInfo.avatar
                    : "https://avatar.talk.zdn.vn/default"
                }`}
                alt=""
                className="w-full object-cover"
              />
            </div>
            <h5 className="text-[var(--text-primary)] mt-2 text-center">
              <div>{userInfo.first_name + " " + userInfo.last_name}</div>
              <div className="text-[14px] my-1">{userInfo.email}</div>
              <div className="text-[14px] my-1">{userInfo.bio}</div>
            </h5>
          </div>
          <div className="grid grid-cols-1"></div>
        </div>
      )}
    </>
  );
}
