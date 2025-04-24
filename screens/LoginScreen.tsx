import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, View, Image, TextInput, TouchableOpacity,Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../App'; // o desde donde lo hayas definido

import { loginUsuario } from '../service/api'; // Asegurate de tener esta función

type Props = StackScreenProps<RootStackParamList, 'Login'>;

export default function Login({ navigation }: Props) {
  const [secure, setSecure] = useState(true);
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  const toggleSecure = () => setSecure(!secure);

  const handleLogin = async () => {
    const response = await loginUsuario(correo, contrasena);

    if (response?.usuario) {
      try {
        await AsyncStorage.setItem('usuario', JSON.stringify(response.usuario));
        console.log('Usuario guardado en AsyncStorage:', response.usuario);
        Alert.alert('Éxito', 'Inicio de sesión exitoso');
        navigation.navigate('Home');
      } catch (error) {
        console.error('Error guardando usuario en AsyncStorage:', error);
        Alert.alert('Error', 'No se pudo guardar la información del usuario.');
      }
    } else {
      Alert.alert('Error', response.mensaje || response.error || 'Credenciales incorrectas');
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#1b014d" barStyle="light-content" />
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.titulo}>Iniciar Sesión</Text>

        <TextInput
          style={styles.input}
          placeholderTextColor={'#D2D1FE'}
          placeholder="Correo Electrónico..."
          keyboardType="email-address"
          onChangeText={setCorreo}
        />

        <View style={styles.passwordWrapper}>
          <TextInput
            style={styles.passwordInput}
            placeholderTextColor={'#D2D1FE'}
            placeholder="Contraseña..."
            secureTextEntry={secure}
            onChangeText={setContrasena}
          />
          <TouchableOpacity onPress={toggleSecure}>
            <Feather name={secure ? 'eye-off' : 'eye'} size={20} color="#D2D1FE" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleLogin}>
        <LinearGradient
          colors={['#522d9f', '#9c49fe']} // Gradiente morado
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.linkText}>¿No tienes cuenta? Regístrate aquí</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b014d',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Poppins',
  },
  logo: {
    resizeMode: 'contain',
    height: 100,
    width: 150,
    margin: 0,
  },
  titulo: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    padding: 10,
  },
  input: {
    color: '#fff',
    borderRadius: 20,
    backgroundColor: '#522d9f',
    height: 42,
    width: '60%',
    margin: 5,
    borderColor: 'none',
    elevation: 10,
    paddingHorizontal: 10,
  },
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#522d9f',
    borderRadius: 20,
    elevation: 3,
    borderColor: 'none',
    height: 40,
    width: '60%',
    margin: 12,
    paddingHorizontal: 10,
  },
  passwordInput: {
    flex: 1,
    color: '#fff',
  },
  button: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  linkText: {
    marginTop: 20,
    color: '#D2D1FE',
  }
});
