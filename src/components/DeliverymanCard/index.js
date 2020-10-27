import React from 'react';

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
        </GridContainer>
      </div>
  );
}

export default DeliverymanCard;