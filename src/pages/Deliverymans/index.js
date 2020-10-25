import React, {useState, useEffect} from 'react';

import DeliverymansCard from '../../components/DeliverymanCard';

import api from '../../services/api';

function Deliverymans() {
  const [deliverymans, setDeliverymans] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get('admin/deliveryman');
        setDeliverymans(response.data)
      } catch (err) {
        console.log(err);
      }
    })()
  }, [])
  return (
    <>
      <DeliverymansCard data={deliverymans} />
    </>
  );
}

export default Deliverymans;