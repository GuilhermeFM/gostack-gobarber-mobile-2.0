import React, { useRef, useCallback } from 'react';
import { Image, ScrollView, TextInput, Dimensions } from 'react-native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import Button from '../../components/Button';
import Input from '../../components/Input';
import logo from '../../assets/logo.png';

import validate from '../../validations/SignUp';
import api from '../../services/api';

import { Container, Title, BackToSignIn, BackToSignInText } from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const inputNameRef = useRef<TextInput>(null);
  const inputPasswordRef = useRef<TextInput>(null);

  const submitHandle = useCallback(
    async (data: SignUpFormData) => {
      const errors = await validate(data);

      if (errors) {
        formRef.current?.setErrors(errors);
      } else {
        await api.post('users', {
          name: data.name,
          email: data.email,
          password: data.password,
        });

        navigation.goBack();
      }
    },
    [navigation],
  );

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ height: Dimensions.get('window').height - 24 }}
    >
      <Container>
        <Form ref={formRef} onSubmit={submitHandle}>
          <Image source={logo} />

          <Title>Crie sua conta</Title>

          <Input
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="email-address"
            name="email"
            icon="mail"
            placeholder="E-mail"
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => {
              inputNameRef.current?.focus();
            }}
          />

          <Input
            ref={inputNameRef}
            autoCorrect={false}
            name="name"
            icon="user"
            placeholder="Nome"
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => {
              inputPasswordRef.current?.focus();
            }}
          />

          <Input
            ref={inputPasswordRef}
            name="password"
            icon="lock"
            placeholder="Senha"
            secureTextEntry
            returnKeyType="send"
            onSubmitEditing={() => formRef.current?.submitForm()}
          />

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
