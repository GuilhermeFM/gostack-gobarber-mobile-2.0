import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

interface ISignInCrendentials {
  email: string;
  password: string;
}

interface IAuthState {
  user: object;
  token: string;
}

interface IAuthContext {
  user: object;
  loading: boolean;
  signIn(crendentials: ISignInCrendentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export const AuthProvider: React.FC = ({ children }) => {
  const [authState, setAuthState] = useState<IAuthState>({} as IAuthState);
  const [loading, setLoading] = useState(true);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', { email, password });

    const { token, user } = response.data;

    await AsyncStorage.multiSet([
      ['@Gobarber:token', token],
      ['@Gobarber:user', JSON.stringify(user)],
    ]);

    setAuthState({ user, token });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@Gobarber:user', '@Gobarber:token']);
    setAuthState({} as IAuthState);
  }, []);

  useEffect(() => {
    const loadStorageData = async (): Promise<void> => {
      const [user, token] = await AsyncStorage.multiGet([
        '@Gobarber:user',
        '@Gobarber:token',
      ]);

      if (token[1] && user[1]) {
        setAuthState({ user: JSON.parse(user[1]), token: token[1] });
      }

      setLoading(false);
    };

    loadStorageData();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: authState.user, loading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
