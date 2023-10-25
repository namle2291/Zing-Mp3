import React, { memo, useEffect } from "react";

import Header from "../Components/Header/Header";
import SideBar from "../Components/SideBar/SideBar";
import Footer from "../Components/Footer/Footer";

import classNames from "classnames/bind";
import styles from "./MainLayout.module.scss";
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);

function MainLayout({ children }) {
  const { currentSongId } = useSelector((satate) => satate.playNow);

  return (
    <div
      className={`grid grid-cols-12 overflow-y-scroll ${
        currentSongId ? "h-[calc(100vh-90px)]" : "h-screen"
      }`}
    >
      <div
        className="hidden sm:block col-span-1 xl:col-span-2"
        style={{
          backgroundColor: "var(--sidebar-bg)",
        }}
      >
        <div className="sticky top-0">
          <SideBar />
        </div>
      </div>
      <div className="col-span-12 sm:col-span-11 xl:col-span-10">
        <div className="sticky top-0 z-10">
          <Header />
        </div>
        <div className="px-[20px] md:px-[60px] mt-[10px]">{children}</div>
      </div>
      {currentSongId && <Footer />}
    </div>
  );
}

export default memo(MainLayout);
