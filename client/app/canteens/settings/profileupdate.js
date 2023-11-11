import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { TextInput, TouchableOpacity } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import * as ImagePicker from "expo-image-picker";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import useUpload from "../../../hooks/useUpload";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../../../axios";

export default function ProfileUpdate() {
  const router = useRouter();
  const { auth: canteen, dispatch } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [email, setEmail] = useState(canteen?.email);
  const [username, setUsername] = useState(canteen?.name);
  const [address, setAddress] = useState(canteen?.address);
  const [phoneNumber, setPhoneNumber] = useState(
    canteen?.phoneNumber.toString()
  );

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
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          paddingHorizontal: 20,
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
        >
          <FontAwesome5Icon name="arrow-left" size={15} color="black" />
        </TouchableOpacity>
      </View>

      <View
        style={{
          gap: 40,
          marginTop: 40,
          display: "flex",
          alignItems: "center",
        }}
      >
        <View style={{ position: "relative" }}>
          <Image
            style={{ width: 80, height: 80 }}
            source={
              !uploadedImage
                ? { uri: canteen.profilePicture }
                : { uri: uploadedImage }
            }
            borderRadius={999}
          ></Image>
          <Pressable
            onPress={pickImage}
            style={{
              position: "absolute",
              right: 0,
              width: 25,
              bottom: 0,
              height: 25,
              display: "flex",
              borderRadius: 999,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#FF4136",
              borderWidth: 2,
              borderColor: "white",
            }}
          >
            <MaterialIcon name="edit" color="white" size={14} />
          </Pressable>
        </View>
        <View style={{ gap: 20 }}>
          <View style={{ gap: 5 }}>
            <Text style={{ textTransform: "uppercase", fontSize: 13 }}>
              Username
            </Text>
            <TextInput
              value={username}
              style={styles.input}
              onChangeText={(text) => setUsername(text)}
            />
          </View>
          <View style={{ gap: 5 }}>
            <Text style={{ textTransform: "uppercase", fontSize: 13 }}>
              Email
            </Text>
            <TextInput
              value={email}
              style={styles.input}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={{ gap: 5 }}>
            <Text style={{ textTransform: "uppercase", fontSize: 13 }}>
              Address
            </Text>
            <TextInput
              value={address}
              style={styles.input}
              onChangeText={(text) => setAddress(text)}
            />
          </View>
          <View style={{ gap: 5 }}>
            <Text style={{ textTransform: "uppercase", fontSize: 13 }}>
              Phone Number
            </Text>
            <TextInput
              value={phoneNumber}
              style={styles.input}
              onChangeText={(text) => setPhoneNumber(text)}
            />
          </View>
          <TouchableOpacity
            disabled={isLoading}
            onPress={updateProfile}
            style={{
              height: 45,
              borderRadius: 5,
              display: "flex",
              width: Dimensions.get("screen").width - 40,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#006442",
            }}
          >
            {isLoading ? (
              <ActivityIndicator size="small" />
            ) : (
              <Text style={{ color: "white", fontSize: 16 }}>Save</Text>
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
  input: {
    height: 50,
    borderRadius: 5,
    paddingHorizontal: 15,
    backgroundColor: "#f6f6f6",
    fontWeight: "600",
    width: Dimensions.get("screen").width - 40,
  },
});
