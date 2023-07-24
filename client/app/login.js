import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";

export default function Login() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, fontWeight: 600 }}>Login</Text>

      <View style={{ display: "flex", gap: 10, marginVertical: 32 }}>
        <TextInput placeholder="Email ID" style={styles.inputContainer} />
        <TextInput
          secureTextEntry={true}
          placeholder="Password"
          style={styles.inputContainer}
        />
      </View>

      <Pressable style={styles.button}>
        <Text style={{ color: "white", textAlign: "center", fontSize: 16 }}>
          Login
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  inputContainer: {
    padding: 10,
    backgroundColor: "#efeeea",
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#0065ff",
    paddingVertical: 10,
    borderRadius: 5,
  },
});
