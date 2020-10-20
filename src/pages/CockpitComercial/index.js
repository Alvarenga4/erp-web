import React from 'react';
import Graphics from '../../components/Graphics';

import api from '../../services/api';

function CockpitComercial() {
  const [butcheries, setButchery] = React.useState({});
  const [deliverymans, setDeliveryman] = React.useState({});
  const [registerButcheryCities, setRegisterButcheryCity] = React.useState([]);
  const [registerDeliverymanCities, setRegisterDeliverymanCity] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const response = await api.get('/admin/totalregisters');

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
        deliveryman={deliverymans} 
        registerButcheryCity={registerButcheryCities} 
        registerDeliverymanCity={registerDeliverymanCities}
      />

    </>
  );
}

export default CockpitComercial;
