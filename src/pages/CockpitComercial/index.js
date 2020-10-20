import React from 'react';
import Graphics from '../../components/Graphics';

import axios from 'axios';

function CockpitComercial() {
  const [butcheries, setButchery] = React.useState({});
  const [delierymans, setDeliveryman] = React.useState({});
  const [registerButcheryCities, setRegisterButcheryCity] = React.useState([]);
  const [registerDeliverymanCities, setRegisterDeliverymanCity] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const response = await axios.get('/admin/totalregisters');

      const {butchery, deliveryman, registerButcheryCity, registerDeliverymanCity} = response.data;
      if (butchery || deliveryman || registerButcheryCity || registerDeliverymanCity) {
        setButchery(butchery);
        setDeliveryman(deliveryman);
        setRegisterButcheryCity(registerButcheryCity);
        setRegisterDeliverymanCity(registerDeliverymanCity);
      }
    })()
  }, []);

  return (
    <>
      <Graphics 
        butchery={butcheries} 
        delieryman={delierymans} 
        registerButcheryCity={registerButcheryCities} 
        registerDeliverymanCity={registerDeliverymanCities}
      />

    </>
  );
}

export default CockpitComercial;
