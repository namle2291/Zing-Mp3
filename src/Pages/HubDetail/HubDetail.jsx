import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { lsnAPI } from "../../axios/axios-custom";
import Loading from "../../Component/Loading/Loading";
import AlbumItem from "../../Component/Albums/AlbumItem";
import PlayListItem from "../../Component/PlayLists/PlayListItem";
import MVItem from "../../Component/MV/MVItem";
import ArtistItem from "../../Component/Artists/ArtistItem";

function HubDetail() {
  const [data, setData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios.get(lsnAPI.getHubDetail(id)).then(({ data }) => {
      setData(data.data);
    });
  }, []);

  if (Object.keys(data).length <= 0) return <Loading />;

  return (
    <div>
      <div className="overflow-hidden">
        <img src={data.cover} className="w-full object-cover" alt="" />
      </div>
      {data.sections &&
        data.sections.map((sc, index) => (
          <div key={index} className="mt-4">
            <h4>{sc.title}</h4>
            {sc.sectionType === "playlist" && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
                {sc.items &&
                  sc.items.slice(0, 5).map((item, index) => {
                    return (
                      <div key={index}>
                        <AlbumItem data={item} />
                      </div>
                    );
                  })}
              </div>
            )}
            {sc.sectionType === "song" && (
              <div className="grid grid-cols-2 sm:grid-cols-3">
                {sc.items &&
                  sc.items.map((item, index) => {
                    return (
                      <div key={index}>
                        <PlayListItem
                          isVip={item?.streamingStatus === 2 ? true : false}
                          data={item}
                        />
                      </div>
                    );
                  })}
              </div>
            )}
            {sc.sectionType === "video" && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {sc.items &&
                  sc.items.slice(0, 5).map((item, index) => {
                    return (
                      <div key={index}>
                        <MVItem data={item} />
                      </div>
                    );
                  })}
              </div>
            )}
            {sc.sectionType === "artist" && (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {sc.items &&
                  sc.items.slice(0, 5).map((item, index) => {
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
    </div>
  );
}

export default HubDetail;
