import React from 'react';
import { Image } from 'react-native';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Title } from './styles';
import logo from '../../assets/logo.png';

const SignIn: React.FC = () => (
  <Container>
    <Image source={logo} />
    <Title>Faça seu logon</Title>

    <Input name="email" icon="mail" placeholder="E-mail" />
    <Input name="password" icon="lock" placeholder="Senha" />

    <Button onPress={() => {}}>Entrar</Button>
  </Container>
);

export default SignIn;
