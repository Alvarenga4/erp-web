import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Img, InputForm, Select } from "./styles";
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
import logo from "../../assets/img/logo.png";

const useStyles = makeStyles(styles);

function ClientsCard({ data }) {
  const classes = useStyles();
  const [search, setSearch] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [operation, setOperation] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [filterDataSource, setFilteredDataSource] = React.useState([]);

  const dispatch = useDispatch();
  const selectedclient = useSelector((state) => state.data);

  React.useEffect(() => {
    (() => {
      data ? setLoading(false) : setLoading(true);
    })();
  }, []);

  const searchFilterFunction = (text) => {
    console.log(text);
    // Check if searched text is not blank
    if (text) {
      const newData = data.filter(function (item) {
        const itemData = item.cpf ? item.cpf.toUpperCase() : "".toUpperCase();
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

  const handleForm = async (id) => {
    try {
      dispatch({ type: "ADD_client_ID", id: id });
      console.log('Anterior: ', selectedclient)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <GridContainer>
        <GridItem
          xs={12}
        >
          <label for="searchclient">
            Pesquise informando o CPF do cliente
          </label>

          <InputForm
            id="searchclient"
            placeholder="Busque pelo CPF"
            id="material"
            value={search}
            onChange={(e) => searchFilterFunction(e.target.value)}
          />
        </GridItem>
        {status === "Approved" && (
          <GridItem xs={12} sm={4} md={4}>
            <label for="searchOperation">Buscar por operação</label>
            <Select
              onChange={(e) => setOperation(e.target.value)}
              type="select"
              name="select"
              id="searchOperation"
            >
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
                  {data.map((client) => (
                    <GridItem xs={12} sm={6} md={6}>
                      <Card>
                        <CardHeader
                          color={"success"}
                          stats
                          icon
                        >
                          <CardIcon
                            color={"success"}
                          >
                            <CardAvatar profile>
                              <a href="#" onClick={(e) => e.preventDefault()}>
                                <Img
                                  src={client.logo ? client.logo.url : logo}
                                  alt="..."
                                />
                              </a>
                            </CardAvatar>
                          </CardIcon>
                          <h3 className={classes.cardTitle}>
                            <strong>Responsável: </strong>
                            {client.name &&
                              client.name.length > 25
                              ? client.name.substring(0, 25) + "..."
                              : client.name}
                            <br />
                            <strong>CPF: </strong>
                            {client.cpf} <br />
                            <strong>Estado: </strong>
                            {client.address.uf ? client.address.uf : 'Não Informado'} <br />
                            <strong>Cidade: </strong>
                            {client.address.city} <br />
                          </h3>
                        </CardHeader>
                        <CardFooter stats>
                          <div className={classes.stats}>
                            <Store />
                            <b>
                              Telefone {client.cellphone}
                            </b>
                          </div>
                        </CardFooter>
                      </Card>
                    </GridItem>
                  ))}
                </>
              ) : (
                  <>
                    {filterDataSource.map((client) => (
                      <GridItem xs={12} sm={6} md={6}>
                        <Card>
                          <CardHeader
                            color={"success"}
                            stats
                            icon
                          >
                            <CardIcon
                              color={"success"}
                            >
                              <CardAvatar profile>
                                <a href="#" onClick={(e) => e.preventDefault()}>
                                  <Img
                                    src={client.logo ? client.logo.url : logo}
                                    alt="..."
                                  />
                                </a>
                              </CardAvatar>
                            </CardIcon>
                            <h3 className={classes.cardTitle}>
                              <strong>Responsável: </strong>
                              {client.name &&
                                client.name.length > 25
                                ? client.name.substring(0, 25) + "..."
                                : client.name}
                              <br />
                              <strong>CPF: </strong>
                              {client.cpf} <br />
                              <strong>Estado: </strong>
                              {client.address.uf ? client.address.uf : 'Não Informado'} <br />
                              <strong>Cidade: </strong>
                              {client.address.city} <br />
                            </h3>
                          </CardHeader>
                          <CardFooter stats>
                            <div className={classes.stats}>
                              <Store />
                              <b>
                                Telefone {client.cellphone}
                              </b>
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

export default ClientsCard;
