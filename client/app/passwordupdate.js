import { useRouter } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

export default function PasswordUpdate() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

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
          marginTop: 40,
          gap: 20,
          display: "flex",
          alignItems: "center",
        }}
      >
        <View style={{ gap: 20 }}>
          <View style={{ gap: 5 }}>
            <Text>Password</Text>
            <TextInput
              value={password}
              style={styles.input}
              placeholder="Enter your new password"
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          <View style={{ gap: 5 }}>
            <Text>Confirm password</Text>
            <TextInput
              value={newPassword}
              style={styles.input}
              placeholder="Enter your new password again"
              onChangeText={(text) => setNewPassword(text)}
            />
          </View>
          <Pressable
            style={{
              height: 45,
              borderRadius: 5,
              backgroundColor: "#FF4136",
              display: "flex",
              width: Dimensions.get("screen").width - 60,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 16 }}>Reset Password</Text>
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
