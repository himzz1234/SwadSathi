import { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

function main() {
  const [active, setActive] = useState(0);
  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#F5F5F5",
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}
      >
        <Pressable
          onPress={() => setActive(0)}
          style={[
            styles.option,
            !active
              ? { backgroundColor: "blue" }
              : { backgroundColor: "white" },
          ]}
        >
          <Text style={{ textAlign: "center" }}>User</Text>
        </Pressable>
        <Pressable
          onPress={() => setActive(1)}
          style={[
            styles.option,
            active ? { backgroundColor: "blue" } : { backgroundColor: "white" },
          ]}
        >
          <Text style={{ textAlign: "center" }}>Canteen</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  option: {
    backgroundColor: "transparent",
    width: 100,
    textAlign: "center",
  },
});

export default main;
