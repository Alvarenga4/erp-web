import styled from 'styled-components';
import { Button, Input, Form, FormGroup } from 'reactstrap'

export const Container = styled(Form)`
    display: flex;
    background-color: #000;
    background-size: cover;
    justify-content: flex-end;
    align-items: flex-start;
    height: 100vh;
    width: 100vw;
`;

export const FormContainer = styled(FormGroup)`
    width: 560px;
    height: 100%;
    padding: 40px;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 2);
`;

export const InputLabel = styled.label`
  font-size: 14px;
  color: #a8a8a8;
  margin-top: 20px;
`;

export const InputForm = styled(Input)`
    height: 55px;
    width: 100%;
    padding-left: 10px;
    margin-top: 10px;
    border: 1px solid #c8c8c8;
    border-radius: 10px;
`;

export const ButtonSignIn = styled(Button)`
    height: 55px;
    width: 100%;
    margin-top: 20px;
    background: #6B1718;
`;

export const TextButton = styled.p`
    color: #FFF;
    font-size: 18px;
    align-self: center;
`;

export const ImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Image = styled.img`
    width: 100px;
    height: 100px;
`;