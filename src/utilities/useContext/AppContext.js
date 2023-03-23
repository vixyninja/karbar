import {createContext, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
export const AppContext = createContext();

export const AppContextProvider = props => {
  const {children} = props;

  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isReload, setIsReload] = useState(false);
  return (
    <AppContext.Provider
      value={{
        isLogin,
        setIsLogin,
        user,
        setUser,
        isLoading,
        setIsLoading,
        isReload,
        setIsReload,
      }}>
      {children}
    </AppContext.Provider>
  );
};
