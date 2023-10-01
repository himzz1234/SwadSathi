import {
  View,
  Image,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
} from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { useFonts } from "expo-font";
import { Link } from "expo-router";

import { Lato_400Regular } from "@expo-google-fonts/lato";
import { Qwigley_400Regular } from "@expo-google-fonts/qwigley";

function main() {
  let [fontsLoaded, fontError] = useFonts({
    Qwigley_400Regular,
    Lato_400Regular,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 75,
          fontFamily: "Qwigley_400Regular",
          color: "#e32c29",
        }}
      >
        ApnaCanteen
      </Text>

      <Image
        source={require("../assets/images/cover.png")}
        style={{ width: 400, height: 400 }}
      />
      <View
        style={{
          display: "flex",
          justifyContent: "flex-end",
          flex: 1,
          paddingHorizontal: 20,
          paddingVertical: 10,
          gap: 20,
        }}
      >
        <Link href="/login" asChild>
          <Pressable style={styles.option}>
            {/* <FontAwesome5Icon name="user-alt" size={30} color="#FFFFFF" /> */}
            <Text style={{ color: "white" }}>I'm a user</Text>
          </Pressable>
        </Link>
        <Pressable style={styles.option}>
          {/* <FontAwesomeIcon name="cutlery" size={40} color="#FFFFFF" /> */}
          <Text style={{ color: "white" }}>I'm a canteen</Text>
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
    fontFamily: "Lato_400Regular",
    paddingVertical: 40,
  },
  option: {
    width: Dimensions.get("window").width - 50,
    height: 50,
    backgroundColor: "#e32c29",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
});

export default main;
