import React from 'react';

import { InputForm, Select } from './styles';

import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";

import Store from "@material-ui/icons/Store";

import CardAvatar from "components/Card/CardAvatar.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

function DeliverymanCard({
    data
}) {
  const classes = useStyles();
  const [search, setSearch] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [operation, setOperation] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [filterDataSource, setFilteredDataSource] = React.useState([]);

  React.useEffect(() => {
    (() => {
      data ? setLoading(false) : setLoading(true);
    })()
  }, []);

  const searchFilterFunction = (text) => {
    console.log(text)
    if (text) {

      const newData = data.filter(
        function (item) {
          const itemData = item.cpf
            ? item.cpf.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(data);
      setSearch(text);
    }
  };

  const handleForm = async () => {
    try {
      alert('Se fudeu')
    } catch (err) {
      console.log(err)
    }
  }
  
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={status === 'Approved' ? 4 : 8} md={status === 'Approved' ? 4 : 8}>
          <label for="searchButchery">Pesquise informando o CNPJ do açougue</label>
          <InputForm
            id="searchButchery"
            placeholder="Busque pelo CPF"
            id="material"
            value={search}
            onChange={(e) => searchFilterFunction(e.target.value)}
          />
        </GridItem>
        <GridItem xs={12} sm={4} md={4}>
          <label for="searchStatus">Buscar por status</label>
          <Select onChange={e => setStatus(e.target.value)} type="select" name="select" id="searchStatus">
            <option value="All">Todos</option>
            <option value="Review">Em analíse</option>
            <option value="Approved">Aprovados</option>
            <option value="Disapproved">Reprovados</option>
          </Select>
        </GridItem>
        {status === 'Approved' && (
          <GridItem xs={12} sm={4} md={4}>
            <label for="searchConnection">Buscar por conectividade</label>
            <Select onChange={e => setOperation(e.target.value)} type="select" name="select" id="searchConnection">
              <option value="all">Todos</option>
              <option value="Connected">Conectado</option>
              <option value="Disconnected">Desconectado</option>
            </Select>
          </GridItem>
        )}
      </GridContainer>
      <br /> <br />
      <GridContainer>
          {filterDataSource.length === 0 ? (
            <>
              {data.map(deliveryman => (
                <GridItem xs={12} sm={6} md={6}>
                  <Card>
                    <CardHeader color={`${deliveryman.connection === 'Connected' ? 'success' : 'danger'}`} stats icon>
                      <CardIcon color={`${deliveryman.connection === 'Connected' ? 'success' : 'danger'}`}>
                        <CardAvatar profile>
                          <a href="#img" onClick={e => e.preventDefault()}>
                            <img src={deliveryman.photo_url} alt="..." />
                          </a>
                        </CardAvatar>
                      </CardIcon>
                        <p className={classes.cardCategory}> {deliveryman.operation === 'Delivering' ? 'Disponível para entregas' : 'Não disponível para entregas' } </p>
                        <h3 className={classes.cardTitle}>
                          <strong>Nome: </strong>{deliveryman.name} <br />
                          <strong>CPF: </strong>{deliveryman.cpf} <br />
                          <strong>Estado: </strong>{deliveryman.state} <br />
                          <strong>Cidade: </strong>{deliveryman.city} <br />
                          <strong>Tipo: </strong>Moto <br />
                        </h3>
                        <GridContainer>
                          <GridItem xs={12} sm={6} md={6}>
                            <Button type="button" color="info" onClick={handleForm}>Visualiar Dados</Button>
                          </GridItem>
                          <GridItem xs={12} sm={6} md={6}>
                            <Button type="button" color="warning" onClick={handleForm}>Desabilitar Entregador</Button>
                          </GridItem>
                        </GridContainer>
                      </CardHeader>
                      <CardFooter stats>
                        <div className={classes.stats}>
                          <Store />
                          <b>{deliveryman.connection === 'Connected' ? 'Entregador online' : 'Entregador offline'}</b>
                        </div>
                      </CardFooter>
                  </Card>
                </GridItem>
              ))}
            </>
          ) : (
            <>
              {filterDataSource.map(deliveryman => (
                <GridItem xs={12} sm={6} md={6}>
                  <Card>
                    <CardHeader color={`${deliveryman.connection === 'Connected' ? 'success' : 'danger'}`} stats icon>
                      <CardIcon color={`${deliveryman.connection === 'Connected' ? 'success' : 'danger'}`}>
                        <CardAvatar profile>
                          <a href="#img" onClick={e => e.preventDefault()}>
                            <img src={deliveryman.photo_url} alt="..." />
                          </a>
                        </CardAvatar>
                      </CardIcon>
                        <p className={classes.cardCategory}> {deliveryman.operation === 'Delivering' ? 'Disponível para entregas' : 'Não disponível para entregas' } </p>
                        <h3 className={classes.cardTitle}>
                          <strong>Nome: </strong>{deliveryman.name} <br />
                          <strong>CPF: </strong>{deliveryman.cpf} <br />
                          <strong>Estado: </strong>{deliveryman.state} <br />
                          <strong>Cidade: </strong>{deliveryman.city} <br />
                          <strong>Tipo: </strong>Moto <br />
                        </h3>
                        <GridContainer>
                          <GridItem xs={12} sm={6} md={6}>
                            <Button type="button" color="info" onClick={handleForm}>Visualiar Dados</Button>
                          </GridItem>
                          <GridItem xs={12} sm={6} md={6}>
                            <Button type="button" color="warning" onClick={handleForm}>Desabilitar Entregador</Button>
                          </GridItem>
                        </GridContainer>
                      </CardHeader>
                      <CardFooter stats>
                        <div className={classes.stats}>
                          <Store />
                          <b>{deliveryman.connection === 'Connected' ? 'Entregador online' : 'Entregador offline'}</b>
                        </div>
                      </CardFooter>
                  </Card>
                </GridItem>
              ))}
            </>
          )}

        </GridContainer>
      </div>
  );
}

export default DeliverymanCard;