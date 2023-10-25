import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { httpRequest, tmdAPI } from "../../axios/axios-custom";

import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import Loading from "../../Component/Loading/Loading";
import PlayListItem from "../../Component/PlayLists/PlayListItem";
import AlbumItem from "../../Component/Albums/AlbumItem";

const cx = classNames.bind(styles);

const tabs = [
  {
    id: 1,
    title: "Tất cả",
    value: "all",
  },
  {
    id: 2,
    title: "Việt Nam",
    value: "vPop",
  },
  {
    id: 3,
    title: "Quốc tế",
    value: "others",
  },
];

function Home() {
  const [playLists, setPlayLists] = useState([]);
  const [tab, setTab] = useState("all");
  const [loading, setLoading] = useState(false);

  const [newRelease, setNewRelease] = useState({
    all: [],
    vPop: [],
    others: [],
  });

  useEffect(() => {
    setLoading(true);
    httpRequest.get("/home").then(({ data }) => {
      const { items } = data.data;
      const playlists = items.filter((dt) => dt.sectionType === "playlist");
      setNewRelease(items[2].items);
      setPlayLists(playlists);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <div>
          {/* <Banner data={banner} /> */}
          <div className={cx("new-release")}>
            <h2 className={cx("heading")}>Mới phát hành</h2>
            <div className={cx("tabs")}>
              {tabs.map((item) => (
                <button
                  key={item.id}
                  className={cx("tab-item", item.value === tab ? "active" : "")}
                  onClick={() => setTab(item.value)}
                >
                  {item.title}
                </button>
              ))}
            </div>
            {/* Bài hát */}
            <div className={cx("")}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {newRelease &&
                  newRelease[tab].map((item, index) => (
                    <div key={index}>
                      <PlayListItem data={item} />
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {playLists &&
            playLists.map((pl, index) => {
              return (
                <div key={index} className="my-4">
                  <div className="flex justify-between align-items-center">
                    <h2
                      className="mb-[16px]"
                      style={{ color: "var(--player-text)" }}
                    >
                      {pl.title}
                    </h2>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {pl.items.map((item, index) => {
                      return (
                        <div key={index}>
                          <AlbumItem data={item} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </>
  );
}

export default Home;
