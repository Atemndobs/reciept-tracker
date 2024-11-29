import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import HomeScreen from './src/screens/HomeScreen';
import ScanScreen from './src/screens/ScanScreen';
import StatisticsScreen from './src/screens/StatisticsScreen';
import ReceiptDetailScreen from './src/screens/ReceiptDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ title: 'Receipt Tracker' }}
          />
          <Stack.Screen 
            name="Scan" 
            component={ScanScreen}
            options={{ title: 'Scan Receipt' }}
          />
          <Stack.Screen 
            name="Statistics" 
            component={StatisticsScreen}
            options={{ title: 'Statistics' }}
          />
          <Stack.Screen 
            name="ReceiptDetail" 
            component={ReceiptDetailScreen}
            options={{ title: 'Receipt Details' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
