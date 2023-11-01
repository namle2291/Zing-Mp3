import React, { useEffect, useState } from "react";
import { Top100Icon } from "../../Component/Icon/Icon";
import axios from "axios";
import { lsnAPI } from "../../axios/axios-custom";
import AlbumItem from "../../Component/Albums/AlbumItem";
import Loading from "../../Component/Loading/Loading";

function Top100() {
  const [data, setData] = useState({});
  useEffect(() => {
    axios.get(lsnAPI.getTop100Page()).then(({ data }) => {
      setData(data.data);
    });
  }, []);

  if (Object.keys(data).length <= 0) return <Loading />;
  return (
    <div>
      <div className="max-w-[625px] mx-auto">
        <Top100Icon className="w-full" />
      </div>
      <div>
        {Object.keys(data).length > 0 &&
          data.map((dt, index) => {
            return (
              <div key={index} className="mb-4">
                {dt?.title && dt?.items && (
                  <h4 className="mb-3">{dt?.title}</h4>
                )}
                {dt?.sectionType === "playlist" && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {dt.items &&
                      dt.items.map((item, index) => (
                        <div key={index}>
                          <AlbumItem data={item} />
                        </div>
                      ))}
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Top100;
