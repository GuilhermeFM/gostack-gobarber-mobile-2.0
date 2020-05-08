import React from 'react';
import { Image, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import Button from '../../components/Button';
import Input from '../../components/Input';

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText,
} from './styles';
import logo from '../../assets/logo.png';

const SignIn: React.FC = () => {
  const navigation = useNavigation();

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ height: Dimensions.get('window').height - 24 }}
    >
      <Container>
        <Image source={logo} />

        <Title>Faça seu logon</Title>

        <Input name="email" icon="mail" placeholder="E-mail" />
        <Input name="password" icon="lock" placeholder="Senha" />

        <Button onPress={() => {}}>Entrar</Button>

        <ForgotPassword>
          <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
        </ForgotPassword>
      </Container>
      <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
        <Icon name="log-in" size={20} color="#FF9000" />
        <CreateAccountButtonText>Criar conta</CreateAccountButtonText>
      </CreateAccountButton>
    </ScrollView>
  );
};

export default SignIn;
