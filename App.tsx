import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';

import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/LoginScreen';
import Register from './screens/register';
import HomeScreen from './screens/home';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

export default function App() {

  const Stack = createStackNavigator<RootStackParamList>();

  function MyStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />

        <Stack.Screen name="Register" options={({ navigation }) => ({
          headerShown: true,
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: '#1b014d',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: '#fff',
          headerTitle: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{ fontSize: 18, color: '#fff' }}>Volver</Text>
            </TouchableOpacity>
          ),
        })} component={Register} />
        <Stack.Screen name="Home" 
        options={({ navigation }) => ({
          headerShown: true,
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: '#1b014d',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: '#fff',
          headerTitle: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{ fontSize: 18, color: '#fff' }}>Volver</Text>
            </TouchableOpacity>
          ),
        })}
        component={HomeScreen} />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
