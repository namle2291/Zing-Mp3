import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { tmdAPI } from "../../axios/axios-custom";

import MVItem from "../../Component/MV/MVItem";

import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import ArtistItem from "../../Component/Artists/ArtistItem";
import Loading from "../../Component/Loading/Loading";
import PlayListItem from "../../Component/PlayLists/PlayListItem";
import AlbumItem from "../../Component/Albums/AlbumItem";
import OutstandingItem from "../../Component/Outstanding/OutstandingItem";
const cx = classNames.bind(styles);

function Search() {
  const [datas, setData] = useState([]);
  const [mes, setMes] = useState("");

  const { q } = useParams();

  useEffect(() => {
    setData([]);
    axios.get(tmdAPI.getSearchAllKeyApi(q)).then(({ data }) => {
      if (data.data.counter.song !== 0) {
        setData(data.data);
      } else {
        setData([]);
        setMes("Không tìm thấy kết quả!");
      }
    });
  }, [q]);

  if (datas?.length === 0 && !mes) return <Loading />;

  if (mes && datas?.length === 0)
    return (
      <div className="text-center" style={{ color: "var(--text-primary)" }}>
        {mes}
      </div>
    );

  return (
    <>
      <div>
        <div className="flex align-items-center md:pl-[20px] flex-col lg:flex-row gap-2">
          <h4 className="m-0 pr-[20px] border-r-[1px]">Kết Quả Tìm Kiếm</h4>
          <nav className="flex flex-wrap align-items-center">
            <Link className="text-[14px] px-[14px] py-[5px] tab-active">
              TẤT CẢ
            </Link>
            <Link
              style={{ color: "var(--navigation-text)" }}
              className="text-[14px] px-[14px] py-[5px]"
            >
              BÀI HÁT
            </Link>
            <Link
              style={{ color: "var(--navigation-text)" }}
              className="text-[14px] px-[14px] py-[5px]"
            >
              PLAYLIST/ALBUM
            </Link>
            <Link
              style={{ color: "var(--navigation-text)" }}
              className="text-[14px] px-[14px] py-[5px]"
            >
              NGHỆ SĨ/OA
            </Link>
            <Link
              style={{ color: "var(--navigation-text)" }}
              className="text-[14px] px-[14px] py-[5px]"
            >
              MV
            </Link>
          </nav>
        </div>
        {/* Nổi bật */}
        <div className="my-4">
          <h4 className="mb-3">Nổi bật</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4">
            <div>
              {datas.artists[0] && (
                <OutstandingItem type="Nghệ sĩ" data={datas.artists[0]} />
              )}
            </div>
            <div>
              {datas.playlists[0] && (
                <OutstandingItem type="Playlist" data={datas.playlists[0]} />
              )}
            </div>
            <div>
              {datas.songs[0] && (
                <OutstandingItem type="Bài hát" data={datas.songs[0]} />
              )}
            </div>
          </div>
        </div>
        {/* Bài hát */}
        <div className="my-4">
          <h4 className={cx("mb-3")}>Bài hát</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {datas.songs &&
              datas.songs.map((item, index) => (
                <div key={index}>
                  <PlayListItem data={item} />
                </div>
              ))}
          </div>
        </div>
        {/* PlayList / Album */}
        <div className="my-4">
          <h4 className={cx("mb-3")}>PlayList/Album</h4>
          <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
            {datas.playlists &&
              datas.playlists.map((item, index) => (
                <div key={index}>
                  <AlbumItem data={item} />
                </div>
              ))}
          </div>
        </div>
        {/* MV */}
        <div className="my-4">
          <h4 className="mb-3">MV</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {datas.videos &&
              datas.videos.map((item, index) => (
                <div key={index}>
                  <MVItem data={item} />
                </div>
              ))}
          </div>
        </div>
        {/* Artits */}
        <div className="my-4">
          <h4 className={cx("mb-3")}>Nghệ Sĩ/OA</h4>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {datas.artists &&
              datas.artists.map((item, index) => (
                <div key={index}>
                  <ArtistItem data={item} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
