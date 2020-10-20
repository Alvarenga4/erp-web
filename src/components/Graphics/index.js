import React from "react";

import ChartistGraph from "react-chartist";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

import Store from "@material-ui/icons/Store";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import Accessibility from "@material-ui/icons/Accessibility";
import AccessTime from "@material-ui/icons/AccessTime";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

import api from '../../services/api';
const useStyles = makeStyles(styles);

export default function Graphics({
  butchery,
  deliveryman,
  registerButcheryCity,
  registerDeliverymanCity
}) {
  const [totalButcheryBasicPlan, setTotalButcheryBasicPlan] = React.useState(0);
  const [totalButcheryIntermediatePlan, setTotalButcheryIntermediatePlan] = React.useState(0);
  const [totalButcheryAdvancedPlan, setTotalButcheryAdvancedPlan] = React.useState(0);

  const [allClients, setAllClients] = React.useState(0);
  const [incompletClients, setIncompletClients] = React.useState(0);
  const [totalMaleClients, setMaleClients] = React.useState(0);
  const [totalFameClients, setFameClients] = React.useState(0);
  const [totalOthersClients, setOthersClients] = React.useState(0);

  const [totalButcheryRating, setTotalButcheryRating] = React.useState(0);
  const [totalDeliverymanRating, setTotalDeliverymanRating] = React.useState(0);
  const [totalCustomerRating, setTotalCustomerRating] = React.useState(0);

  var delays = 80,
  durations = 500;
  var delays2 = 80,
    durations2 = 500;

  React.useEffect(() => {
    (async () => {
      const response = await api.get('/admin/totalregistersplans');
  
      const {butchery} = response.data;
      
      if (butchery) {
        setTotalButcheryBasicPlan(butchery.totalBasicPlans);
        setTotalButcheryIntermediatePlan(butchery.totalIntermediatePlans);
        setTotalButcheryAdvancedPlan(butchery.totalAdvancedPlans);
      }
    })()
  }, []);

  React.useEffect(() => {
    (async () => {
      const response = await api.get('/admin/totalusersregister');
  
      const {
        totalClients, 
        incompletClients, 
        totalMaleClients, 
        totalFameClients, 
        totalOthersClients
      } = response.data;
      
      setAllClients(totalClients);
      setIncompletClients(incompletClients);
      setMaleClients(totalMaleClients);
      setFameClients(totalFameClients);
      setOthersClients(totalOthersClients);
      
    })()
  }, []);

  React.useEffect(() => {
    (async () => {
      const response = await api.get('/admin/totalstars');
  
      const {
        totalButcheryRating, 
        totalDeliverymanRating, 
        totalCustomerRating, 
      } = response.data;
      
      setTotalButcheryRating(totalButcheryRating);
      setTotalDeliverymanRating(totalDeliverymanRating);
      setTotalCustomerRating(totalCustomerRating);
      
    })()
  }, []);

  const planBasicsSubscribes = {
    data: {
      labels: [
        `Basico (${totalButcheryBasicPlan})`,
        `Intermediario (${totalButcheryIntermediatePlan})`,
        `Avançado (${totalButcheryAdvancedPlan})`
      ],
      series: [[totalButcheryBasicPlan, totalButcheryIntermediatePlan, totalButcheryAdvancedPlan]]
    },
    options: {
      axisX: {
        showGrid: false
      },
      low: 0,
      high: 500,
      chartPadding: {
        top: 0,
        right: 5,
        bottom: 0,
        left: 0
      }
    },
    responsiveOptions: [
      [
        "screen and (max-width: 640px)",
        {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function(value) {
              return value[0];
            }
          }
        }
      ]
    ],
    animation: {
      draw: function(data) {
        if (data.type === "bar") {
          data.element.animate({
            opacity: {
              begin: (data.index + 1) * delays2,
              dur: durations2,
              from: 0,
              to: 1,
              easing: "ease"
            }
          });
        }
      }
    }
  };

  const clientRegisters = {
    data: {
      labels: [
        `Total de consumidores (${allClients})`,
        `Cadastros incompletos (${incompletClients})`,
        `Sexo masculino (${totalMaleClients})`,
        `Sexo feminino (${totalFameClients})`,
        `Sexo não informado (${totalOthersClients})`,
      ],
      series: [[allClients, incompletClients, totalMaleClients, totalFameClients, totalOthersClients]]
    },
    options: {
      axisX: {
        showGrid: false
      },
      low: 0,
      high: 500,
      chartPadding: {
        top: 0,
        right: 5,
        bottom: 0,
        left: 0
      }
    },
    responsiveOptions: [
      [
        "screen and (max-width: 640px)",
        {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function(value) {
              return value[0];
            }
          }
        }
      ]
    ],
    animation: {
      draw: function(data) {
        if (data.type === "bar") {
          data.element.animate({
            opacity: {
              begin: (data.index + 1) * delays2,
              dur: durations2,
              from: 0,
              to: 1,
              easing: "ease"
            }
          });
        }
      }
    }
  };

  const totalStarts = {
    data: {
      labels: [
        `Avaliações Açougues (${totalButcheryRating})`,
        `Avaliações Entregadores (${totalDeliverymanRating})`,
        `Avaliações Consumidores (${totalCustomerRating})`
      ],
      series: [[totalButcheryRating, totalDeliverymanRating, totalCustomerRating]]
    },
    options: {
      axisX: {
        showGrid: false
      },
      low: 0,
      high: 500,
      chartPadding: {
        top: 0,
        right: 5,
        bottom: 0,
        left: 0
      }
    },
    responsiveOptions: [
      [
        "screen and (max-width: 640px)",
        {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function(value) {
              return value[0];
            }
          }
        }
      ]
    ],
    animation: {
      draw: function(data) {
        if (data.type === "bar") {
          data.element.animate({
            opacity: {
              begin: (data.index + 1) * delays2,
              dur: durations2,
              from: 0,
              to: 1,
              easing: "ease"
            }
          });
        }
      }
    }
  };

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
      
      <p>Graficos - Visualização detalhada</p>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={planBasicsSubscribes.data}
                type="Bar"
                options={planBasicsSubscribes.options}
                responsiveOptions={planBasicsSubscribes.responsiveOptions}
                listener={planBasicsSubscribes.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Planos Contrados - Açougue</h4>
              <p className={classes.cardCategory}>Número de contratos por plano</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> Atualizado todos os dias
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="info">
              <ChartistGraph
                className="ct-chart"
                data={clientRegisters.data}
                type="Bar"
                options={clientRegisters.options}
                responsiveOptions={clientRegisters.responsiveOptions}
                listener={clientRegisters.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Relação de Consumidores Cadastrados</h4>
              <p className={classes.cardCategory}>relação de cadastros (consumidor)</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> Atualizado todos os dias
              </div>
            </CardFooter>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="primary">
              <ChartistGraph
                className="ct-chart"
                data={totalStarts.data}
                type="Bar"
                options={totalStarts.options}
                responsiveOptions={totalStarts.responsiveOptions}
                listener={totalStarts.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Total de avaliações</h4>
              <p className={classes.cardCategory}>Total de avaliações</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> Atualizado todos os dias
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
