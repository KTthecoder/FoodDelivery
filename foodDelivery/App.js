import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useContext, useEffect } from 'react';
import AuthProvider, { AuthContext } from './contexts/AuthProvider';
import Navigation from './navigations/Navigation';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Navigation/>
      </AuthProvider>
      <StatusBar style='auto' />
    </NavigationContainer>
  );
}

