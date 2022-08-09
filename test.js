// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import  { useState, useEffect } from 'react';
// import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// import { Camera, getCameraPermissionsAsync } from 'expo-camera';

// export default function App() {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [type, setType] = useState(Camera.Constants.Type.back);

//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestPermissionsAsync();
//       setHasPermission(status === 'granted');
//     })();
//   }, []);

//   if (hasPermission === null) {
//     return <View />;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }
//   return (
//     <View style={styles.container}>
//       <Text style={styles.topText}>Family Album</Text>
//       <Camera style={styles.camera} type={type}>
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => {
//               setType(
//                 type === Camera.Constants.Type.back
//                   ? Camera.Constants.Type.front
//                   : Camera.Constants.Type.back
//               );
//             }}>
//             <Text style={styles.text}>Flip Camera</Text>
//           </TouchableOpacity>
//         </View>
//       </Camera>
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     borderColor: 'gray',
//     backgroundColor: 'tan',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   topText: {
//     fontWeight: 'bold',
//     marginTop: 30,
//     margin: 10,
//     fontSize: 20,
//     color: 'red',
//     borderColor:'blue',
//     borderWidth: 2,
//   },
//   camera: {
//     width: '100%',
//     height: '90%',
//   },
//   text: {
//     color: 'cyan',
//   },
//   button: {
//     height: 40,
//     width: 80,
//     bottom: -30,
//     left: 150,
//     borderRadius: 50,
//     alignSelf: 'center',
//     color: 'red',
//     backgroundColor: 'navy',
//     alignItems: 'center',
//     justifyContent: 'center',
//   }

// });