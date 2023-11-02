import React, { memo, useEffect, useState } from "react";

import { httpRequest } from "../../axios/axios-custom";

import Loading from "../../Component/Loading/Loading";
import PlayListItem from "../../Component/PlayLists/PlayListItem";
import AlbumItem from "../../Component/Albums/AlbumItem";
import RadioItem from "../../Component/Radio/RadioItem";
import NewReleaseChartItem from "../../Component/TopChart/NewReleaseChartItem";
import TopChartItem from "../../Component/TopChart/TopChartItem";

import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const tabs = [
  {
    id: 1,
    title: "Tất cả",
    value: "all",
  },
  {
    id: 2,
    title: "Việt Nam",
    value: "vPop",
  },
  {
    id: 3,
    title: "Quốc tế",
    value: "others",
  },
];

function Home() {
  const [tab, setTab] = useState("all");
  const [datas, setData] = useState([]);

  useEffect(() => {
    httpRequest.get("/home").then(({ data }) => {
      setData(data.data.items);
    });
  }, []);

  if (Object.keys(datas).length <= 0) return <Loading />;

  return (
    <>
      {datas.length > 0 &&
        datas.map((dt, index) => (
          <div key={index} className="mb-4">
            {dt?.title && dt?.items && <h4 className="mb-3">{dt?.title}</h4>}
            {/* Banner */}
            {dt?.sectionType === "banner" && (
              <>
                <Swiper spaceBetween={30} slidesPerView={3}>
                  {dt.items.map((item, index) => (
                    <SwiperSlide
                      key={index}
                      className="rounded-lg w-[266px] overflow-hidden"
                      navigation="true"
                    >
                      <img
                        className="w-full h-full object-cover"
                        src={item.banner}
                        alt=""
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </>
            )}
            {/* Mới phát hành */}
            {dt?.sectionType === "new-release" && (
              <div>
                <div className="flex gap-3 mb-2">
                  {tabs &&
                    tabs.map((item) => (
                      <button
                        key={item.id}
                        className={`text-[var(--text-primary)] text-[13px] rounded-full px-3 py-1 ${
                          item.value === tab ? "bg-[var(--purple-primary)]" : ""
                        }`}
                        onClick={() => setTab(item.value)}
                      >
                        {item.title}
                      </button>
                    ))}
                </div>
                <div className="hidden md:grid md:grid-cols-2 lg:grid-col-3 ">
                  {dt.items &&
                    dt.items[tab].slice(0, 12).map((item, index) => {
                      return (
                        <div key={index}>
                          <PlayListItem
                            isVip={item?.streamingStatus === 2 ? true : false}
                            data={item}
                            isAlbum={false}
                          />
                        </div>
                      );
                    })}
                </div>
                <div className="grid md:hidden md:grid-cols-2 lg:grid-col-3 ">
                  {dt.items &&
                    dt.items[tab].slice(0, 4).map((item, index) => (
                      <div key={index}>
                        <PlayListItem
                          isVip={item?.streamingStatus === 2 ? true : false}
                          data={item}
                        />
                      </div>
                    ))}
                </div>
              </div>
            )}
            {/* Play list */}
            {dt?.sectionType === "playlist" && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {dt.items &&
                  dt.items.slice(0, 5).map((item, index) => (
                    <div key={index}>
                      <AlbumItem data={item} />
                    </div>
                  ))}
              </div>
            )}
            {/* BXH  */}
            {dt?.sectionType === "newReleaseChart" && (
              <Swiper spaceBetween={30} slidesPerView={4}>
                {dt.items &&
                  dt.items.map((item, index) => (
                    <SwiperSlide
                      key={index}
                      className="rounded-lg w-[266px] overflow-hidden"
                      navigation="true"
                    >
                      <NewReleaseChartItem data={item} index={index + 1} />
                    </SwiperSlide>
                  ))}
              </Swiper>
            )}
            {/* Chart  */}
            {dt?.sectionType === "RTChart" && (
              <div className="py-4 rounded-lg">
                <div className="flex">
                  <a className="text-[28px] font-bold text-gradient" href="/">
                    #zingchart
                  </a>
                </div>
                <div className="flex gap-3 flex-col lg:flex-row">
                  <div className="w-full lg:w-[40%]">
                    {dt.items.slice(0, 3).map((item, index) => (
                      <TopChartItem
                        hasBackground
                        key={index}
                        data={item}
                        index={index + 1}
                      />
                    ))}
                  </div>
                  <div className="w-full lg:w-[60%]">
                    <Line
                      options={{
                        responsive: true,
                        hover: {
                          mode: "index",
                          intersec: false,
                        },
                      }}
                      updateMode="resize"
                      data={{
                        labels:
                          dt.chart.times &&
                          dt.chart.times.map((t) => t.hour + ":00"),
                        datasets:
                          dt.items &&
                          dt.items.slice(0, 3).map((item) => {
                            return {
                              label: item.title,
                              data: dt.chart.items[item.encodeId].map(
                                (item) => item.counter
                              ),
                            };
                          }),
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
            {/* Banner */}
            {dt?.sectionType === "weekChart" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {dt.items &&
                  dt.items.map((item, index) => (
                    <div key={index} className="h-[107px]">
                      <img
                        className="w-full h-full object-cover"
                        src={item.banner}
                        alt={item.country}
                      />
                    </div>
                  ))}
              </div>
            )}
            {/* Radio */}
            {dt?.sectionType === "livestream" && (
              <Swiper spaceBetween={30} slidesPerView={7}>
                {dt.items &&
                  dt.items.map((item, index) => (
                    <SwiperSlide
                      key={index}
                      className="rounded-lg w-[266px] overflow-hidden"
                      navigation="true"
                    >
                      <RadioItem data={item} />
                    </SwiperSlide>
                  ))}
              </Swiper>
            )}
          </div>
        ))}
    </>
  );
}

export default memo(Home);
