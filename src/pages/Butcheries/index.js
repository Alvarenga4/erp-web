import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";

import ButcheryCard from "../../components/ButcheryCard";

import api from "../../services/api";
import store from "./store";

function Butcheries() {
  const [butcheries, setButcheries] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get("admin/butchery");
        setButcheries(response.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return (
    <>
      <Provider store={store}>
        <ButcheryCard data={butcheries} />
      </Provider>
    </>
  );
}

export default Butcheries;
