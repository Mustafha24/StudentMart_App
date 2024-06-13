import React, { useState, useEffect } from "react";
import { Alert, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import logger from "../utility/logger";
import { storage } from "../firebase/Fire"; // Import storage from your Firebase initialization file
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // Import storage functions
import useAuth from "../auth/useAuth";
import * as ImagePicker from "expo-image-picker";
import * as Progress from "react-native-progress";
import timeout from "../utility/timeout";
import { convertImageToBlob } from "../utility/convertImageToBlob";

const ImageInput = ({ imageUri, onChangeImage, onImageUpload }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) alert("You need to enable permission to access the library.");
  };

  const uploadImage = async (uri) => {
    console.log(uri)
    onImageUpload(true);
    setIsUploading(true);
    const fileNameArray = uri.split("/");
    const filename = fileNameArray[fileNameArray.length - 1];

    // Convert to blob
    const blob = await convertImageToBlob(uri);

    // Create a reference to the file
    const storageRef = ref(storage, `/uploads/${user._id}/${filename}`);

    // Upload the file
    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setCurrentProgress(progress);
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            console.log("Unauthorized upload");
            break;
          case "storage/canceled":
            console.log("User cancelled upload");
            break;
          case "storage/unknown":
            console.log("An unknown error occurred");
            break;
        }
      },
      async () => {
        blob.close();

        const url = await getDownloadURL(uploadTask.snapshot.ref);
        timeout(() => {
          setIsUploading(false);
          onImageUpload(false);
          setCurrentProgress(0);
          onChangeImage(url);
        }, 1000);
        return url;
      }
    );
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!result.cancelled) {
        uploadImage(result.assets[0].uri);
      }
    } catch (error) {
      logger.log("Error reading an image", error);
    }
  };

  const handlePress = () => {
    if (!imageUri) selectImage();
    else
      Alert.alert("Delete", "Are you sure you want to delete this image?", [
        { text: "Yes", onPress: () => onChangeImage(null) },
        { text: "No" },
      ]);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.pickerContainer}>
        {!imageUri && (
          <MaterialCommunityIcons color={colors.medium} name="camera" size={40} />
        )}
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      </View>
      {isUploading && !imageUri && (
        <View style={styles.progressContainer}>
          <Progress.Bar
            useNativeDriver={true}
            color={colors.primary}
            progress={currentProgress / 100}
            style={{ width: "90%", height: 3 }}
            unfilledColor={colors.lightgray}
            borderColor={colors.lightgray}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    height: 75,
    width: 75,
    backgroundColor: colors.lightgray,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    margin: 5,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  progressContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ImageInput;
