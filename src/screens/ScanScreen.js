import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import OcrService from '../services/OcrService';

export default function ScanScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      try {
        const photo = await camera.takePictureAsync({ quality: 1 });
        processReceipt(photo.uri);
      } catch (error) {
        Alert.alert('Error', 'Failed to take picture. Please try again.');
      }
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        processReceipt(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  };

  const processReceipt = async (imageUri) => {
    setIsProcessing(true);
    try {
      const receiptData = await OcrService.recognizeText(imageUri);
      navigation.navigate('ReceiptDetail', { 
        imageUri,
        receiptData
      });
    } catch (error) {
      Alert.alert(
        'Error',
        'Failed to process receipt. Please make sure the image is clear and try again.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ref={(ref) => setCamera(ref)}
      >
        <View style={styles.overlay}>
          {isProcessing ? (
            <View style={styles.processingContainer}>
              <ActivityIndicator size="large" color="#ffffff" />
              <Text style={styles.processingText}>Processing Receipt...</Text>
            </View>
          ) : (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={takePicture}
                disabled={isProcessing}
              >
                <Text style={styles.text}>Take Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={pickImage}
                disabled={isProcessing}
              >
                <Text style={styles.text}>Pick from Gallery</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: 'rgba(0,122,255,0.8)',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  processingContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  processingText: {
    color: 'white',
    fontSize: 18,
    marginTop: 10,
  },
});
