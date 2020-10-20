import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

import Store from "@material-ui/icons/Store";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import Accessibility from "@material-ui/icons/Accessibility";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Graphics({
  butchery,
  deliveryman,
  registerButcheryCity,
  registerDeliverymanCity
}) {
  const classes = useStyles();
  return (
    <div>
      <p>Relação de Cadastro  - Açougues</p>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Icon>check</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Açougues aprovados</p>
              <h3 className={classes.cardTitle}>
                {butchery?.totalApprovedButchery ? butchery?.totalApprovedButchery : 0} <small>açougues</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Store />
                  Total de açougues aprovados
              </div>
            </CardFooter>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>warning</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Açougues Pendentes</p>
              <h3 className={classes.cardTitle}>{butchery?.totalReplyButchery ? butchery?.totalReplyButchery : 0}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Store />
                  Total de Açougues pendentes
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="primary" stats icon>
              <CardIcon color="primary">
                <Icon>info_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Aguardando Aprovação Bifeon</p>
              <h3 className={classes.cardTitle}> {butchery?.totalPendingButchery ? butchery?.totalPendingButchery : 0} </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                Açougues agurdando aprovação a Bifeon
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Total de Açougues Cadastrados</p>
              <h3 className={classes.cardTitle}> {butchery?.allButcheries ? butchery?.allButcheries : 0} </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Total de Açougues Cadastrados
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>


      <p>Relação de Cadastro  - Entregadores</p>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Icon>check</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Entregadores aprovados</p>
              <h3 className={classes.cardTitle}>
                {deliveryman?.totalApprovedDeliveryman ? deliveryman?.totalApprovedDeliveryman : 0} <small>entregadores</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Store />
                  Total de entregadores aprovados
              </div>
            </CardFooter>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>warning</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Entregadores Pendentes</p>
              <h3 className={classes.cardTitle}> {deliveryman?.totalReviewDeliveryman ? deliveryman?.totalReviewDeliveryman : 0} </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Store />
                  Total de entregadores pendentes
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>warning</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Entregadores Reprovados</p>
              <h3 className={classes.cardTitle}> {deliveryman?.totalDisapprovedDeliveryman ? deliveryman?.totalDisapprovedDeliveryman : 0} </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                Entregadores reprovados
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Total de Entregadores Cadastrados</p>
              <h3 className={classes.cardTitle}> {deliveryman?.allDeliveyrmans ? deliveryman?.allDeliveyrmans : 0} </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Total de entregadores Cadastrados
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>

      <GridContainer>
        <GridItem xs={6} sm={12} md={6}>
          <Card>
            <CardHeader color="danger">
              <h4 className={classes.cardTitleWhite}>Cidades por Açougue</h4>
              <p className={classes.cardCategoryWhite}>
              Cidades cadastradas (Açougues)
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["Cidades"]}
                tableData={[
                  registerButcheryCity
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
     
        <GridItem xs={6} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Cidades por Entregadores</h4>
              <p className={classes.cardCategoryWhite}>
                Cidades cadastradas (Entregador)
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["Cidades"]}
                tableData={[
                  registerDeliverymanCity
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      
    </div>
  );
}
