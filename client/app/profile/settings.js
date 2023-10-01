import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

export default function Settings() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.option}
        onPress={() => router.push("/profileupdate")}
      >
        <Text style={styles.text}>Update Profile</Text>
        <FontAwesomeIcon size={20} name="angle-right" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.option}
        onPress={() => router.push("/passwordupdate")}
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
    backgroundColor: "white",
    padding: 20,
    gap: 20,
  },
  option: {
    padding: 15,
    display: "flex",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f6f6f6",
  },
  text: {
    borderBottomColor: "#000000",
    fontSize: 16,
    flex: 1,
  },
});
