import axios from "axios";
import React, { useEffect, useState } from "react";
import { lsnAPI } from "../../axios/axios-custom";

function Mv() {
  const [data, setData] = useState({});
  useEffect(() => {
    axios.get(lsnAPI.getHubHome()).then(({ data }) => {
      console.log(data);
    });
  }, []);

  return <div>Mv</div>;
}

export default Mv;
