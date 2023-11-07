import React, { useEffect, useState } from "react";
import { httpRequest } from "../../axios/axios-custom";
import { Line } from "react-chartjs-2";
import Loading from "../../Component/Loading/Loading";
import AlbumListChartItem from "../../Component/Albums/AlbumListChartItem";
import { useSelector } from "react-redux";
import TopChartItem from "../../Component/TopChart/TopChartItem";

function ZingChart() {
  const [loading, setLoading] = useState(false);
  const [rtChart, setRTChart] = useState({});
  const [weekChart, setWeekChart] = useState({});

  const { currentSongId } = useSelector((state) => state.playNow);

  useEffect(() => {
    setLoading(true);
    httpRequest.get("/charthome").then(({ data }) => {
      const { RTChart, weekChart } = data.data;
      setRTChart(RTChart);
      setWeekChart(weekChart);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading />;

  return (
    <div>
      {rtChart && rtChart.sectionType === "RTChart" && (
        <>
          <div className="py-4 rounded-lg">
            <div className="flex">
              <a className="text-[28px] font-bold text-gradient" href="/">
                #zingchart
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <div className="w-full">
                <Line
                  height={300}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                  updateMode="resize"
                  data={{
                    labels:
                      rtChart.chart.times &&
                      rtChart.chart.times.map((t) => t.hour + ":00"),
                    datasets:
                      rtChart.items &&
                      rtChart.items.slice(0, 3).map((item) => {
                        return {
                          label: item.title,
                          data: rtChart.chart.items[item.encodeId].map(
                            (item) => item.counter
                          ),
                        };
                      }),
                  }}
                />
              </div>
              <div className="w-full">
                <ul className="list-none p-0 m-0">
                  {rtChart.items.slice(0, 10).map((dt, index) => (
                    <AlbumListChartItem
                      active={dt.encodeId === currentSongId}
                      key={index}
                      item={dt}
                      index={index + 1}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div>
            <h4>Bảng Xếp Hạng Tuần</h4>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              {weekChart && (
                <>
                  <div className="rounded-lg bg-[var(--alpha-bg)] p-2">
                    <h4 className="mx-3">Việt Nam</h4>
                    <div>
                      {weekChart["vn"] &&
                        weekChart["vn"].items.slice(0, 5).map((item, index) => {
                          return (
                            <TopChartItem
                              index={index + 1}
                              key={index}
                              data={item}
                            />
                          );
                        })}
                    </div>
                  </div>
                  <div className="rounded-lg bg-[var(--alpha-bg)] p-2">
                    <h4 className="mx-3">US-UK</h4>
                    <div>
                      {weekChart["us"] &&
                        weekChart["us"].items.slice(0, 5).map((item, index) => {
                          return (
                            <TopChartItem
                              isVip={item?.streamingStatus === 2 ? true : false}
                              index={index + 1}
                              key={index}
                              data={item}
                            />
                          );
                        })}
                    </div>
                  </div>
                  <div className="rounded-lg bg-[var(--alpha-bg)] p-2">
                    <h4 className="mx-3">Korea</h4>
                    <div>
                      {weekChart["korea"] &&
                        weekChart["korea"].items
                          .slice(0, 5)
                          .map((item, index) => {
                            return (
                              <TopChartItem
                                index={index + 1}
                                key={index}
                                data={item}
                              />
                            );
                          })}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ZingChart;
