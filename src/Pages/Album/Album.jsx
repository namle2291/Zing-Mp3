import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../../Component/Loading/Loading";
import { httpRequest, tmdAPI } from "../../axios/axios-custom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSongId } from "../../features/setPlayNow/playNow";
import AlbumList from "../../Component/Albums/AlbumList";

function Album() {
  const [datas, setData] = useState([]);
  const [err, setErr] = useState("");

  const { id } = useParams();

  useEffect(() => {
    axios.get(tmdAPI.getAlbumPage(id)).then(({ data }) => {
      if (data.err === 0) {
        setData(data.data);
      } else {
        setErr(data.msg);
      }
    });
  }, [id]);

  const fomratTime = (duration) => {
    const gio = Math.floor(duration / 60 / 60);
    const phut = Math.floor((duration / 60) % 60);
    return `${gio > 0 ? gio + " giờ " + phut : phut} phút`;
  };

  if (datas.length <= 0 && !err) return <Loading />;

  if (err) return <div className="text-center">{err}</div>;

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 lg:col-span-3 text-center">
        <div className="sticky top-0 left-0 flex gap-3 lg:block">
          <div className="overflow-hidden h-[150px] sm:h-auto rounded-lg shrink-0">
            <img
              className="w-[100%] h-[100%] object-cover"
              src={datas.thumbnailM}
              alt={datas.title}
            />
          </div>
          <div className="mt-[10px]">
            <h4>{datas.title}</h4>
            <div
              style={{ color: "var(--text-secondary)" }}
              className="text-[12px]"
            >
              <div>
                <span>Cập nhật: </span>
                <span>{datas.contentLastUpdate}</span>
              </div>
              <div>
                <span>{datas.like}</span>
                <span> người yêu thích</span>
              </div>
            </div>
            <button
              className="flex align-items-center justify-center rounded-3xl mx-auto px-[24px] py-[9px] mt-[16px] gap-2"
              style={{
                backgroundColor: "var(--purple-primary)",
                borderColor: "var(--purple-primary)",
                color: "var(--white)",
              }}
            >
              <span>🤍</span>
              <span>Phát Album</span>
            </button>
          </div>
        </div>
      </div>
      <div className="col-span-12 lg:col-span-9 px-3 mt-2 lg:mt-0">
        {datas.description && (
          <p>
            <span style={{ color: "var(--text-secondary)" }}>Lời tựa</span>{" "}
            <span style={{ color: "var(--player-text)" }}>
              {datas.description}
            </span>
          </p>
        )}

        {/* Album song */}
        <AlbumList data={datas?.song.items} />
        <div
          className="text-[13px] mt-2"
          style={{ color: "var(--text-secondary)" }}
        >
          <span>{datas.song.total} bài hát</span>
          {" - "}
          <span>{fomratTime(datas.song.totalDuration)}</span>
        </div>
      </div>
    </div>
  );
}

export default Album;
