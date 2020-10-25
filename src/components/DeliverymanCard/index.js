import React from 'react';

import ChartistGraph from "react-chartist";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

import Store from "@material-ui/icons/Store";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import Accessibility from "@material-ui/icons/Accessibility";
import AccessTime from "@material-ui/icons/AccessTime";

import CardAvatar from "components/Card/CardAvatar.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import avatar from "assets/img/faces/marc.jpg";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

function DeliverymanCard({
    data
}) {
  const classes = useStyles();

  console.log(data)
  return (
    <div>
      <GridContainer>
        {data.map(deliveryman => (
          <GridItem xs={12} sm={6} md={6}>
            <Card>
              <CardHeader color={`${deliveryman.connection === 'Connected' ? 'success' : 'danger'}`} stats icon>
                <CardIcon color={`${deliveryman.connection === 'Connected' ? 'success' : 'danger'}`}>
                  <CardAvatar profile>
                    <a href="#" onClick={e => e.preventDefault()}>
                      <img src={deliveryman.photo_url} alt="..." />
                    </a>
                  </CardAvatar>
                </CardIcon>
                  <p className={classes.cardCategory}> {deliveryman.operation === 'Delivering' ? 'Disponível para entregas' : 'Não disponível para entregas' } </p>
                  <h3 className={classes.cardTitle}>
                    <strong>Nome: </strong>{deliveryman.name} <br />
                    <strong> CPF: </strong>{deliveryman.cpf} <br />
                    <strong>Estado: </strong>{deliveryman.state} <br />
                    <strong>Cidade: </strong>{deliveryman.city} <br />
                    <strong>Tipo: </strong>Moto <br />
                  </h3>
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
        </GridContainer>
      </div>
  );
}

export default DeliverymanCard;