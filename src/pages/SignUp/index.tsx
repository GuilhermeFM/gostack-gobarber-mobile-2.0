import React from 'react';
import { Image, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Title, BackToSignIn, BackToSignInText } from './styles';
import logo from '../../assets/logo.png';

const SignUp: React.FC = () => {
  const navigation = useNavigation();

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ height: Dimensions.get('window').height - 24 }}
    >
      <Container>
        <Image source={logo} />

        <Title>Crie sua conta</Title>

        <Input name="email" icon="mail" placeholder="E-mail" />
        <Input name="name" icon="user" placeholder="Nome" />
        <Input name="password" icon="lock" placeholder="Senha" />

        <Button onPress={() => {}}>Entrar</Button>
      </Container>
      <BackToSignIn onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color="#fff" />
        <BackToSignInText>Voltar</BackToSignInText>
      </BackToSignIn>
    </ScrollView>
  );
};

export default SignUp;
