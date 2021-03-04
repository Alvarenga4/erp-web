import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Container,
  FormContainer,
  InputLabel,
  InputForm,
  ButtonSignIn,
  TextButton,
  WelcomeLabel,
} from './styles';

import api from '../../services/api';
import { setToken, setIdCompany, getIdCompany, setIdUser } from '../../services/auth';


function SignIn() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [fantasy_name, setFantasyName] = useState('');
  const [showCnpj, setShowCnpj] = useState(true);
  const [showInputs, setShowInputs] = useState(false);

  const verifyCNPJ = async () => {

    try {
      const response = await api.get(`/mastercompany/`, {
        headers: {
          cnpj
        }
      });

      if (response.data.id) {
        setShowInputs(true);
        setShowCnpj(false);
        setFantasyName(response.data.company_fantasy_name);
        setIdCompany(response.data.id);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const authenticate = async () => {
    try {
      const companyId = await getIdCompany();
      console.log(companyId)
      const params = { email, password };
      const response = await api.post('/auth', params);
      const { token } = response.data;
      const { master_company_id } = response.data.user.employee;

      if (master_company_id === parseInt(companyId)) {
        setToken(token)
        history.push('/admin/comercial');
      } else {
        alert(`Usuário não pertence à ${fantasy_name}`)
      }

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Container>
      <FormContainer>
        <WelcomeLabel>Bem vindo</WelcomeLabel>
        <label>Entre com suas credenciais</label> <br />
        {showCnpj && (
          <>
            <InputLabel>CNPJ</InputLabel>
            <InputForm value={cnpj} onChange={(e) => setCnpj(e.target.value)} placeholder="CNPJ" type="text" />
            <ButtonSignIn onClick={verifyCNPJ} color="primary">
              <TextButton>
                Verificar
              </TextButton>
            </ButtonSignIn>
          </>
        )}
        {showInputs && (
          <>
            <h2>Bem vindo, {fantasy_name ? fantasy_name : ''}</h2>
            <InputLabel>Email</InputLabel>
            <InputForm value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" type="email" />
            <InputLabel>Senha</InputLabel>
            <InputForm placeholder="senha" value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
            <ButtonSignIn onClick={authenticate} color="primary">
              <TextButton>
                Acessar
              </TextButton>
            </ButtonSignIn>
          </>
        )}
      </FormContainer>
    </Container>
  );
}

export default SignIn;