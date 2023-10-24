import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../Component/Loading/Loading";
import { httpRequest, tmdAPI } from "../../axios/axios-custom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSongId } from "../../features/setPlayNow/playNow";

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

        <table className="border-separate border-spacing-x-1 table-no-border w-[100%]">
          <thead>
            <tr style={{ color: "var(--text-secondary)" }}>
              <th>Bài hát</th>
              <th className="hidden lg:table-cell">Album</th>
              <th className="w-[100px] text-end">Thời gian</th>
            </tr>
          </thead>
          <tbody>
            {datas?.song &&
              datas?.song.items.map((item, index) => {
                return (
                  <tr
                    onClick={() => {}}
                    key={index}
                    className="hover:table-active align-middle"
                  >
                    <td className="">
                      <div className="flex gap-2 align-items-center">
                        <div className="max-w-[40px] max-h-[40px] overflow-hidden rounded-md">
                          <img
                            className="w-[100%] h-[100%] object-cover"
                            src={item.thumbnail}
                            alt={item.title}
                          />
                        </div>
                        <div>
                          <div
                            className="text-[14px] line-clamp-1"
                            style={{ color: "var(--player-text)" }}
                          >
                            {item.title}
                            {item.streamingStatus === 2 && (
                              <span className="ml-2 bg-yellow-400 text-white text-[12px] px-2 py-[2px] rounded-[3px] font-semibold">
                                Vip
                              </span>
                            )}
                          </div>
                          <a
                            href="/"
                            className="text-[12px]"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            {item.artistsNames}
                          </a>
                        </div>
                      </div>
                    </td>
                    <td
                      className="hidden lg:table-cell "
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <span className="text-[13px]">
                        {item.album?.title ?? item.title}
                      </span>
                    </td>
                    <td
                      className="text-end"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <span className="text-[14px]">3:02</span>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
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
