import React, { useRef, useCallback } from 'react';
import { Image, ScrollView, Dimensions, TextInput } from 'react-native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import Button from '../../components/Button';
import Input from '../../components/Input';
import logo from '../../assets/logo.png';

import validate from '../../validations/SignIn';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText,
} from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const inputPasswordRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  const { signIn } = useAuth();

  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      const errors = await validate(data);

      if (errors) {
        formRef.current?.setErrors(errors);
      } else {
        await signIn({
          email: data.email,
          password: data.password,
        });
      }
    },
    [signIn],
  );

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ height: Dimensions.get('window').height - 24 }}
    >
      <Container>
        <Image source={logo} />

        <Title>Faça seu logon</Title>

        <Form ref={formRef} onSubmit={handleSignIn}>
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
