import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Pressable,
} from "react-native";
import axios from "../../../axios";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "react-native";
import useUpload from "../../../hooks/useCloudinaryUpload";
import { AuthContext } from "@/context/auth/AuthContext";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import Icon from "react-native-vector-icons/FontAwesome5";
import * as ImagePicker from "expo-image-picker";
import { getValueFor } from "@/utils/lib/secure-store";

export default function PasswordUpdate() {
  const { auth: canteen } = useContext(AuthContext);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: canteen.name,
    email: canteen.email,
    address: canteen.address,
    phoneNumber: String(canteen.phoneNumber),
  });

  const [image, setImage] = useState("");
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
    const obj = await getValueFor("auth");
    const { token } = JSON.parse(obj);

    const res = await axios.put(
      "/auth/canteen/profile",
      {
        formData,
        profilePicture: uploadedImage || canteen.profilePicture,
      },
      { headers: { token } }
    );

    dispatch({
      type: "PROFILE_UPDATE",
      payload: { auth: res.data.auth, role: "Canteen" },
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
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <View style={styles.profileImage}>
            <Image
              style={styles.image}
              source={
                !uploadedImage
                  ? { uri: canteen.profilePicture }
                  : { uri: uploadedImage }
              }
              borderRadius={999}
            ></Image>
            <Pressable onPress={pickImage} style={styles.editIconContainer}>
              <MaterialIcon name="edit" color="white" size={12} />
            </Pressable>
          </View>
        </View>

        <View style={styles.profileInfo}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              value={formData.name}
              style={styles.input}
              placeholder="Enter canteen's name"
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              value={formData.email}
              style={styles.input}
              placeholder="Enter canteen's email"
              onChangeText={(text) => setFormData({ ...formData, email: text })}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              value={formData.address}
              style={styles.input}
              placeholder="Enter canteen's address"
              onChangeText={(text) =>
                setFormData({ ...formData, address: text })
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              value={formData.phoneNumber}
              style={styles.input}
              placeholder="Enter canteen's phone number"
              onChangeText={(text) =>
                setFormData({ ...formData, phoneNumber: text })
              }
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
    display: "flex",
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
    fontSize: 15,
    fontWeight: "500",
  },
  input: {
    height: 50,
    borderRadius: 5,
    paddingHorizontal: 15,
    backgroundColor: "white",
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
    paddingVertical: 15,
    elevation: 5,
  },
});
