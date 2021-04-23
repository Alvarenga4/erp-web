import React from "react";

import {
  Row,
  Col
} from 'reactstrap'
import Lottie from 'react-lottie';
import Button from "components/CustomButtons/Button.js";
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';

import { InputForm, TextButton, TextSucess } from './styles';

import loadingAnimation from '../../assets/lottie/loading_hand.json'
import successAnimation from '../../assets/lottie/success.json'
import {getIdCompany} from '../../services/auth';
import api from "../../services/api";

function ClientModal({ modal }) {
  const classes = useStyles();
  const [name, setName] = React.useState("");
  const [last_name, setLastName] = React.useState("");
  const [rg, setRG] = React.useState("");
  const [cpf, setCPF] = React.useState("");
  const [cellphone, setCellphone] = React.useState("");
  const [tellphone, setTellphone] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const loadingOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation ,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  const successOption = {
    loop: false,
    autoplay: true,
    animationData: successAnimation ,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const createNewCustomer = async () => {
    try {
      setLoading(true);
      const data = {
        name,
        last_name,
        rg,
        cpf,
        cellphone,
        tellphone,
        address_id: 1,
        master_company_id: await getIdCompany()
      }

      const response = await api.post('/clients', data);

      if (response.data) {
        setSuccess(true);
        setTimeout(() =>
          setLoading(false),
         3000)
         setTimeout(() =>
          setSuccess(false),
         3000)
      }
    } catch(err) {
      setLoading(false);
      console.log(err);
    }
  }

  return (
    <Fade in={modal}>
      {!loading && !success? (
        
        <div className={classes.paper}>
          <h2 id="transition-modal-title">Adicionar novo cliente</h2>
          <Row>
            <Col xs='6'>
              <InputForm
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
            <Col xs='6'>
              <InputForm
                placeholder="Sobre Nome"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Col>
          </Row>
          <label id="transition-modal-title">Documentos pessoais</label>
          <Row>
            <Col xs='6'>
              <InputForm
                placeholder="RG"
                value={rg}
                onChange={(e) => setRG(e.target.value)}
              />
            </Col>
            <Col xs='6'>
              <InputForm
                mask='999.999.999-99'
                placeholder="CPF"
                value={cpf}
                onChange={(e) => setCPF(e.target.value)}
              />
            </Col>
          </Row>
          <label id="transition-modal-title">Contato</label>
          <Row>
            <Col xs='6'>
              <InputForm
                mask='(99) 9 9999-9999'
                placeholder="Celular"
                value={cellphone}
                onChange={(e) => setCellphone(e.target.value)}
              />
            </Col>
            <Col xs='6'>
              <InputForm
                mask='(99) 9999-9999'
                placeholder="Telefone Fixo"
                value={tellphone}
                onChange={(e) => setTellphone(e.target.value)}
              />
            </Col>
          </Row>
          <Button onClick={createNewCustomer} color="success" size="lg">
            <TextButton>Cadastrar Cliente</TextButton>
          </Button>
        </div>
      ) : (
        <>
        {loading && !success ? (
          <Lottie 
            options={loadingOptions}
            height={400}
            width={400}
          />
        ) : (
          <>
          <div>
            <Lottie 
              options={successOption}
              height={400}
              width={400}
            />
            <TextSucess>Cliente cadastrado com sucesso</TextSucess>
          </div>
          </>
        )}
        </>
      )}
    </Fade>
  )
}

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    borderRadius: 4,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default ClientModal;
