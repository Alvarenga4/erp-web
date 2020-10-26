import React, {useState, useEffect} from 'react';

import ButcheryCard from '../../components/ButcheryCard';

import api from '../../services/api';

function Butcheries() {
  const [butcheries, setButcheries] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get('admin/butchery');
        setButcheries(response.data)
      } catch (err) {
        console.log(err);
      }
    })()
  }, [])
  return (
    <>
      <ButcheryCard data={butcheries} />
    </>
  );
}

export default Butcheries;