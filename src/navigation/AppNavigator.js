import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import ScanScreen from '../screens/ScanScreen';
import StatsScreen from '../screens/StatsScreen';
import ReceiptDetailScreen from '../screens/ReceiptDetailScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
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
          name="Stats" 
          component={StatsScreen}
          options={{ title: 'Statistics' }}
        />
        <Stack.Screen 
          name="ReceiptDetail" 
          component={ReceiptDetailScreen}
          options={{ title: 'Receipt Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
