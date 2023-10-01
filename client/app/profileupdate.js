import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
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
} from "react-native";
import { useRouter } from "expo-router";

export default function ProfileUpdate() {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [email, setEmail] = useState(user?.email);
  const [username, setUsername] = useState(user?.name);
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (result.assets[0].uri) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          paddingHorizontal: 10,
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
              !image ? require("../assets/images/profile.jpeg") : { uri: image }
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
          <Pressable
            style={{
              height: 45,
              borderRadius: 5,
              backgroundColor: "#FF4136",
              display: "flex",
              width: Dimensions.get("screen").width - 40,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 16 }}>Reset Profile</Text>
          </Pressable>
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
