import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";

import ClientsCard from "../../components/ClientsCard";

import api from "../../services/api";
import store from "./store";
import { getIdCompany } from '../../services/auth';

function Butcheries() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const master_company_id = await getIdCompany();
        const response = await api.get("/clients", {
          headers: {
            master_company_id
          }
        });
        setClients(response.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return (
    <>
      <Provider store={store}>
        <ClientsCard data={clients} />
      </Provider>
    </>
  );
}

export default Butcheries;
