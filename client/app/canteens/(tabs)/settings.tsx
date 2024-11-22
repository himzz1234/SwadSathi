import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

export default function Settings() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.option}
        onPress={() => router.push("/canteens/settings/profileupdate")}
      >
        <Text style={styles.text}>Update Profile</Text>
        <FontAwesomeIcon size={20} name="angle-right" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.option}
        onPress={() => router.push("/canteens/settings/passwordupdate")}
      >
        <Text style={styles.text}>Update Password</Text>
        <FontAwesomeIcon size={20} name="angle-right" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f3f3",
    padding: 20,
    gap: 15,
  },
  option: {
    padding: 15,
    display: "flex",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
  },
  text: {
    borderBottomColor: "#000000",
    fontSize: 16,
    flex: 1,
    fontWeight: "500",
  },
});
