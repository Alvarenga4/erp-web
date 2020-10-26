import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { 
    Container, 
    FormContainer,
    InputLabel, 
    InputForm, 
    ButtonSignIn, 
    TextButton, 
    ImageContainer, 
    Image 
} from './styles';

import api from '../../services/api';
import {setToken} from '../../services/auth';


function SignIn() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async () => {
        try {
            const data = { email, password };
            const response = await api.post(`/adminAuth/signIn`, data)
            console.log(response.data);
            setToken(response.data.token)
            history.push('/admin/comercial');
        } catch (err) {
            console.log(err);
        }
    }

  return (
      <Container>
          <FormContainer>
            <ImageContainer>
              <Image src={require('../../assets/img/logo.png')} />
            </ImageContainer>
            <InputLabel>Email</InputLabel>
            <InputForm value={email} onChange={(e) => setEmail(e.target.value)}placeholder="email" type="email" />
            <InputLabel>Senha</InputLabel>
            <InputForm placeholder="senha" value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
            <ButtonSignIn onClick={handleSignIn} color="primary">
                <TextButton>
                    Acessar
                </TextButton>
            </ButtonSignIn>
          </FormContainer>
      </Container>
  );
}

export default SignIn;