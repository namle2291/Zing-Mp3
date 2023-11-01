import axios from "axios";
import React, { useEffect, useState } from "react";
import { lsnAPI } from "../../axios/axios-custom";
import Loading from "../../Component/Loading/Loading";
import AlbumListChartItem from "../../Component/Albums/AlbumListChartItem";
import { useSelector } from "react-redux";

function NewMusic() {
  const [data, setData] = useState({});

  const { currentSongId } = useSelector((state) => state.playNow);

  useEffect(() => {
    axios.get(lsnAPI.getNewSong()).then(({ data }) => {
      setData(data.data);
    });
  }, []);

  if (Object.keys(data).length <= 0) return <Loading />;

  return (
    <div className="">
      <div className="overflow-hidden">
        <img className="w-full object-cover" src={data.banner} alt="" />
      </div>
      <div className="mt-4">
        <h3 className="text-[var(--text-primary)]">BXH Nhạc Mới</h3>
        <div className="mt-2">
          <ul className="list-none p-0 m-0">
            {data.items.map((dt, index) => (
              <AlbumListChartItem
                active={dt.encodeId === currentSongId}
                key={index}
                item={dt}
                index={index + 1}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NewMusic;
