import React from 'react';

import { Img } from './styles';
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
import logo from '../../assets/img/logo.png';

const useStyles = makeStyles(styles);

function ButcheryCard({
    data
}) {
  const classes = useStyles();

  console.log(data)
  return (
    <div>
      <GridContainer>
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
        </GridContainer>
      </div>
  );
}

export default ButcheryCard;