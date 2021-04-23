import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Img, InputForm, Select } from "./styles";
import { makeStyles } from "@material-ui/core/styles";

import Store from "@material-ui/icons/Store";

import CardAvatar from "components/Card/CardAvatar.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import logo from "../../assets/img/user.png";

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
    if (text) {
      const newData = data.filter(function (item) {
        const itemData = item.cpf ? item.cpf.toUpperCase() : "".toUpperCase();
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
