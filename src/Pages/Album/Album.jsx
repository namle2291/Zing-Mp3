import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../Component/Loading/Loading";
import { lsnAPI } from "../../axios/axios-custom";
import axios from "axios";
import AlbumList from "../../Component/Albums/AlbumList";
import { useDispatch, useSelector } from "react-redux";
import { MdPauseCircleOutline, MdPlayCircleOutline } from "react-icons/md";
import { setPlaying } from "../../features/settingPlay/settingPlay";
import { fetchAlbum, setInfoAlbum } from "../../features/setPlayNow/playNow";
import LoadingCircle from "../../Component/Loading/LoadingCircle";
import formatFollowers from "../../utils/formatFollowers";
import formatDate from "../../utils/formatDate";

function Album() {
  const [datas, setData] = useState([]);
  const [err, setErr] = useState("");

  const { playing, isReady } = useSelector((state) => state.setting);
  const { infoAlbumCurrent, loading } = useSelector((state) => state.playNow);

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    setData([]);
    axios.get(lsnAPI.getAlbumPage(id)).then(({ data }) => {
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
    <div className="flex flex-col lg:flex-row">
      <div className="md:w-[33%] text-center mx-auto">
        <div className="sticky top-0 left-0 flex flex-col gap-3">
          <div className="overflow-hidden shrink-0 mx-auto">
            <img
              className={`w-[100%] h-[100%] object-cover transition-all ${
                playing && isReady && infoAlbumCurrent.encodeId === datas.encodeId
                  ? "rotate-center"
                  : "rotate-center-pause rounded-lg"
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
                <span>{formatDate(datas.contentLastUpdate)}</span>
              </div>
              <div>
                <span>{formatFollowers(datas.like)}</span>
                <span> người yêu thích</span>
              </div>
            </div>
            <button
              className="rounded-3xl mx-auto py-[5px] mt-[16px]2"
              style={{
                backgroundColor: "var(--purple-primary)",
                borderColor: "var(--purple-primary)",
                color: "var(--white)",
              }}
            >
              {infoAlbumCurrent.encodeId !== datas.encodeId && (
                <div
                  className="px-[24px]"
                  onClick={() => {
                    dispatch(fetchAlbum(datas.encodeId));
                    dispatch(setInfoAlbum(datas));
                  }}
                >
                  <span className="text-[20px]">
                    <MdPlayCircleOutline />
                  </span>
                  <span>Phát album</span>
                </div>
              )}
              {loading && (
                <div className="px-[24px]">
                  <span className="text-[20px]">
                    <LoadingCircle />
                  </span>
                </div>
              )}
              {!playing &&
                !loading &&
                infoAlbumCurrent.encodeId === datas.encodeId && (
                  <div
                    className="px-[24px]"
                    onClick={() => {
                      dispatch(setPlaying(true));
                    }}
                  >
                    <span className="text-[20px]">
                      <MdPlayCircleOutline />
                    </span>
                    <span>Tiếp tục phát</span>
                  </div>
                )}
              {playing &&
                !loading &&
                infoAlbumCurrent.encodeId === datas.encodeId && (
                  <div
                    className="px-[24px]"
                    onClick={() => {
                      dispatch(setPlaying(false));
                    }}
                  >
                    <span className="text-[20px]">
                      <MdPauseCircleOutline />
                    </span>
                    <span>Tạm dừng</span>
                  </div>
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
