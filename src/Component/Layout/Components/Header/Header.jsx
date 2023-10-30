import React, { useEffect, useState } from "react";
import Tippy from "@tippyjs/react";
import { Link, useNavigate } from "react-router-dom";

import { LeftIcon, RightIcon } from "../../../Icon/Icon";

import { FcReddit, FcSettings } from "react-icons/fc";
import Search from "../Search/Search";
import ChooseTheme from "../../../ChooseTheme/ChooseTheme";

import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../../../features/setAuth/setAuth";

const cx = classNames.bind(styles);

function Header() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const { userInfo, token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    dispatch(userLogout());
    navigate("/");
  };

  return (
    <>
      {show && <ChooseTheme show handleClose={handleClose} />}
      <div
        className="grid grid-cols-12 py-3 px-[20px] md:px-[60px]"
        style={{ backgroundColor: "var(--layout-bg)" }}
      >
        <div className="col-span-8 md:col-span-10">
          <div className={cx("left-content")}>
            <div className="hidden md:block">
              <span
                className="mr-[8px]"
                style={{ color: "var(--text-primary)" }}
              >
                <LeftIcon />
              </span>
              <span
                className="ml-[8px]"
                style={{ color: "var(--text-primary)" }}
              >
                <RightIcon />
              </span>
            </div>
            <Search />
          </div>
        </div>
        <div className="col-span-4 md:col-span-2 text-end">
          <div className="flex justify-end gap-[10px] align-items-center">
            <div
              onClick={handleShow}
              className="align-items-center justify-center overflow-hidden rounded-full flex w-[40px] h-[40px] shrink-0 cursor-pointer"
              style={{ backgroundColor: "var(--alpha-bg)" }}
            >
              <span>
                <FcReddit />
              </span>
            </div>
            <div
              className="align-items-center justify-center overflow-hidden rounded-full w-[40px] h-[40px] shrink-0 cursor-pointer"
              style={{ backgroundColor: "var(--alpha-bg)" }}
            >
              <Tippy
                allowHTML
                animation="fade"
                interactive="true"
                placement="bottom-start"
                trigger="click"
                content={
                  <div className="w-[129px] rounded-sm bg-[var(--purple-primary)] text-[14px]">
                    {token ? (
                      <>
                        <Link
                          to="/info"
                          className="block hover:bg-[var(--alpha-bg)] text-start px-3 py-2"
                          style={{ color: "var(--white)" }}
                        >
                          Thông tin
                        </Link>
                        <button
                          className="block hover:bg-[var(--alpha-bg)] text-start px-3 py-2 w-full"
                          style={{ color: "var(--white)" }}
                          onClick={handleLogout}
                        >
                          Đăng xuất
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/register"
                          className="block hover:bg-[var(--alpha-bg)] text-start px-3 py-2"
                          style={{ color: "var(--white)" }}
                        >
                          Đăng ký
                        </Link>
                        <Link
                          to="/login"
                          className="block hover:bg-[var(--alpha-bg)] text-start px-3 py-2"
                          style={{ color: "var(--white)" }}
                        >
                          Đăng nhập
                        </Link>
                      </>
                    )}
                  </div>
                }
              >
                <span className="py-3">
                  <img
                    className="w-[100%] h-[100%] object-cover"
                    src={`${
                      Object.keys(userInfo).length > 0 &&
                      userInfo.avatar !==
                        "https://files.fullstack.edu.vn/f8-tiktok/"
                        ? userInfo.avatar
                        : "https://avatar.talk.zdn.vn/default"
                    }`}
                    alt=""
                  />
                </span>
              </Tippy>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
