import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../../Component/Loading/Loading";
import RadioItem from "../../Component/Radio/RadioItem";

import { lsnAPI } from "../../axios/axios-custom";
function Radio() {
  const [data, setData] = useState({});
  useEffect(() => {
    axios.get(lsnAPI.getRadioPage()).then(({ data }) => {
      setData(data.data);
    });
  }, []);

  if (Object.keys(data).length <= 0) return <Loading />;

  return (
    <div>
      {data.items.map((dt, index) => {
        return (
          <div
            key={index}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3"
          >
            {dt.sectionType === "livestream" &&
              dt.items.map((item, index) => {
                return <RadioItem key={index} data={item} />;
              })}
          </div>
        );
      })}
    </div>
  );
}

export default Radio;
