import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { lsnAPI } from "../../axios/axios-custom";
import Loading from "../../Component/Loading/Loading";
import MVItem from "../../Component/MV/MVItem";

function Video() {
  const [data, setData] = useState({});
  const [artists, setArtists] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    setData({});
    axios.get(lsnAPI.getVideoMv(id)).then(({ data }) => {
      if (data) {
        setData(data.data);
        data.data.artists.map((item) => {
          return axios
            .get(lsnAPI.getArtistPage(item.alias))
            .then(({ data }) => {
              setArtists([data.data]);
            });
        });
      }
    });
  }, [id]);

  return (
    <>
      {Object.keys(data).length <= 0 && <Loading />}
      {!Object.keys(data).length <= 0 && (
        <div className="overflow-y-scroll h-full">
          <div className="p-[20px] h-full">
            {/* Header */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="overflow-hidden shrink-0 w-[50px] h-[50px] rounded-full">
                  <img
                    className="w-full h-full object-cover"
                    src={data.artist.thumbnail}
                    alt=""
                  />
                </div>
                <div>
                  <h5 className="text-[var(--text-primary)] m-0">
                    {data.title}
                  </h5>
                  {data.artists &&
                    data.artists.map((item, index) => (
                      <Link
                        className="text-[var(--text-secondary)]"
                        to={`/artist/${item.alias}`}
                        key={index}
                      >
                        {index > 0 ? ", " : ""}
                        <span className="hover:underline">{item.name}</span>
                      </Link>
                    ))}
                </div>
              </div>
              <Link to={`/`} className="text-[var(--text-primary)] cursor-pointer">X</Link>
            </div>
            {/* MV */}
            <div className="grid grid-cols-12 mt-4 gap-4">
              <div className="col-span-12 xl:col-span-8 py-5 bg-black flex items-center rounded-lg">
                <video
                  className="w-full"
                  src={data.streaming.mp4["720p"]}
                  controls
                  autoPlay
                ></video>
              </div>
              <div className="hidden xl:block xl:col-span-4">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad
                vero est maxime aliquid natus at harum aut assumenda mollitia
                rem eligendi, animi praesentium perferendis iste consequuntur
                magni dignissimos eaque consectetur!
              </div>
            </div>
            {/* MV - Artist */}
            <div>
              {artists &&
                artists.map((a, index) => (
                  <div className="mt-4" key={index}>
                    <h4>MV của {a.name}</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {a.sections &&
                        a.sections.map((sc) => {
                          return (
                            sc.sectionType === "video" &&
                            sc.items.map((item, index) => {
                              return <MVItem key={index} data={item} />;
                            })
                          );
                        })}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Video;
