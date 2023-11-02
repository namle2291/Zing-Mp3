import React, { useEffect, useState } from "react";

import classNames from "classnames/bind";
import styles from "./SideBar.module.scss";

import cd from "../../../../assets/images/cd.png";

import SideBarItem from "../../../SideBar/SideBarItem";
import useViewPort from "../../../../hooks/useViewPort";

import {
  CateIcon,
  KhamPhaIcon,
  LibraryIcon,
  MusicNewIcon,
  RadioIcon,
  StarIcon,
  ZingChartIcon,
} from "../../../Icon/Icon";

const cx = classNames.bind(styles);

const MENU_ITEMS1 = [
  {
    id: 1,
    label: "Khám phá",
    icon: <KhamPhaIcon />,
    to: "/",
  },
  {
    id: 2,
    label: "#zing-chart",
    icon: <ZingChartIcon />,
    to: "/zing-chart",
  },
  {
    id: 3,
    label: "Radio",
    icon: <RadioIcon />,
    to: "/radio",
  },
  {
    id: 4,
    label: "Thư viện",
    icon: <LibraryIcon />,
    to: "/library",
  },
];

const MENU_ITEMS2 = [
  {
    id: 1,
    label: "BXH Nhạc mới",
    icon: <MusicNewIcon />,
    to: "/new-music",
  },
  {
    id: 2,
    label: "Chủ Đề & Thể Loại",
    icon: <CateIcon />,
    to: "/hub",
  },
  {
    id: 3,
    label: "Top 100",
    icon: <StarIcon />,
    to: "/top-100",
  },
];

function SideBar() {
  const [mobile, setMobile] = useState(false);

  const viewport = useViewPort();

  useEffect(() => {
    if (viewport.width <= 1281) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, [viewport.width]);

  return (
    <div className="">
      <div className="flex align-items-center justify-center py-3">
        <img className="w-[40px] h-[40px] object-cover" src={cd} alt="" />
        <h5
          className={`pl-3 ${mobile ? "hidden" : "block m-0 font-playpen"}`}
          style={{ color: "var(--player-text)" }}
        >
          NamLee
        </h5>
      </div>
      <div>
        {MENU_ITEMS1.map((item) => (
          <SideBarItem mobile={mobile} key={item.id} data={item} />
        ))}
      </div>
      <div className={cx("border")}></div>
      <div>
        {MENU_ITEMS2.map((item) => (
          <SideBarItem mobile={mobile} key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}

export default SideBar;
