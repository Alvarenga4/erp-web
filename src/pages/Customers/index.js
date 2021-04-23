import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";

import Button from "components/CustomButtons/Button.js";
import ClientsCard from "../../components/ClientsCard";

import {
  TextButton
} from './styles';

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
        <Button>
          <TextButton>
            Adicionar Cliente
          </TextButton>
        </Button>
        <ClientsCard data={clients} />
      </Provider>
    </>
  );
}

export default Butcheries;
