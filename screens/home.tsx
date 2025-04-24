import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, StyleSheet, View, Image } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

export default function HomeScreen() {
  const [usuario, setUsuario] = useState<any>(null)
  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const datos = await AsyncStorage.getItem('usuario')
        if (datos) {
          setUsuario(JSON.parse(datos))
        }
      } catch (error) {
        console.error('Error al cargar el usuario:', error)
      }
    }

    obtenerUsuario()
  }, [])
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.containerPerfil}>
          <Image>

          </Image>
          <View style={styles.containerNombre}>
            <Text style={styles.textoNombre}>
              Bienvenido
            </Text>
            <Text style={styles.textoNombre2}>
           {usuario
           ? `${usuario.nombreUsuario}${usuario.senombreUsuario}${usuario.apellidoUsuario}${usuario.seapellidoUsuario}`  : ''}
            </Text>
          </View>

        </View>
        <View style={styles.containerInformacion}>
          <Text style={styles.tituloInfo}>
            Informacion
          </Text>
          <View style={styles.containerNombreInfo}>
            <Text style={styles.textoNombre}>
              Primer Nombre:
            </Text>
            <Text style={styles.textoNombre2}>
              Alberto Casas de la rosa
            </Text>
          </View>
          <View style={styles.containerNombreInfo}>
            <Text style={styles.textoNombre}>
              Segundo Nombre:
            </Text>
            <Text style={styles.textoNombre2}>
              Segundo Apellido
            </Text>
          </View>
          <View style={styles.containerNombreInfo}>
            <Text style={styles.textoNombre}>
              Primer Apellido:
            </Text>
            <Text style={styles.textoNombre2}>
              Alberto Casas de la rosa
            </Text>
          </View>
          <View style={styles.containerNombreInfo}>
            <Text style={styles.textoNombre}>
              Segundo Apellido:
            </Text>
            <Text style={styles.textoNombre2}>
              Segundo Apellido
            </Text>
          </View>
          <View style={styles.containerNombreInfo}>
            <Text style={styles.textoNombre}>
              Correo:
            </Text>
            <Text style={styles.textoNombre2}>
              ghagdhs@gmail.com
            </Text>
          </View>
          <View style={styles.containerNombreInfo}>
            <Text style={styles.textoNombre}>
              Celular:
            </Text>
            <Text style={styles.textoNombre2}>
              300 123 4567
            </Text>
          </View>


        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b014d',
    alignItems: 'center',
    fontFamily: 'Poppins',
  },
  textoNombre: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',

  },
  tituloInfo: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,

  },
  textoNombre2: {
    color: '#e9deff',
    fontSize: 15,
    fontWeight: 'light',
    textAlign: 'center',

  },
  containerNombre: {
    height: '100%',
    width: '65%',
    margin: 5,
    borderRadius: 20,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
    backgroundColor: '#black',
  },
  containerNombreInfo: {
    height: '10%',
    width: '90%',
    margin: 10,
    borderRadius: 20,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  containerPerfil: {
    backgroundColor: '#522d9f',
    height: 120,
    width: '90%',
    margin: 5,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 10,
  },
  containerInformacion: {
    flex: 1,
    backgroundColor: '#522d9f',
    height: '70%',
    width: '90%',
    margin: 5,
    padding: 10,
    borderRadius: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },



})
