import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View, SafeAreaView, Text, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { shareAsync } from 'expo-sharing'
import * as MediaLibrary from 'expo-media-library';

export default function App() {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      console.log('I am here', cameraPermission)
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      
      setHasCameraPermission(cameraPermission.status === 'granted');
      setHasMediaLibraryPermission(mediaLibraryPermission.status === 'granted');
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting Permissions</Text>
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera use has not been granted. Please change this in the settings.</Text>
  } 

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  }

  if (photo) {
    let sharePic = () => {
      shareAsync(photo.uri).then(() => {
        setPhoto(undefined);
      })
    };
    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined);
      })
    };
    return(
      <SafeAreaView style={styles.container}>
        <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }}>
        </Image>
          <Button title='Share' onPress={sharePic} Button={hasMediaLibraryPermission 
            ? <Button title='' onPress={savePhoto}/> : undefined }/>
          <Button title='Delete' onPress={() => setPhoto(undefined)}/>
      </SafeAreaView>
    );
  }

  return (
    <Camera style={styles.container} ref={cameraRef}>
      <View
        style={styles.buttonContaier}
      >
        <Button 
          style= {styles.buttonText}
          title="Take Photo"
          onPress={takePic}
        >
        </Button>
      </View>
    </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 500,
    color: 'cyan',
  },
  buttonContaier: {
    backgroundColor: 'navy',
    color: 'cyan',
    //paddingBottom: 0,
    borderRadius: 50,
  },
  buttonText: {
    color: 'cyan',
  },
  preview: {
    alignSelf: 'stretch',
    flex: 1,
    color: 'cyan',
  }
})

