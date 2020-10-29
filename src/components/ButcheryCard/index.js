import React from 'react';

import { Img, InputForm, Select } from './styles';
import { makeStyles } from "@material-ui/core/styles";

import Store from "@material-ui/icons/Store";

import CardAvatar from "components/Card/CardAvatar.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";

import CustomInput from "components/CustomInput/CustomInput.js";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchOutlined from "@material-ui/icons/SearchOutlined";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import logo from '../../assets/img/logo.png';

const useStyles = makeStyles(styles);

function ButcheryCard({
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
    // Check if searched text is not blank
    if (text) {

      const newData = data.filter(
        function (item) {
          const itemData = item.cnpj
            ? item.cnpj.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
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
            placeholder="Busque pelo CNPJ"
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
            <option value="Reply">Aguarando assinatura açougue</option>
            <option value="Pending">Aguarando assinatura BifeOn</option>
            <option value="Approved">Aprovados</option>
          </Select>
        </GridItem>
        {status === 'Approved' && (
          <GridItem xs={12} sm={4} md={4}>
            <label for="searchOperation">Buscar por operação</label>
            <Select onChange={e => setOperation(e.target.value)} type="select" name="select" id="searchOperation">
              <option value="all">Todos</option>
              <option value="Opened">Aberto</option>
              <option value="Closed">Fechado</option>
            </Select>
          </GridItem>
        )}
      </GridContainer>
      <br /> <br />
      {loading ? (
        <label>Recolhendo informações...</label>
      ) : (
        <>
        <GridContainer>
          {filterDataSource.length === 0 ? (
            <>
              {data.map(butchery => (
                <GridItem xs={12} sm={6} md={6}>
                  <Card>
                    <CardHeader color={`${butchery.operation === 'Opened' ? 'success' : 'danger'}`} stats icon>
                      <CardIcon color={`${butchery.operation === 'Opened' ? 'success' : 'danger'}`}>
                        <CardAvatar profile>
                          <a href="#" onClick={e => e.preventDefault()}>
                            <Img src={butchery.logo ? butchery.logo.url : logo} alt="..." />
                          </a>
                        </CardAvatar>
                      </CardIcon>
                        <p className={classes.cardCategory}> {butchery.operation === 'Opened' ? 'Açougue aberto' : 'Açougue fechado' } </p>
                        <h3 className={classes.cardTitle}>
                          <strong>Responsável: </strong>
                              {butchery.responsible && butchery.responsible.length > 25
                                  ? butchery.responsible.substring(0, 25) + '...'
                                  : butchery.responsible}
                              <br />
                          <strong>CNPJ: </strong>{butchery.cnpj} <br />
                          <strong>Estado: </strong>{butchery.state} <br />
                          <strong>Cidade: </strong>{butchery.city} <br />
                        </h3>
                        <GridContainer>
                          <GridItem xs={12} sm={6} md={6}>
                            <Button type="button" color="info" onClick={handleForm}>Visualiar Dados</Button>
                          </GridItem>
                          <GridItem xs={12} sm={6} md={6}>
                            <Button type="button" color="warning" onClick={handleForm}>Desabilitar Açougue</Button>
                          </GridItem>
                        </GridContainer>
                      </CardHeader>
                      <CardFooter stats>
                        <div className={classes.stats}>
                          <Store />
                          <b>{butchery.operation === 'Opened' ? 'Açougue aberto' : 'Açougue fechado'}</b>
                        </div>
                      </CardFooter>
                  </Card>
                </GridItem>
              ))}
            </>
          ) : (
            <>
              {filterDataSource.map(butchery => (
                <GridItem xs={12} sm={6} md={6}>
                  <Card>
                    <CardHeader color={`${butchery.operation === 'Opened' ? 'success' : 'danger'}`} stats icon>
                      <CardIcon color={`${butchery.operation === 'Opened' ? 'success' : 'danger'}`}>
                        <CardAvatar profile>
                          <a href="#" onClick={e => e.preventDefault()}>
                            <Img src={butchery.logo ? butchery.logo.url : logo} alt="..." />
                          </a>
                        </CardAvatar>
                      </CardIcon>
                        <p className={classes.cardCategory}> {butchery.operation === 'Opened' ? 'Açougue aberto' : 'Açougue fechado' } </p>
                        <h3 className={classes.cardTitle}>
                          <strong>Responsável: </strong>
                              {butchery.responsible && butchery.responsible.length > 25
                                  ? butchery.responsible.substring(0, 25) + '...'
                                  : butchery.responsible}
                              <br />
                          <strong>CNPJ: </strong>{butchery.cnpj} <br />
                          <strong>Estado: </strong>{butchery.state} <br />
                          <strong>Cidade: </strong>{butchery.city} <br />
                        </h3>
                        <GridContainer>
                          <GridItem xs={12} sm={6} md={6}>
                            <Button type="button" color="info" onClick={handleForm}>Visualiar Dados</Button>
                          </GridItem>
                          <GridItem xs={12} sm={6} md={6}>
                            <Button type="button" color="warning" onClick={handleForm}>Desabilitar Açougue</Button>
                          </GridItem>
                        </GridContainer>
                      </CardHeader>
                      <CardFooter stats>
                        <div className={classes.stats}>
                          <Store />
                          <b>{butchery.operation === 'Opened' ? 'Açougue aberto' : 'Açougue fechado'}</b>
                        </div>
                      </CardFooter>
                  </Card>
                </GridItem>
              ))}
            </>
          )}
          </GridContainer>
        </>
      )}
      </div>
  );
}

export default ButcheryCard;