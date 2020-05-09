import React, { useRef, useCallback } from 'react';
import { Image, ScrollView, Dimensions } from 'react-native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import Button from '../../components/Button';
import Input from '../../components/Input';
import logo from '../../assets/logo.png';

import { Container, Title, BackToSignIn, BackToSignInText } from './styles';

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);

  const submitHandle = useCallback((data: object) => {
    console.log(data);
  }, []);

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ height: Dimensions.get('window').height - 24 }}
    >
      <Container>
        <Form ref={formRef} onSubmit={submitHandle}>
          <Image source={logo} />

          <Title>Crie sua conta</Title>

          <Input name="email" icon="mail" placeholder="E-mail" />
          <Input name="name" icon="user" placeholder="Nome" />
          <Input name="password" icon="lock" placeholder="Senha" />

          <Button onPress={() => formRef.current?.submitForm()}>Entrar</Button>
        </Form>
      </Container>
      <BackToSignIn onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color="#fff" />
        <BackToSignInText>Voltar</BackToSignInText>
      </BackToSignIn>
    </ScrollView>
  );
};

export default SignUp;
