import axios from "axios";
import React, { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { httpRequest } from "../../axios/axios-custom";
import Loading from "../../Component/Loading/Loading";
import PlayListItem from "../../Component/PlayLists/PlayListItem";
import AlbumItem from "../../Component/Albums/AlbumItem";
import MVItem from "../../Component/MV/MVItem";
import ArtistItem from "../../Component/Artists/ArtistItem";

function Artist() {
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(false);

  const { name } = useParams();

  useEffect(() => {
    setLoading(true);
    httpRequest.get(`/artist?name=${name}`).then(({ data }) => {
      if (data.err === 0) {
        setdata(data.data);
        setLoading(false);
      }
    });
  }, [name]);

  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <>
          <div className="grid grid-cols-12 mb-3">
            <div className="md:hidden col-span-12">
              <div className="max-w-[150px] max-h-[150px] overflow-hidden rounded-full mx-auto">
                <img
                  src={data.thumbnailM}
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
            </div>
            <div className="col-span-12 md:col-span-8 text-white">
              <h3 className="text-[var(--text-primary)] text-center md:text-left">
                {data.name}
              </h3>
              <p>{data.sortBiography}</p>
              <div className="flex items-center justify-center  md:justify-start gap-2">
                <button className="px-4 py-2 bg-[var(--purple-primary)] rounded-3xl text-[var(--text-primary)]">
                  Phát nhạc
                </button>
                <button className="px-4 py-2 bg-[var(--purple-primary)] rounded-3xl text-[var(--text-primary)]">
                  Quan tâm
                </button>
              </div>
            </div>
            <div className="col-span-12 hidden md:block md:col-span-4 text-white mx-auto">
              <div className="max-w-[260px] max-h-[260px] overflow-hidden rounded-full">
                <img
                  src={data.thumbnailM}
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
            </div>
          </div>
          {Object.keys(data).length > 0 &&
            data.sections.map((section, index) => (
              <div key={index} className="mb-3">
                <h4 className="text-[var(--text-primary)]">{section.title}</h4>
                {section.sectionType === "song" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-h-[300px] overflow-y-auto">
                    {section?.items.map((item, index) => (
                      <div key={index}>
                        <PlayListItem data={item} />
                      </div>
                    ))}
                  </div>
                )}
                {section.sectionType === "playlist" && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {section.items.slice(0, 5).map((item, index) => {
                      return (
                        <div key={index}>
                          <AlbumItem data={item} />
                        </div>
                      );
                    })}
                  </div>
                )}
                {section?.sectionType === "video" && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {section.items.slice(0, 5).map((item, index) => {
                      return (
                        <div key={index}>
                          <MVItem data={item} />
                        </div>
                      );
                    })}
                  </div>
                )}
                {section.sectionType === "artist" && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {section?.items.slice(0, 5).map((item, index) => {
                      return (
                        <div key={index}>
                          <ArtistItem data={item} />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          {/* {console.log(data.sections)} */}
        </>
      )}
    </>
  );
}

export default memo(Artist);
