import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Pressable,
  ActivityIndicator,
} from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import * as ImagePicker from "expo-image-picker";
import { AuthContext } from "../../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../../../axios";
import useUpload from "../../../hooks/useUpload";
import { useRouter } from "expo-router";

export default function ProfileUpdate() {
  const router = useRouter();
  const { auth: user, dispatch } = useContext(AuthContext);
  const [email, setEmail] = useState(user?.email);
  const [username, setUsername] = useState(user?.name);
  const [image, setImage] = useState(null);

  const { uploadedImage, isLoading } = useUpload(image);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.assets[0].uri) {
      setImage(result.assets[0].uri);
    }
  };

  const updateProfile = async () => {
    const obj = await AsyncStorage.getItem("auth");
    const { token } = JSON.parse(obj);

    const res = await axios.put(
      "/auth/user/updateprofile",
      {
        email,
        name: username,
        profilePicture: uploadedImage || user.profilePicture,
      },
      { headers: { token } }
    );

    dispatch({
      type: "PROFILE_UPDATE",
      payload: { auth: res.data.auth, role: "User" },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
        >
          <FontAwesome5Icon name="arrow-left" size={15} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <View style={styles.profileImage}>
            <Image
              style={styles.image}
              source={
                !uploadedImage
                  ? { uri: user.profilePicture }
                  : { uri: uploadedImage }
              }
              borderRadius={999}
            ></Image>
            <Pressable onPress={pickImage} style={styles.editIconContainer}>
              <MaterialIcon name="edit" color="white" size={14} />
            </Pressable>
          </View>
        </View>

        <View style={styles.profileInfo}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              value={username}
              style={styles.input}
              onChangeText={(text) => setUsername(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              value={email}
              style={styles.input}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <TouchableOpacity
            disabled={isLoading}
            onPress={updateProfile}
            style={styles.saveButton}
          >
            {isLoading ? (
              <ActivityIndicator size="small" />
            ) : (
              <Text style={styles.saveButtonText}>Save</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  content: {
    marginTop: 40,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  imageContainer: {
    position: "relative",
    marginBottom: 40,
  },
  profileImage: {
    position: "relative",
  },
  image: {
    width: 80,
    height: 80,
  },
  editIconContainer: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 25,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF4136",
    borderRadius: 999,
    borderWidth: 2,
    borderColor: "white",
  },
  profileInfo: {
    gap: 20,
  },
  inputContainer: {
    gap: 5,
  },
  label: {
    textTransform: "uppercase",
    fontSize: 13,
  },
  input: {
    height: 50,
    borderRadius: 5,
    paddingHorizontal: 15,
    backgroundColor: "#f6f6f6",
    fontWeight: "600",
    width: Dimensions.get("screen").width - 40,
  },
  saveButton: {
    height: 45,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fe724c",
    width: Dimensions.get("screen").width - 40,
    elevation: 3,
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
  },
});
