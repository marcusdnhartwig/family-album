import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MVP from './assets/MVP.png';
import { Camera, CameraType } from 'expo-camera';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.topText}>
        Family Album
      </Text>
      <Camera style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(type === CameraType.back ? CameraType.front : CameraType.back);
            }}>
            <Text style={styles.text}> 
              flip the cam 
            </Text>
          </TouchableOpacity>
        </View>
      </Camera>
      <Image source={MVP} style={styles.mvp} />
      <Text style={styles.instructions}>
        To add a photo to this page click the button below!
      </Text>
      <TouchableOpacity
        onPress={() => () => {
          camera.open();
        }}
        style={styles.button}>
        <Text style={styles.buttonText}>
          Take a Picture
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'tan',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topText: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  mvp: {
    width: '100%',
    height: 350,
    marginBottom: 10,
  },
  instructions: {
    color: 'purple',
    fontSize: 18,
    borderColor: 'green',
    borderWidth: 2,
    marginBottom: 150,
  },
  button: {
    backgroundColor: 'navy',
    padding: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: 'cyan',
    fontSize: '20'
  },
});



