import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Button from "components/CustomButtons/Button.js";
import ClientsCard from "../../components/ClientsCard";
import ClitentModal from '../../components/ClientModal';


import {
  TextButton
} from './styles';

import api from "../../services/api";
import store from "./store";
import { getIdCompany } from '../../services/auth';

function Customers() {
  const classes = useStyles();
  const [clients, setClients] = useState([]);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    getClientsData();
  }, []);
  
  const getClientsData = async () => {
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
  }


  function closeModal() {
    setModal(false)
    getClientsData();
  }

  return (
    <>
      <Provider store={store}>
        <Button>
          <TextButton onClick={() => setModal(true)}>
            Adicionar Cliente
          </TextButton>
        </Button>
        <ClientsCard data={clients} />
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={modal}
        onClose={closeModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <ClitentModal modal={modal} />
      </Modal>
      </Provider>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default Customers;
