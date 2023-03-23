import React from 'react'
import { AppContextProvider } from './src/utilities/useContext/AppContext';
import RootNavigator from './src/navigation/RootNavigator';
import { NavigationContainer } from '@react-navigation/native';
const App = () => {
  return (
    <AppContextProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AppContextProvider>
  )
}

export default App