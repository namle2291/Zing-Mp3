import axios from "axios";
import React, { memo, useEffect, useState } from "react";
import { lsnAPI } from "../../axios/axios-custom";
import Loading from "../../Component/Loading/Loading";
import AlbumItem from "../../Component/Albums/AlbumItem";
import { Link } from "react-router-dom";

function HubHome() {
  const [data, setData] = useState({});
  useEffect(() => {
    axios.get(lsnAPI.getHubHome()).then(({ data }) => {
      setData(data.data);
    });
  }, []);

  if (Object.keys(data).length <= 0) return <Loading />;

  return (
    <div>
      {/* Banner */}
      {data.banners && (
        <div>
          <img
            src={data.banners[0].cover}
            className="w-full object-cover"
            alt=""
          />
        </div>
      )}
      {/* Nổi bật */}
      <div className="my-4">
        {data.featured && (
          <>
            <h3 className="text-[var(--text-primary)]">
              {data.featured.title}
            </h3>
            <div className="grid grid-cols-4 gap-4">
              {data.featured.items.map((item, index) => {
                return (
                  <div key={index} className="relative cursor-pointer">
                    <img
                      className="w-full rounded-lg"
                      src={item.thumbnail}
                      alt=""
                    />
                    <h5 className="absolute inset-center text-[var(--text-primary)]">
                      {item.title}
                    </h5>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
      {/* Quốc gia */}
      <div className="mb-4">
        {data.nations && (
          <>
            <h3 className="text-[var(--text-primary)]">Quốc gia</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {data.nations.map((item, index) => {
                return (
                  <Link
                    to={`/hub/detail/${item.encodeId}`}
                    key={index}
                    className="relative cursor-pointer"
                  >
                    <img
                      className="w-full rounded-lg"
                      src={item.thumbnail}
                      alt=""
                    />
                    <h5 className="absolute inset-center text-[var(--text-primary)]">
                      {item.title}
                    </h5>
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </div>
      {/* Tâm Trạng Và Hoạt Động */}
      <div className="mb-4">
        {data.topic && (
          <>
            <h3 className="text-[var(--text-primary)]">
              Tâm Trạng Và Hoạt Động
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {data.topic.slice(0, 8).map((item, index) => {
                return (
                  <Link
                    to={`/hub/detail/${item.encodeId}`}
                    key={index}
                    className="relative cursor-pointer"
                  >
                    <img
                      className="w-full rounded-lg"
                      src={item.thumbnail}
                      alt=""
                    />
                    <div className="absolute bottom-[10px] left-[10px]">
                      <h5 className="text-[var(--text-primary)]">
                        {item.title}
                      </h5>
                      <div className="flex gap-2">
                        {item.playlists.map((item, index) => (
                          <div
                            key={index}
                            className="w-[50px] h-[50px] overflow-hidden shrink-0"
                          >
                            <img
                              className="w-full object-cover rounded-lg"
                              key={index}
                              src={item.thumbnail}
                              alt=""
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </div>
      {/* Genre */}
      <div className="mb-4">
        {data.genre &&
          data.genre.map((item, index) => (
            <div key={index}>
              <h3 className="text-[var(--text-primary)]">{item.title}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {item.playlists.slice(0, 5).map((item, index) => {
                  return <AlbumItem key={index} data={item} />;
                })}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default memo(HubHome);
