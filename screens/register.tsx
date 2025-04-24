import React, { useState } from 'react'
import { Text, StyleSheet, View, Image, TextInput, TouchableOpacity, Alert, Modal } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../App'; // o desde donde lo hayas definido

type Props = StackScreenProps<RootStackParamList, 'Register'>;


export default function Register({ navigation }: Props) {

  const [nombre, setNombre] = useState('');
  const [segundoNombre, setSegundoNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [segundoApellido, setSegundoApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [celular, setCelular] = useState('');


  const [contrasena, setContrasena] = useState('');
  const [confirmarClave, setConfirmarContrasena] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
const [error, setErrorMensaje] = useState('');

  const validarCampos = () => {
    if (!nombre) return 'Nombre requerido';
    if (!segundoNombre) return 'Segundo nombre requerido';
    if (!apellido) return 'Apellido requerido';
    if (!segundoApellido) return 'Segundo apellido requerido';
    if (!correo) return 'Correo requerido';
    if (!celular) return 'Celular requerido';
    if (!contrasena) return 'Contraseña requerida';
    return null;
  };


  // 👉 Función para enviar los datos al backend
  const handleRegistro = async () => {
    // Validación de campos vacíos
    if (!nombre || !segundoNombre || !apellido || !segundoApellido || !correo || !celular || !contrasena || !confirmarClave) {
      setErrorMensaje('Por favor completa todos los campos.');
      setModalVisible(true);
      return;
    }
  
    // Validación de contraseñas
    if (contrasena !== confirmarClave) {
      setErrorMensaje('Las contraseñas no coinciden.');
      setModalVisible(true);
      return;
    }
  
    try {
      const response = await fetch('http://192.168.1.5/api-php/index.php?ruta=registrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          segundoNombre,
          apellido,
          segundoApellido,
          correo,
          celular,
          contrasena,
        }),
      });
  
      const data = await response.json();
  
      if (data.mensaje?.includes("Error")) {
        setErrorMensaje(data.mensaje);
        setModalVisible(true);
      } else {
        Alert.alert(data.mensaje || 'Registro exitoso', '', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login')
          },
        ]);
      }
    } catch (error) {
      console.error(error);
      setErrorMensaje('Error al conectar con el servidor.');
      setModalVisible(true);
    }
  };
  const [secure, setSecure] = useState(true);
  const toggleSecure = () => setSecure(!secure);


  return (
    <View style={styles.container}>

      <Image source={require('../assets/logo.png')} style={styles.imagenLogo} />
      <Text style={styles.titulo}>Registrate</Text>
      <View style={styles.containerNombres}>
        <TextInput
          style={styles.input}
          placeholderTextColor={'#D2D1FE'}
          placeholder="Nombre..."
          keyboardType="default"
          onChangeText={setNombre}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor={'#D2D1FE'}
          placeholder="Segundo Nombre..."
          keyboardType="default"
          onChangeText={setSegundoNombre}
        />
      </View>
      <View style={styles.containerNombres}>
        <TextInput
          style={styles.input}
          placeholderTextColor={'#D2D1FE'}
          placeholder="Apellido..."
          keyboardType="default"
          onChangeText={setApellido}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor={'#D2D1FE'}
          placeholder="Segundo Apellido..."
          keyboardType="default"
          onChangeText={setSegundoApellido}
        />
      </View>
      <View style={styles.containerNombres}>
        <TextInput
          style={styles.input}
          placeholderTextColor={'#D2D1FE'}
          placeholder="Correo..."
          keyboardType="email-address"
          onChangeText={setCorreo}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor={'#D2D1FE'}
          placeholder="Celular..."
          keyboardType="phone-pad"
          onChangeText={setCelular}
        />
      </View>
      <View style={styles.containerNombres}>
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
        <View style={styles.passwordWrapper}>
          <TextInput
            style={styles.passwordInput}
            placeholderTextColor={'#D2D1FE'}
            placeholder="Confirmar..."
            secureTextEntry={secure}
            onChangeText={setConfirmarContrasena}
          />
          <TouchableOpacity onPress={toggleSecure}>
            <Feather name={secure ? 'eye-off' : 'eye'} size={20} color="#D2D1FE" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={handleRegistro}>
        <LinearGradient
          colors={['#522d9f', '#9c49fe']} // Gradiente morado
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Registrar</Text>
        </LinearGradient>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)'
        }}>
          <View style={{
            backgroundColor: '#fff',
            padding: 20,
            borderRadius: 10,
            width: '80%'
          }}>
            <Text style={{ color: '#000', fontSize: 16 }}>{error}</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={{ marginTop: 15, color: '#522d9f', textAlign: 'right' }}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#1b014d',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Poppins',
  },
  titulo: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
    padding: 10,
  },
  imagenLogo: {
    resizeMode: 'contain',
    height: 100,
    width: 150,
    marginBottom: 0,
  },

  containerNombres: {
    height: 60,
    width: '90%',
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    color: '#fff',
    borderRadius: 20,
    backgroundColor: '#522d9f',
    height: 42,
    width: '50%',
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
    width: '49%',
    margin: 5,
    paddingHorizontal: 10,
  },
  passwordInput: {
    flex: 1,
    color: '#fff',
  },
  button: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 70,
    borderRadius: 25,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },

})

