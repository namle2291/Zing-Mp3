import React, { useEffect, useState } from "react";
import { httpRequest } from "../../axios/axios-custom";
import TopChartItem from "../../Component/TopChart/TopChartItem";
import { Line } from "react-chartjs-2";
import Loading from "../../Component/Loading/Loading";
import Album from "../Album/Album";
import AlbumList from "../../Component/Albums/AlbumList";
import AlbumListChartItem from "../../Component/Albums/AlbumListChartItem";
import { useSelector } from "react-redux";

function ZingChart() {
  const [loading, setLoading] = useState(false);
  const [rtChart, setRTChart] = useState({});

  const { currentSongId } = useSelector((state) => state.playNow);

  useEffect(() => {
    setLoading(true);
    httpRequest.get("/charthome").then(({ data }) => {
      const { RTChart } = data.data;
      setRTChart(RTChart);
      setLoading(false);
      console.log(data);
    });
  }, []);

  if (loading) return <Loading />;

  return (
    <div>
      {rtChart && rtChart.sectionType === "RTChart" && (
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
                  <AlbumListChartItem active={dt.encodeId === currentSongId} key={index} item={dt} index={index + 1} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ZingChart;
