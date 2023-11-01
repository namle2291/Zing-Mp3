import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../Component/Loading/Loading";
import { lsnAPI } from "../../axios/axios-custom";
import axios from "axios";
import AlbumList from "../../Component/Albums/AlbumList";
import { useDispatch, useSelector } from "react-redux";
import { MdPauseCircleOutline, MdPlayCircleOutline } from "react-icons/md";
import { setPlaying } from "../../features/settingPlay/settingPlay";

function Album() {
  const [datas, setData] = useState([]);
  const [err, setErr] = useState("");

  const { playing } = useSelector((state) => state.setting);

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    setData([]);
    axios.get(lsnAPI.getAlbumPage(id)).then(({ data }) => {
      if (data.err === 0) {
        setData(data.data);
        dispatch(setPlaying(true));
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
    <div className="flex flex-col lg:flex-row">
      <div className="md:w-[33%] text-center mx-auto">
        <div className="sticky top-0 left-0 flex flex-col gap-3">
          <div className="overflow-hidden shrink-0 mx-auto">
            <img
              className={`w-[100%] h-[100%] object-cover ${
                playing ? "isPlaying" : "rounded-lg"
              }`}
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
              className="flex align-items-center justify-center rounded-3xl mx-auto px-[24px] py-[5px] mt-[16px] gap-2"
              style={{
                backgroundColor: "var(--purple-primary)",
                borderColor: "var(--purple-primary)",
                color: "var(--white)",
              }}
              onClick={() => dispatch(setPlaying(!playing))}
            >
              {playing ? (
                <>
                  <span className="text-[20px]">
                    <MdPauseCircleOutline />
                  </span>
                  <span>Tạm dừng</span>{" "}
                </>
              ) : (
                <>
                  <span className="text-[20px]">
                    <MdPlayCircleOutline />
                  </span>
                  <span>Tiếp tục phát</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="px-3 mt-2 lg:mt-0 flex-1">
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
