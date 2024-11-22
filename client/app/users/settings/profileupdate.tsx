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
import Icon from "react-native-vector-icons/FontAwesome5";
import * as ImagePicker from "expo-image-picker";
import { AuthContext } from "@/context/auth/AuthContext";
import axios from "../../../axios";
import useUpload from "../../../hooks/useCloudinaryUpload";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { getValueFor } from "@/utils/lib/secure-store";

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

    if (result.canceled) return;
    if (result.assets[0].uri) {
      setImage(result.assets[0].uri);
    }
  };

  const updateProfile = async () => {
    const obj = await getValueFor("auth");
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
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => router.replace("/")}
          style={styles.backButtonContainer}
        >
          <Icon name="angle-left" size={20} style={styles.backButtonIcon} />
        </TouchableOpacity>
      </View>

      {/* <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: 150,
          backgroundColor: "#355e4c",
        }}
      ></View> */}

      <View style={styles.content}>
        <View style={styles.imageContainer}>
          {isLoading ? (
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 80,
                height: 80,
                backgroundColor: "#eaf3f0",
                borderRadius: 999,
              }}
            >
              <ActivityIndicator size={25} />
            </View>
          ) : (
            <Image
              style={styles.image}
              source={
                !uploadedImage
                  ? { uri: user.profilePicture }
                  : { uri: uploadedImage }
              }
              borderRadius={999}
            ></Image>
          )}
          <Pressable
            disabled={isLoading}
            onPress={pickImage}
            style={styles.editIconContainer}
          >
            <MaterialIcon name="edit" color="white" size={12} />
          </Pressable>
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
          <LinearGradient
            colors={["#2e7653", "#355e4c"]}
            style={[styles.button]}
          >
            <TouchableOpacity onPress={updateProfile} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#f3f3f3",
    position: "relative",
  },
  headerContainer: {
    position: "absolute",
    top: 30,
    left: 20,
    zIndex: 40,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    gap: 15,
  },
  backButtonContainer: {
    width: 30,
    height: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    borderColor: "#e3e9e7",
    borderWidth: 2,
  },
  backButtonIcon: {
    color: "black",
  },
  content: {
    marginTop: 40,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  imageContainer: {
    position: "relative",
    marginBottom: 20,
    width: 80,
  },
  profileImage: {
    borderWidth: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderColor: "white",
  },
  editIconContainer: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 25,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#355e4c",
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
    fontSize: 14,
  },
  input: {
    height: 50,
    borderRadius: 5,
    paddingHorizontal: 15,
    backgroundColor: "white",
    fontWeight: "600",
    width: Dimensions.get("screen").width - 40,
  },
  saveButton: {
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("screen").width - 40,
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
  },
  button: {
    borderRadius: 5,
    paddingVertical: 12,
    elevation: 2.5,
  },
});
